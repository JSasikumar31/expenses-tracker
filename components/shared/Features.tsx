import { features } from "@/data";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {
	return (
		<section className="py-20">
			<div className="wrapper px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Everything you need to manage your expenses
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map((feature, index) => (
						<FeatureCard key={index} {...feature} />
					))}
				</div>
			</div>
		</section>
	);
}

function FeatureCard({
	icon: Icon,
	title,
	description,
}: {
	icon: LucideIcon;
	title: string;
	description: string;
}) {
	return (
		<Card className="border-2">
			<CardHeader>
				<Icon className="h-8 w-8 text-primary mb-2" />
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
}
