import { Calendar, ChartBar, PiggyBank, Settings } from "lucide-react";

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export const getMonthName = (month: number) => {
	const date = new Date();
	date.setMonth(month - 1);
	return date.toLocaleString("default", { month: "long" });
};

export const features = [
	{
		icon: PiggyBank,
		title: "Track Expenses",
		description:
			"Easily record and categorize your daily expenses with our intuitive interface.",
	},
	{
		icon: ChartBar,
		title: "Visual Analytics",
		description:
			"Get insights into your spending patterns with beautiful, interactive charts.",
	},
	{
		icon: Calendar,
		title: "Budget Planning",
		description:
			"Set monthly budgets and track your progress towards financial goals.",
	},
	{
		icon: Settings,
		title: "Customizable",
		description:
			"Personalize categories and adjust budgets to match your lifestyle.",
	},
];
