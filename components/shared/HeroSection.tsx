import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
	return (
		<section className="bg-gradient-to-b from-background to-muted py-20">
			<div className="wrapper px-4 text-center">
				<h1 className="text-4xl md:text-6xl font-bold mb-6">
					Take Control of Your Finances
				</h1>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					Track expenses, set budgets, and achieve your financial
					goals with our powerful yet simple expense tracking
					solution.
				</p>
				<Link href="/dashboard">
					<Button>Get Started Now</Button>
				</Link>
			</div>
		</section>
	);
}
