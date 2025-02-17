import Transaction, { ITransaction } from "@/models/transaction";
import dbConnect from "@/lib/dbConnect";
import { handleError } from "@/lib/utils";

export const createTransaction = async (data: ITransaction) => {
	try {
		await dbConnect();

		const transaction = await Transaction.create(data);
		return JSON.parse(JSON.stringify(transaction));
	} catch (error) {
		handleError(error);
	}
};

export const getTransactions = async () => {
	try {
		await dbConnect();
		const transactions = await Transaction.find();
		return JSON.parse(JSON.stringify(transactions));
	} catch (error) {
		handleError(error);
	}
};

export const deleteTransaction = async (id: string) => {
	try {
		await dbConnect();
		const transaction = await Transaction.findByIdAndDelete(id);
		if (!transaction) {
			throw new Error("Transaction not found");
		}

		return JSON.parse(JSON.stringify(transaction));
	} catch (error) {
		handleError(error);
	}
};

export const updateTransaction = async (id: string, data: ITransaction) => {
	try {
		await dbConnect();
		const transaction = await Transaction.findByIdAndUpdate(id, data, {
			new: true,
		});
		if (!transaction) {
			throw new Error("Transaction not found");
		}

		return JSON.parse(JSON.stringify(transaction));
	} catch (error) {
		handleError(error);
	}
};

export const getTransactionsByCategory = async (category: string) => {
	try {
		await dbConnect();
		const transactions = await Transaction.find({ category });
		return JSON.parse(JSON.stringify(transactions));
	} catch (error) {
		handleError(error);
	}
};

export const getTransactionById = async (id: string) => {
	try {
		await dbConnect();
		const transaction = await Transaction.findById(id);
		if (!transaction) {
			throw new Error("Transaction not found");
		}
		return JSON.parse(JSON.stringify(transaction));
	} catch (error) {
		handleError(error);
	}
};
