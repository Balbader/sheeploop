import Hero from '@/components/faq/FaqHero';
import FaqSection from '@/components/faq/FaqSection';
import Footer from '@/components/home/Footer';
import RainingSheepBackground from '@/components/faq/RainingSheepBackground';

export default function FAQPage() {
	return (
		<main className="min-h-screen bg-white relative">
			<RainingSheepBackground />
			<Hero />
			<FaqSection />
			<Footer />
		</main>
	);
}
