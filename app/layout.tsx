import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
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
			<body className={`${montserrat.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
