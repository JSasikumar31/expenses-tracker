import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t mt-auto">
			<div className="wrapper p-2 flex justify-between items-center">
				<Link href="/">
				<h1 className="text-2xl w-full size-55 text-black font-extrabold" > EXPENSES TRACKER</h1>
				</Link>
				<div className="text-sm text-muted-foreground">
					© {new Date().getFullYear()} SASIKUMAR_31. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
