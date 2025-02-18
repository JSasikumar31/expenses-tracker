import { Category } from "./category";

export interface CreateBudgetProps {
	name: string;
	amount: number;
	category: string;
	year: number;
	month: number;
}

export interface UpdateBudgetProps {
	name?: string;
	amount?: number;
	category?: string;
	year?: number;
	month?: number;
}

export interface Budget {
	_id: string;
	name: string;
	amount: number;
	category: Category;
	year: number;
	month: number;
}
