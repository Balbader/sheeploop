import ContactForm from '@/components/contact/ContactForm';
import Footer from '@/components/home/Footer';
import Hero from '@/components/faq/FaqHero';

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
			<Hero />
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
				<ContactForm />
			</div>
			<Footer />
		</div>
	);
}
