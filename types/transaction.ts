import { Budget } from "./budget";

export interface CreateTransactionProps {
	amount: number;
	description: string;
	date: Date;
	budget: string;
}

export interface UpdateTransactionProps {
	amount?: number;
	description?: string;
	date?: Date;
}

export interface Transaction {
	_id: string;
	amount: number;
	description: string;
	date: Date;
	budget: Budget;
}
