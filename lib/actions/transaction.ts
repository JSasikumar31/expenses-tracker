"use server";

import Transaction from "@/models/transaction";
import dbConnect from "@/lib/dbConnect";
import {
	CreateTransactionProps,
	UpdateTransactionProps,
} from "@/types/transaction";
import Category from "@/models/category";
import { isValidObjectId } from "mongoose";
import Budget from "@/models/budget";
import mongoose from "mongoose";

export const createTransaction = async (data: CreateTransactionProps) => {
	try {
		await dbConnect();
		if (!isValidObjectId(data.budget)) {
			throw new Error("Please provide a valid budget ID");
		}

		const existingBudget = await Budget.findById(data.budget);
		if (!existingBudget) {
			throw new Error("Provided budget does not exist");
		}

		const transaction = await Transaction.create(data);
		return JSON.parse(JSON.stringify(transaction));
	} catch (error) {
		throw error;
	}
};

export const getAllTransactions = async () => {
	try {
		await dbConnect();
		const transactions = await Transaction.find().populate("budget");
		return JSON.parse(JSON.stringify(transactions));
	} catch (error) {
		throw error;
	}
};

export const deleteTransaction = async (id: string) => {
	try {
		await dbConnect();
		if (!isValidObjectId(id)) {
			throw new Error("Please provide a valid transaction ID");
		}
		const transaction = await Transaction.findByIdAndDelete(id);
		if (!transaction) {
			throw new Error("Provided transaction does not exist");
		}

		return JSON.parse(JSON.stringify(transaction));
	} catch (error) {
		throw error;
	}
};

export const updateTransaction = async (
	id: string,
	data: UpdateTransactionProps
) => {
	try {
		await dbConnect();
		if (!isValidObjectId(id)) {
			throw new Error("Please provide a valid budget ID");
		}

		const transaction = await Transaction.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!transaction) {
			throw new Error("Provided transaction does not exist");
		}

		return JSON.parse(JSON.stringify(transaction));
	} catch (error) {
		throw error;
	}
};

export const getTransactionsByCategory = async (category: string) => {
	try {
		await dbConnect();
		if (!isValidObjectId(category)) {
			throw new Error("Please provide a valid category ID");
		}

		const existingCategory = await Category.findById(category);
		if (!existingCategory) {
			throw new Error("Provided category does not exist");
		}

		const transactions = await Transaction.find({ category });
		return JSON.parse(JSON.stringify(transactions));
	} catch (error) {
		throw error;
	}
};

export const getTransactionById = async (id: string) => {
	try {
		await dbConnect();
		const transaction = await Transaction.findById(id).populate("budget");
		if (!transaction) {
			throw new Error("Provided transaction does not exist");
		}
		return JSON.parse(JSON.stringify(transaction));
	} catch (error) {
		throw error;
	}
};

export const getTransactionByBudgetId = async (id: string) => {
	try {
		await dbConnect();
		if (!isValidObjectId(id)) {
			throw new Error("Please provide a valid budget ID");
		}

		const existingBudget = await Budget.findById(id);
		if (!existingBudget) {
			throw new Error("Provided budget does not exist");
		}

		const transactions = await Transaction.aggregate([
			{
				$match: {
					budget: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "budgets",
					localField: "budget",
					foreignField: "_id",
					as: "budget",
				},
			},
			{
				$unwind: "$budget",
			},
			{
				$sort: {
					date: -1,
				},
			},
		]);
		return JSON.parse(JSON.stringify(transactions));
	} catch (error) {
		throw error;
	}
};

export const getTransactionForGraph = async () => {
	try {
		await dbConnect();
		const transactions = await Transaction.aggregate([
			{
				$lookup: {
					from: "budgets",
					localField: "budget",
					foreignField: "_id",
					as: "budgetDetails",
				},
			},
			{ $unwind: "$budgetDetails" },
			{
				$lookup: {
					from: "categories",
					localField: "budgetDetails.category",
					foreignField: "_id",
					as: "categoryDetails",
				},
			},
			{ $unwind: "$categoryDetails" },
			{
				$project: {
					description: 1,
					amount: 1,
					date: 1,
					"budgetDetails.name": 1,
					"categoryDetails.name": 1,
				},
			},
		]);
		return JSON.parse(JSON.stringify(transactions));
	} catch (error) {
		throw error;
	}
};

export const getTotalTransactions = async () => {
	try {
		await dbConnect();
		const totalTransactions = await Transaction.aggregate([
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" },
				},
			},
		]);
		return totalTransactions.length > 0 ? totalTransactions[0].total : 0;
	} catch (error) {
		throw error;
	}
};
