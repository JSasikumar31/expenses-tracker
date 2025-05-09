"use client";

import CardSkeleton from "@/components/shared/CardSkeleton";
import BudgetComparisonChart from "@/components/shared/Comparison";
import InfoCard from "@/components/shared/InfoCard";
import MonthlyExpensesChart from "@/components/shared/MonthlyExpensesChart";
import { useToast } from "@/hooks/use-toast";
import { getAllBudgets } from "@/lib/actions/budget";
import { getAllCategories } from "@/lib/actions/category";
import { getAllTransactions } from "@/lib/actions/transaction";
import { Budget } from "@/types/budget";
import { Category } from "@/types/category";
import { Transaction } from "@/types/transaction";
import { MonitorCog, PiggyBank, Wallet } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Dashboard() {
	const { toast } = useToast();
	const showToast = useCallback(
		(message: string) => {
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		},
		[toast]
	);

	const [loading, setLoading] = useState(true);
	const [budgetData, setBudgetData] = useState<Budget[]>([]);
	const [transactionData, setTransactionData] = useState<Transaction[]>([]);
	const [categoryData, setCategoryData] = useState<Category[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const totalBudget = await getAllBudgets();
				const totalTransactions = await getAllTransactions();
				const categories = await getAllCategories();

				setBudgetData(totalBudget);
				setTransactionData(totalTransactions);
				setCategoryData(categories);

				setLoading(false);
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: "An unknown error occurred";

				showToast(errorMessage);
				setLoading(false);
			}
		};

		fetchData();
	}, [showToast]);

	if (loading) {
		return <CardSkeleton />;
	}

	return (
		<>
			<section className="px-2 flex flex-row flex-wrap gap-6 w-full">
				<InfoCard
					amount={budgetData.reduce(
						(acc: number, curr) => acc + curr.amount,
						0
					)}
					placeholder="Total Budget"
					icon={Wallet}
				/>
				<InfoCard
					amount={transactionData.reduce(
						(acc, curr) => acc + curr.amount,
						0
					)}
					placeholder="Total Transactions"
					icon={PiggyBank}
				/>
				<InfoCard
					amount={transactionData.length}
					placeholder="Total Items"
					icon={MonitorCog}
				/>
			</section>

			<MonthlyExpensesChart transactions={transactionData} />
			<BudgetComparisonChart
				transactions={transactionData}
				budgets={budgetData}
				categories={categoryData}
			/>
		</>
	);
}
