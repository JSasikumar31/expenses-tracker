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

export default function EditBudget({
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
					<Edit /> Edit
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] rounded-lg bg-white shadow-lg">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-semibold text-slate-800">
						Update Budget
					</DialogTitle>
				</DialogHeader>
				<BudgetForm
					type="update"
					id={id}
					onClose={() => setDialogOpen(false)}
					reFetch={reFetch}
				/>
			</DialogContent>
		</Dialog>
	);
}
