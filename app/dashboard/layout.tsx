import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1 relative">
				<SidebarTrigger />
				<DashboardHeader />
				{children}
			</main>
		</SidebarProvider>
	);
}
