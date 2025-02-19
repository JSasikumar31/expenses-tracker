import { LucideIcon } from "lucide-react";

interface InfoCardProps {
	amount: number;
	placeholder: string;
	icon: LucideIcon;
}

export default function InfoCard({
	amount,
	placeholder,
	icon: Icon,
}: InfoCardProps) {
	return (
		<div className="p-7 border border-border rounded-md flex justify-between items-center bg-card hover:shadow-md transition-all duration-300 flex-1 min-w-[12rem] cursor-default">
			<div>
				<h2 className="text-sm font-semibold text-chart-1">
					{placeholder}
				</h2>
				<h2 className="text-3xl font-bold text-foreground">{amount}</h2>
			</div>
			<Icon
				className={`p-3 h-12 w-12 text-white bg-primary rounded-full`}
			/>
		</div>
	);
}
