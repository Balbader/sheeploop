import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
export default function ValueProps() {
	const features = [
		{
			k: 'ifp',
			title: 'Define Your IFP',
			desc: 'We analyze your market and tell you who actually cares.',
		},
		{
			k: 'storyline',
			title: 'Storyline Engine',
			desc: 'We generate a multi-episode narrative your audience can follow.',
		},
		{
			k: 'plan',
			title: 'Daily / Weekly / Monthly Plan',
			desc: 'Never wonder what to post. We schedule it for you.',
		},
	];

	return (
		<section id="how" className="py-16 md:py-24 bg-slate-50/50">
			<div className="max-w-screen-xl mx-auto px-6">
				<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-center">
					SheepLoop does the strategy, you just hit record.
				</h2>
				<p className="mt-3 text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
					We turn your idea into a content-driven growth engine using
					research, narrative, and structure.
				</p>

				<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
					{features.map((f) => (
						<Card key={f.k}>
							<CardHeader>
								<CardTitle className="text-lg">
									{f.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 leading-relaxed">
									{f.desc}
								</p>
								<div
									className="mt-5 h-32 rounded-xl border border-dashed border-gray-200 bg-gradient-to-br from-white to-slate-50"
									aria-hidden
								/>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
