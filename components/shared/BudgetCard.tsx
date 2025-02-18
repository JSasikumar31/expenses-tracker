import { Budget } from "@/types/budget";
import { FolderOpen } from "lucide-react";
import Link from "next/link";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMonthName } from "@/app/data";

const BudgetCard = ({ budget }: { budget: Budget }) => {
	return (
		<Link
			key={budget._id}
			href={`/dashboard/transactions/${budget._id}`}
			passHref
		>
			<Card className="w-full min-w-96 mb-4 hover:shadow-lg hover:ring-2 hover:ring-primary-500 transition-all duration-300 cursor-pointer">
				<CardHeader>
					<div className="flex items-center gap-3">
						<div className="bg-slate-100 p-3 rounded-full shadow-md">
							<FolderOpen className="text-primary-500" />
						</div>
						<div>
							<CardTitle className="text-lg font-semibold text-foreground">
								{budget.name}
							</CardTitle>
							<div className="text-sm text-muted-foreground">
								{budget.year} - {getMonthName(budget.month)}
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-3 mt-2">
					<div className="flex justify-between items-center">
						<div className="text-xl font-semibold text-primary-700">
							<span>&#8377;</span>{" "}
							{budget.amount.toLocaleString()}
						</div>
						<Badge className="bg-slate-200 text-primary-500">
							{budget.category.name}
						</Badge>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
					<span className="flex items-center gap-1">
						Spent:{" "}
						<span className="font-semibold">
							&#8377;{budget.amount.toLocaleString()}
						</span>
					</span>
					<span className="text-xs">
						Remaining: &#8377;
						{(budget.amount * 0.2).toLocaleString()}
					</span>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default BudgetCard;
