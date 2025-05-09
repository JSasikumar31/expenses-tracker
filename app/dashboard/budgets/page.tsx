"use client";

import BudgetCard from "@/components/shared/BudgetCard";
import CardSkeleton from "@/components/shared/CardSkeleton";
import CreateBudget from "@/components/shared/CreateBudget";
import { getAllBudgets } from "@/lib/actions/budget";
import { Budget } from "@/types/budget";
import { useEffect, useState } from "react";

export default function Budgets() {
	const [budgets, setBudgets] = useState<Budget[] | null>(null);

	const fetchBudgets = async () => {
		const budgetsData = await getAllBudgets();
		setBudgets(budgetsData);
	};

	const reFetch = () => {
		fetchBudgets();
	};

	useEffect(() => {
		fetchBudgets();
	}, []);

	if (budgets === null) {
		return <CardSkeleton />;
	}

	return (
		<section className="px-4 py-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full overflow-hidden border-t">
			<p className=" text-gray-700 col-span-full">
				Click any budget to view transactions and to update or delete
				it.
			</p>
			<div className="col-span-1 mb-6">
				<CreateBudget reFetch={reFetch} />
			</div>

			{budgets.length > 0 ? (
				budgets.map((budget) => (
					<BudgetCard key={budget._id} budget={budget} />
				))
			) : (
				<p className="col-span-full text-center text-xl text-gray-500">
					No budgets found.
				</p>
			)}
		</section>
	);
}
