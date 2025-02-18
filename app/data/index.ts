export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export const getMonthName = (month: number) => {
	const date = new Date();
	date.setMonth(month - 1);
	return date.toLocaleString("default", { month: "long" });
};
