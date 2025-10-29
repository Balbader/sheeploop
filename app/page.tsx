import Hero from '../components/home/Hero';
import PainPoints from '../components/home/PainPoints';
import ValueProps from '../components/home/ValueProps';
import Credibility from '../components/home/Credibility';
import FinalCTA from '../components/home/FinalCTA';
import Footer from '../components/home/Footer';

export default function Home() {
	return (
		<main className="min-h-screen bg-white">
			<Hero />
			<PainPoints />
			<ValueProps />
			<Credibility />
			<FinalCTA />
			<Footer />
		</main>
	);
}
