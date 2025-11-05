import Hero from '../components/home/Hero';
import PainPoints from '../components/home/PainPoints';
import ValueProps from '../components/home/ValueProps';
import Credibility from '../components/home/Credibility';
import Competition from '../components/home/Competition';
import FinalCTA from '../components/home/FinalCTA';
import Footer from '../components/home/Footer';
import FaqSection from '@/components/faq/FaqSection';

export default function Home() {
	return (
		<main className="min-h-screen bg-white">
			<Hero />
			<PainPoints />
			<ValueProps />
			<Competition />
			<Credibility />
			<FinalCTA />
			<FaqSection />
			<Footer />
		</main>
	);
}
