"use client";

import React, { useEffect, useState } from "react";
import { Budget } from "@/types/budget";
import CreateTransaction from "@/components/shared/TransactionForm";
import { getBudgetById } from "@/lib/actions/budget";
import BudgetCard from "@/components/shared/BudgetCard";
import { useToast } from "@/hooks/use-toast";
import DeleteBudget from "@/components/shared/DeleteBudget";
import EditBudget from "@/components/shared/EditBudget";
import { getTransactionByBudgetId } from "@/lib/actions/transaction";
import { Transaction } from "@/types/transaction";
import { DataTable } from "@/components/Table/data-table";
import { createColumns } from "@/components/Table/column";
import ListSkeleton from "@/components/shared/ListSkeleton";
import CardSkeleton from "@/components/shared/CardSkeleton";

const ExpenseDetails = ({ params }: { params: Promise<{ id: string }> }) => {
	const [budget, setBudget] = useState<Budget | null>(null);
	const [transactionList, setTransactionList] = useState<Transaction[]>([]);
	const { toast } = useToast();

	const [id, setId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchParams = async () => {
			const paramsResolved = await params;
			setId(paramsResolved.id);
		};

		fetchParams();
	}, [params]);

	const fetchBudget = async () => {
		if (!id) return;
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
		if (loading) setLoading(true);
		if (!id) return;
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
		} finally {
			if (loading) setLoading(false);
		}
	};

	const columns = createColumns(fetchTransactionLists);

	useEffect(() => {
		if (id) {
			fetchBudget();
			fetchTransactionLists();
		}
	}, [id]);

	if (!id) return <CardSkeleton />;

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
					id={id}
					type="create"
				/>
			</div>

			<div className="mt-6">
				<h2 className="text-xl font-bold pb-4">Latest Transactions</h2>
				{loading ? (
					<ListSkeleton />
				) : (
					<DataTable columns={columns} data={transactionList} />
				)}
			</div>
		</div>
	);
};

export default ExpenseDetails;
