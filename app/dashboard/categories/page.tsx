"use client";

import { useEffect, useState } from "react";
import { getAllCategories } from "@/lib/actions/category";
import { getAllBudgets } from "@/lib/actions/budget";
import { Category } from "@/types/category";
import { Budget } from "@/types/budget";
import { useToast } from "@/hooks/use-toast";
import CategoryDistribution from "@/components/shared/Category";
import CardSkeleton from "@/components/shared/CardSkeleton";

export default function Categories() {
	const { toast } = useToast();

	const [loading, setLoading] = useState(true);
	const [budgetData, setBudgetData] = useState<Budget[]>([]);
	const [categoryData, setCategoryData] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			setLoading(true);
			try {
				const categoryData = await getAllCategories();
				const totalBudget = await getAllBudgets();

				setBudgetData(totalBudget);
				setCategoryData(categoryData);
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

		fetchCategories();
	}, []);

	if (loading) {
		return <CardSkeleton />;
	}

	return (
		<section className="px-2 w-full">
			<CategoryDistribution
				categories={categoryData}
				budgets={budgetData}
			/>
		</section>
	);
}
