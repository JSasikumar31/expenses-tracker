"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	BookCopy,
	Cable,
	CircleDollarSign,
	HandCoins,
	LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarMenuItems = [
	{
		id: 1,
		name: "Dashboard",
		url: "/dashboard",
		icons: LayoutDashboard,
	},
	{
		id: 2,
		name: "Budgets",
		url: "/dashboard/budgets",
		icons: CircleDollarSign,
	},
	{
		id: 3,
		name: "Categories",
		url: "/dashboard/categories",
		icons: BookCopy,
	},
	{
		id: 4,
		name: "Transactions",
		url: "/dashboard/transactions",
		icons: HandCoins,
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader>
				<Link
					href="/"
					className="flex flex-wrap gap-1 items-center text-center"
				>
					<Image
						src="/logo-name.jpg"
						alt="Logo"
						width={50}
						height={50}
					/>
					<h2 className="text-3xl font-bold text-black">MoneyMap</h2>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{sidebarMenuItems.map((menu) => (
								<SidebarMenuItem key={menu.id}>
									<SidebarMenuButton
										asChild
										className={`text-base py-7 ${
											pathname === menu.url
												? "font-semibold bg-primary text-white hover:shadow-lg duration-300"
												: "text-black hover:bg-slate-100 hover:shadow-sm duration-300"
										}`}
									>
										<Link href={menu.url}>
											<span className="mr-2">
												{<menu.icons />}
											</span>
											{menu.name}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
