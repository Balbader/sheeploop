import { Card } from '../ui/card';
export default function PainPoints() {
	const items = [
		{ icon: '\uD83D\uDCC9', title: 'No growth despite daily posts.' },
		{ icon: '\u23F3', title: 'No clear Ideal Follower Profile.' },
		{ icon: '\uD83D\uDD70\uFE0F', title: 'Inconsistent content schedule.' },
		{
			icon: '\uD83D\uDE35\u200D\uD83D\uDCAB',
			title: 'No storyline that hooks long-term.',
		},
	];

	return (
		<section id="why" className="py-16 md:py-24">
			<div className="max-w-screen-xl mx-auto px-6">
				<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-center">
					Why growth feels impossible
				</h2>
				<p className="mt-3 text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
					Most creators struggle not from lack of effort, but from
					lack of focus and narrative.
				</p>
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
					{items.map((it) => (
						<Card
							key={it.title}
							className="p-5 transition hover:-translate-y-0.5 hover:shadow-md"
							aria-label={it.title}
						>
							<div className="text-2xl">{it.icon}</div>
							<div className="mt-3 font-medium">{it.title}</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
