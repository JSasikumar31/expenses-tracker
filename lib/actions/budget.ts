"use server";

import Budget from "@/models/budget";
import dbConnect from "@/lib/dbConnect";
import { CreateBudgetProps, UpdateBudgetProps } from "@/types/budget";
import mongoose, { isValidObjectId } from "mongoose";
import Transaction from "@/models/transaction";

export const getBudgets = async () => {
	try {
		await dbConnect();
		const budgets = await Budget.find();

		return JSON.parse(JSON.stringify(budgets));
	} catch (error) {
		throw error;
	}
};

export const createBudget = async (data: CreateBudgetProps) => {
	try {
		await dbConnect();

		const existingBudget = await Budget.findOne({
			category: data.category,
			year: data.year,
			month: data.month,
		});

		if (existingBudget) {
			throw new Error(
				"Budget already exists for this category and month"
			);
		}
		const budget = await Budget.create({
			...data,
			category: new mongoose.Types.ObjectId(data.category),
		});
		return JSON.parse(JSON.stringify(budget));
	} catch (error) {
		throw error;
	}
};

export const deleteBudget = async (id: string) => {
	try {
		await dbConnect();
		if (!isValidObjectId(id)) {
			throw new Error("Please provide a valid budget ID");
		}

		const budget = await Budget.findByIdAndDelete(id);
		if (!budget) {
			throw new Error("Budget not found");
		}

		await Transaction.deleteMany({ budget: id });

		return JSON.parse(JSON.stringify(budget));
	} catch (error) {
		throw error;
	}
};

export const updateBudget = async (id: string, data: UpdateBudgetProps) => {
	try {
		await dbConnect();
		const budget = await Budget.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!budget) {
			throw new Error("Budget not found");
		}

		return JSON.parse(JSON.stringify(budget));
	} catch (error) {
		throw error;
	}
};

export const getBudgetById = async (id: string) => {
	try {
		await dbConnect();
		const budget = await Budget.findById(id).populate("category");
		if (!budget) {
			throw new Error("Budget not found");
		}
		return JSON.parse(JSON.stringify(budget));
	} catch (error) {
		throw error;
	}
};

export const getAllBudgets = async () => {
	try {
		await dbConnect();
		const budgets = await Budget.find().populate("category");
		return JSON.parse(JSON.stringify(budgets));
	} catch (error) {
		throw error;
	}
};

export const getBudgetByCategory = async (category: string) => {
	try {
		await dbConnect();
		const budgets = await Budget.find({ category });
		return JSON.parse(JSON.stringify(budgets));
	} catch (error) {
		throw error;
	}
};

export const getTotalBudget = async () => {
	try {
		await dbConnect();
		const totalBudget = await Budget.aggregate([
			{
				$group: {
					_id: null,
					total: { $sum: "$amount" },
				},
			},
		]);

		return totalBudget.length > 0 ? totalBudget[0].total : 0;
	} catch (error) {
		throw error;
	}
};
