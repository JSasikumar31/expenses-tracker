import { Transaction } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Budget } from "@/types/budget";
import { Category } from "@/types/category";

interface BudgetComparisonChartProps {
	transactions: Transaction[];
	budgets: Budget[];
	categories: Category[];
}

/**
 * To compare budgeted and actual spending, we need to first aggregate the actual spending by category.
 * This is done by iterating over the transactions and finding the associated budget and category for each transaction.
 *
 * @description
 * @function actualByCategory - Aggregates actual spending by category based on transactions
 * @returns {Object} - An object where keys are category names and values are total actual spending
 *
 * @description
 * @function data - Combines budgeted and actual spending data for each category
 * @returns {Array} - An array of objects, each representing a category with budgeted and actual spending
 */

const BudgetComparisonChart = ({
	transactions,
	budgets,
	categories,
}: BudgetComparisonChartProps) => {
	// Aggregate actual spending by category
	const actualByCategory = transactions.reduce((acc, t) => {
		// Find the associated budget and category
		const categoryId = t.budget.category;
		const category = categories.find((c) => c._id === categoryId);
		if (category) {
			acc[category.name] = (acc[category.name] || 0) + t.amount;
		}
		return acc;
	}, {} as { [key: string]: number });

	// Prepare data combining both budgeted and actual amounts for each category
	const data = categories.map((category) => {
		// Find the budget amount for the category
		const budgetAmount =
			budgets.find((b) => b.category._id === category._id)?.amount || 0;

		// Get the actual amount from the aggregated actualByCategory
		const actualAmount = actualByCategory[category.name] || 0;

		return {
			name: category.name,
			budget: budgetAmount,
			actual: actualAmount,
		};
	});

	return (
		<Card className="m-2">
			<CardHeader>
				<CardTitle>Budget vs Actual</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						{/* Budget Bar */}
						<Bar dataKey="budget" fill="#624CF5" name="Budget" />
						{/* Actual Bar */}
						<Bar dataKey="actual" fill="#00C49F" name="Actual" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default BudgetComparisonChart;
