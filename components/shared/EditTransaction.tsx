"use client";

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogContent,
} from "../ui/dialog";
import BudgetForm from "./BudgetForm";
import { useState } from "react";
import TransactionForm from "./TransactionForm";

export default function EditTransaction({
	id,
	reFetch,
}: {
	id: string;
	reFetch: () => void;
}) {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button>
					<Edit />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] rounded-lg bg-white shadow-lg">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-semibold text-slate-800">
						Update Transaction
					</DialogTitle>
				</DialogHeader>
				<TransactionForm
					type="update"
					id={id}
					reFetch={reFetch}
				/>
			</DialogContent>
		</Dialog>
	);
}
