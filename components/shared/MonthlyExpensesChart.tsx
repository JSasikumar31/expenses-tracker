import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Transaction } from "@/types/transaction";

const MonthlyExpensesChart = ({
	transactions,
}: {
	transactions: Transaction[];
}) => {
	const monthlyData = transactions.reduce(
		(acc: { [key: string]: number }, t) => {
			const month = new Date(t.date).getMonth() + 1; // Get the month as a number (0-11)
			acc[month] = (acc[month] || 0) + t.amount;
			return acc;
		},
		{}
	);

	// Prepare data for the chart (convert month index to month name)
	const data = Object.entries(monthlyData)
		.map(([monthIndex, amount]) => ({
			month: new Date(0, parseInt(monthIndex), 0).toLocaleString(
				"default",
				{
					month: "short",
				}
			), // Convert index to month name (e.g., "Jan", "Feb", etc.)
			amount,
		}))
		.sort((a, b) => {
			// Sort by month in numerical order (Jan -> Dec)
			const monthOrder = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];
			return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
		});

	return (
		<Card className="m-2">
			<CardHeader>
				<CardTitle>Monthly Expenses</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="amount" fill="#624CF5" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default MonthlyExpensesChart;
