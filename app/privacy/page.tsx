import PrivacyHero from '@/components/pravacy/PrivacyHero';
import PrivacySection from '@/components/pravacy/PrivacySection';
import Footer from '@/components/home/Footer';
import PrivacyRainingSheepBackground from '@/components/pravacy/PrivacyRainingSheepBackground';

export default function PrivacyPage() {
	return (
		<main className="min-h-screen bg-white relative">
			<PrivacyRainingSheepBackground />
			<PrivacyHero />
			<PrivacySection />
			<Footer />
		</main>
	);
}
