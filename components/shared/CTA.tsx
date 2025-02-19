import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
	return (
		<section className="py-20">
			<div className="px-4 text-center">
				<h2 className="text-3xl font-bold mb-6">
					Ready to start tracking your expenses?
				</h2>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
					Join thousands of users who have already taken control of
					their finances.
				</p>
				<Link href="/dashboard">
					<Button>Start Tracking Now</Button>
				</Link>
			</div>
		</section>
	);
}
