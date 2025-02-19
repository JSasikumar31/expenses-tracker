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

interface Budget {
	_id: string;
	name: string;
	amount: number;
	category: string;
	year: number;
	month: number;
}
