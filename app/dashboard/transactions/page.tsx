"use client";

import ListSkeleton from "@/components/shared/ListSkeleton";
import { createColumns } from "@/components/Table/column";
import { DataTable } from "@/components/Table/data-table";
import { useToast } from "@/hooks/use-toast";
import { getAllTransactions } from "@/lib/actions/transaction";
import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";

export default function Transactions() {
	const [transactionList, setTransactionList] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const fetchTransactionLists = async () => {
		setLoading(true);
		try {
			const transactionList = await getAllTransactions();
			console.log(transactionList);
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
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTransactionLists();
	}, []);
	const columns = createColumns(fetchTransactionLists);

	return (
		<section className="px-2 py-4 flex flex-col flex-wrap gap-4 w-full border-t">
			<h2 className="text-2xl font-bold">Latest Transactions</h2>
			<p className="text-sm text-gray-700">
				To add a new transaction, you first need to create a budget, and
				then click on the budget to manage its transactions.
			</p>
			{loading ? (
				<ListSkeleton />
			) : (
				<DataTable columns={columns} data={transactionList} />
			)}
		</section>
	);
}
