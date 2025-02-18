// components/shared/TransactionCard.tsx
import { Transaction } from "@/types/transaction"; // Assuming you have a `Transaction` type
import { CreditCard } from "lucide-react";
import Link from "next/link";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
	return (
		<Link
			key={transaction._id}
			href={`/dashboard/transactions/${transaction._id}`}
		>
			<article className="border border-slate-200 rounded-md p-5 hover:shadow-lg hover:border-slate-300 cursor-pointer transition duration-200 w-60 bg-card mb-4 flex-1">
				<div className="flex justify-between gap-2 items-center">
					<div className="flex items-center gap-3 w-full">
						<div className="bg-slate-100 shadow-sm rounded-full p-3 border border-slate-200 text-foreground">
							<CreditCard />
						</div>
						<div>
							<h2 className="text-lg font-bold text-foreground">
								{transaction.description}
							</h2>
							<p className="text-sm text-chart-3">
								{new Date(
									transaction.date
								).toLocaleDateString()}
							</p>
						</div>
					</div>
					<h2 className="text-2xl font-bold text-chart-1 flex items-center gap-1">
						<span>&#8377;</span>{" "}
						{transaction.amount.toLocaleString()}
					</h2>
				</div>
			</article>
		</Link>
	);
};

export default TransactionCard;
