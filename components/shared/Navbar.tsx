import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	return (
		<nav className="border-b">
			<div className="wrapper p-2 flex items-center justify-between">
				<Link href="/">
					<h1 className="text-2xl w-full size-55 text-black font-extrabold" > EXPENSES TRACKER</h1>
				</Link>
				<Link href="/dashboard">
					<Button>Dashboard</Button>
				</Link>
			</div>
		</nav>
	);
}
