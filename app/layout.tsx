import type { Metadata } from "next";
import { Montserrat, Poppins, Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
});

const rubik = Rubik({
	subsets: ["latin"],
	variable: "--font-rubik",
});

export const metadata: Metadata = {
	title: "MoneyMap",
	description: "A personal finance visualizer app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
