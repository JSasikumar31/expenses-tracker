"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import BudgetForm from "./BudgetForm";

const CreateBudget = ({ reFetch }: { reFetch: () => void }) => {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<motion.div
					className="bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg items-center justify-center flex flex-col border-2 border-dashed border-slate-300 text-slate-800 hover:shadow-xl cursor-pointer min-w-80 p-6"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<h2 className="text-6xl font-bold text-primary-500">+</h2>
					<h2 className="text-xl font-medium text-foreground">
						Create Budget
					</h2>
				</motion.div>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] rounded-lg bg-white shadow-lg">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-semibold text-slate-800">
						Create Budget
					</DialogTitle>
				</DialogHeader>
				<BudgetForm
					reFetch={reFetch}
					onClose={() => setDialogOpen(false)}
					type="create"
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CreateBudget;
