import TermsHero from '@/components/term/TermsHero';
import TermsSection from '@/components/term/TermsSection';
import Footer from '@/components/home/Footer';
import TermsRainingSheepBackground from '@/components/term/TermsRainingSheepBackground';

export default function TermsPage() {
	return (
		<main className="min-h-screen bg-white relative">
			<TermsRainingSheepBackground />
			<TermsHero />
			<TermsSection />
			<Footer />
		</main>
	);
}
