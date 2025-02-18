"use client";

import { Transaction } from "@/types/transaction";
import { ColumnDef } from "@tanstack/react-table";
import EditTransaction from "../shared/EditTransaction";
import DeleteTransaction from "../shared/DeleteTransaction";

export const createColumns = (
	reFetch: () => void
): ColumnDef<Transaction>[] => [
	{
		header: "Description",
		accessorKey: "description",
	},
	{
		header: "Amount",
		accessorKey: "amount",
	},
	{
		header: "BudgetName",
		accessorKey: "budget.name",
	},
	{
		header: "Date",
		accessorKey: "date",
		cell: ({ getValue }) => {
			const value = getValue();
			if (typeof value === "string" || typeof value === "number") {
				const date = new Date(value);
				return date.toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});
			} else {
				return "Invalid date";
			}
		},
	},
	{
		header: "Actions",
		id: "actions",
		cell: ({ row }) => {
			const transaction = row.original;
			return (
				<div className="flex gap-2">
					<EditTransaction id={transaction._id} reFetch={reFetch} />
					<DeleteTransaction id={transaction._id} reFetch={reFetch} />
				</div>
			);
		},
	},
];
