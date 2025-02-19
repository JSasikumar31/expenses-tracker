import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	return (
		<nav className="border-b">
			<div className="wrapper p-2 flex items-center justify-between">
				<Link href="/">
					<Image src="/logo.jpg" alt="Logo" width={50} height={50} />
				</Link>
				<Link href="/dashboard">
					<Button>Dashboard</Button>
				</Link>
			</div>
		</nav>
	);
}
