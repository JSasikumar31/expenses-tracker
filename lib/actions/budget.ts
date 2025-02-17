import Budget, { IBudget } from "@/models/budget";
import dbConnect from "@/lib/dbConnect";
import { handleError } from "@/lib/utils";

export const getBudgets = async () => {
	try {
		await dbConnect();
		const budgets = await Budget.find();
		return JSON.parse(JSON.stringify(budgets));
	} catch (error) {
		handleError(error);
	}
};

export const createBudget = async (data: IBudget) => {
	try {
		await dbConnect();
		const budget = await Budget.create(data);
		return JSON.parse(JSON.stringify(budget));
	} catch (error) {
		handleError(error);
	}
};

export const deleteBudget = async (id: string) => {
	try {
		await dbConnect();
		const budget = await Budget.findByIdAndDelete(id);
		if (!budget) {
			throw new Error("Budget not found");
		}

		return JSON.parse(JSON.stringify(budget));
	} catch (error) {
		handleError(error);
	}
};

export const updateBudget = async (id: string, data: IBudget) => {
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
		handleError(error);
	}
};

export const getBudgetById = async (id: string) => {
	try {
		await dbConnect();
		const budget = await Budget.findById(id);
		if (!budget) {
			throw new Error("Budget not found");
		}
		return JSON.parse(JSON.stringify(budget));
	} catch (error) {
		handleError(error);
	}
};
