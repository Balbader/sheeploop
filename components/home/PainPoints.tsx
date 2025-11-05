'use client';

import { useEffect, useRef } from 'react';
import { Card } from '../ui/card';

export default function PainPoints() {
	const icon1Ref = useRef<HTMLDivElement | null>(null);
	const icon2Ref = useRef<HTMLDivElement | null>(null);
	const icon3Ref = useRef<HTMLDivElement | null>(null);
	const icon4Ref = useRef<HTMLDivElement | null>(null);

	const items = [
		{
			icon: '\uD83D\uDCC9',
			title: 'No growth despite daily posts.',
			ref: icon1Ref,
		},
		{
			icon: '\u23F3',
			title: 'No clear Ideal Follower Profile.',
			ref: icon2Ref,
		},
		{
			icon: '\uD83D\uDD70\uFE0F',
			title: 'Inconsistent content schedule.',
			ref: icon3Ref,
		},
		{
			icon: '\uD83D\uDE35\u200D\uD83D\uDCAB',
			title: 'No storyline that hooks long-term.',
			ref: icon4Ref,
		},
	];

	useEffect(() => {
		if (typeof window === 'undefined') return;

		(async () => {
			try {
				const { gsap } = await import('gsap');
				const icons = [
					icon1Ref.current,
					icon2Ref.current,
					icon3Ref.current,
					icon4Ref.current,
				].filter(Boolean);

				if (icons.length > 0) {
					// Initial state - hidden and positioned
					gsap.set(icons, {
						opacity: 0,
						scale: 0.8,
						y: 20,
					});

					// Entrance animation with stagger
					gsap.to(icons, {
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 0.7,
						ease: 'power3.out',
						stagger: 0.1,
						delay: 0.3,
					});

					// Continuous subtle pulse animation for each icon
					icons.forEach((icon, index) => {
						if (icon) {
							gsap.to(icon, {
								scale: 1.1,
								duration: 2 + index * 0.3,
								ease: 'sine.inOut',
								repeat: -1,
								yoyo: true,
								delay: 1 + index * 0.2,
							});
						}
					});
				}
			} catch (_) {
				// no-op if gsap not available
			}
		})();
	}, []);

	return (
		<section id="why" className="py-16 md:py-24">
			<div className="max-w-screen-xl mx-auto px-6">
				<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-center">
					Why growth feels{' '}
					<span className="text-red-600 font-bold">impossible</span>
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
							<div ref={it.ref} className="text-2xl">
								{it.icon}
							</div>
							<div className="mt-3 font-medium">{it.title}</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
