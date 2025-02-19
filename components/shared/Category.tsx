import {
	BarChart,
	Bar,
	PieChart,
	Pie,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Cell,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CategoryDistributionProps {
	budgets: Budget[];
	categories: Category[];
}
import { COLORS } from "@/data";
import { Category } from "@/types/category";
import { Budget } from "@/types/budget";

/**
 * To show category distribution, we need to first aggregate the actual budget by category.
 * This is done by iterating over the budgets and finding the associated category for each budget.
 *
 * @description
 * @function categoryData - Aggregates the budget amount by category
 * @returns {Object} - An object where keys are category names and values are budget amounts
 *
 * @description
 * @function pieChartData - Prepares data for the pie chart
 * @returns {Array} - An array of objects, each representing a category with budgeted amount
 *
 * @description
 * @function barChartData - Prepares data for the bar chart
 * @returns {Array} - An array of objects, each representing a category with budgeted amount
 */

const CategoryDistribution = ({
	budgets,
	categories,
}: CategoryDistributionProps) => {
	// Aggregate the budget amount by category
	const categoryData = budgets.reduce((acc: { [key: string]: number }, t) => {
		const category =
			categories.find((c) => c._id === t.category._id)?.name || "Unknown";
		acc[category] = (acc[category] || 0) + t.amount;
		return acc;
	}, {});

	// Prepare data for the pie chart
	const pieChartData = Object.entries(categoryData).map(([name, value]) => ({
		name,
		value,
	}));

	// Prepare data for the bar chart
	const barChartData = pieChartData.map((item) => ({
		name: item.name,
		value: item.value,
	}));

	return (
		<Card className="mb-6">
			<CardHeader>
				<CardTitle>Category Distribution</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-6">
					{/* Pie Chart */}
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={pieChartData}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={100}
								label
							>
								{pieChartData.map((entry, index) => (
									<Cell
										key={index}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip
								content={({ payload }) => {
									if (payload && payload.length) {
										const { name, value } =
											payload[0].payload;
										return (
											<div>
												<strong>{name}</strong>
												<p>Amount: &#8377; {value}</p>
											</div>
										);
									}
									return null;
								}}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>

				<div>
					{/* Bar Chart */}
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={barChartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar
								dataKey="value"
								fill="#8884d8"
								background={{ fill: "#eee" }}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="mt-6">
					{/* Line Chart to visualize monthly/ yearly trends) */}
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={pieChartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="value"
								stroke="#82ca9d"
								activeDot={{ r: 8 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default CategoryDistribution;
