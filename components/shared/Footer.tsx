import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t mt-auto">
			<div className="wrapper p-2 flex justify-between items-center">
				<Link href="/">
					<Image
						src="/logo-name.jpg"
						alt="Logo"
						width={60}
						height={60}
					/>
				</Link>
				<div className="text-sm text-muted-foreground">
					© {new Date().getFullYear()} MoneyMap. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
