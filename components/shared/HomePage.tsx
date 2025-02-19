import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Features from "./Features";
import CTA from "./CTA";
import Footer from "./Footer";

export default function HomePage() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<HeroSection />
			<Features />
			<CTA />
			<Footer />
		</div>
	);
}
