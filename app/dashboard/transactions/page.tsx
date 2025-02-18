"use client";

import { createColumns } from "@/components/Table/column";
import { DataTable } from "@/components/Table/data-table";
import { useToast } from "@/hooks/use-toast";
import {
	deleteTransaction,
	getAllTransactions,
} from "@/lib/actions/transaction";
import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";

export default function Transactions() {
	const [transactionList, setTransactionList] = useState<Transaction[]>([]);
	const { toast } = useToast();

	const fetchTransactionLists = async () => {
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
		}
	};

	useEffect(() => {
		fetchTransactionLists();
	}, []);

	const columns = createColumns(fetchTransactionLists);

	return (
		<section className="px-2 py-4 flex flex-col flex-wrap gap-6 w-full border-t">
			<h2 className="text-2xl font-bold">Latest Transactions</h2>
			<DataTable columns={columns} data={transactionList} />
		</section>
	);
}
