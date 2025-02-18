"use client";

import React, { useEffect, useState } from "react";
import { Budget } from "@/types/budget";
import CreateTransaction from "@/components/shared/TransactionForm";
import { getBudgetById } from "@/lib/actions/budget";
import BudgetCard from "@/components/shared/BudgetCard";
import { useToast } from "@/hooks/use-toast";
import DeleteBudget from "@/components/shared/DeleteBudget";
import EditBudget from "@/components/shared/EditBudget";
import {
	deleteTransaction,
	getTransactionByBudgetId,
} from "@/lib/actions/transaction";
import { Transaction } from "@/types/transaction";
import { DataTable } from "@/components/Table/data-table";
import { createColumns } from "@/components/Table/column";

const ExpenseDetails = ({ params }: { params: { id: string } }) => {
	const id = params.id;
	const [budget, setBudget] = useState<Budget | null>(null);
	const [transactionList, setTransactionList] = useState<Transaction[]>([]);
	const { toast } = useToast();

	const fetchBudget = async () => {
		try {
			const budgetData = await getBudgetById(id);
			setBudget(budgetData);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unknown error occurred";

			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
	};

	const fetchTransactionLists = async () => {
		try {
			const transactionList = await getTransactionByBudgetId(id);
			setTransactionList(transactionList);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unknown error occurred";

			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
	};

	const handleEditTransaction = async (transactionId: string) => {
		try {
			await deleteTransaction(transactionId);
			toast({
				title: "Success",
				description: "Transaction deleted successfully",
			});
			fetchTransactionLists();
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unknown error occurred";

			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
	};

	const handleDeleteTransaction = async (transactionId: string) => {
		try {
			await deleteTransaction(transactionId);
			toast({
				title: "Success",
				description: "Transaction deleted successfully",
			});
			fetchTransactionLists();
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unknown error occurred";

			toast({
				title: "Error",
				description: errorMessage,
				variant: "destructive",
			});
		}
	};

	const columns = createColumns(
		handleEditTransaction,
		handleDeleteTransaction
	);

	useEffect(() => {
		fetchBudget();
		fetchTransactionLists();
	}, []);

	return (
		<div className="p-4 border-t">
			<h2 className="text-2xl font-bold flex items-center gap-2 justify-between">
				My Transactions
				<div className="flex items-center gap-2">
					{budget && <EditBudget id={id} reFetch={fetchBudget} />}

					<DeleteBudget id={id} />
				</div>
			</h2>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-6">
				{budget ? (
					<BudgetCard budget={budget} />
				) : (
					<div className="bg-slate-200 p-4 rounded-md h-36 animate-pulse"></div>
				)}

				<CreateTransaction
					reFetch={fetchTransactionLists}
					id={params.id}
					type="create"
				/>
			</div>

			<div className="mt-6">
				<h2 className="text-xl font-bold pb-4">Latest Transactions</h2>
				<DataTable columns={columns} data={transactionList} />
			</div>
		</div>
	);
};

export default ExpenseDetails;
