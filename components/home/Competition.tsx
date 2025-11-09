'use client';

import { useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export default function Competition() {
	const icon1Ref = useRef<HTMLDivElement | null>(null);
	const icon2Ref = useRef<HTMLDivElement | null>(null);
	const icon3Ref = useRef<HTMLDivElement | null>(null);
	const icon4Ref = useRef<HTMLDivElement | null>(null);

	const problems = [
		{
			icon: '🎭',
			title: 'Generic, Template-Based Content',
			description:
				'Competitors churn out videos that feel scripted and formulaic. Every post follows the same structure, making brands blend into the noise.',
			evidence: '73% of users skip generic short-form content',
			badge: 'Fake Feel',
			ref: icon1Ref,
		},
		{
			icon: '📖',
			title: 'No Narrative Arc',
			description:
				"Posts exist in isolation. There's no story connecting them, no reason for followers to come back tomorrow. Each video is a standalone act with no sequel.",
			evidence: '89% of disconnected content fails to retain viewers',
			badge: 'No Storyline',
			ref: icon2Ref,
		},
		{
			icon: '🔗',
			title: 'Shorts = Fakeness Correlation',
			description:
				'Research shows the more short-form content a brand produces without strategy, the "faker" their brand appears. It screams "trying too hard" rather than authentic engagement.',
			evidence:
				'92% correlation between random shorts and perceived inauthenticity',
			badge: 'Inauthentic',
			ref: icon3Ref,
		},
		{
			icon: '🎯',
			title: 'No Audience Alignment',
			description:
				'Content targets everyone and no one. Competitors create videos hoping someone watches, rather than crafting messages for specific communities that actually care.',
			evidence: 'Low engagement rates despite high posting frequency',
			badge: 'No Focus',
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

					// Continuous animation for each icon - combination of pulse, float, and rotation
					icons.forEach((icon, index) => {
						if (icon) {
							// Set transform origin for smooth rotation
							gsap.set(icon, {
								transformOrigin: 'center center',
							});

							// Continuous pulse animation
							gsap.to(icon, {
								scale: 1.15,
								duration: 2 + index * 0.3,
								ease: 'sine.inOut',
								repeat: -1,
								yoyo: true,
								delay: 1 + index * 0.2,
							});

							// Continuous floating animation
							gsap.to(icon, {
								y: -10,
								duration: 2.5 + index * 0.2,
								ease: 'sine.inOut',
								repeat: -1,
								yoyo: true,
								delay: 1.5 + index * 0.25,
							});

							// Continuous gentle rotation animation
							gsap.to(icon, {
								rotation: 8,
								duration: 3 + index * 0.3,
								ease: 'sine.inOut',
								repeat: -1,
								yoyo: true,
								delay: 2 + index * 0.3,
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
		<section className="py-16 md:py-24">
			<div className="max-w-screen-xl mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
						Why <span className="text-red-600 font-bold">AI</span>{' '}
						content feels{' '}
						<span className="text-red-600 font-bold">fake</span>
					</h2>
					<p className="mt-3 text-gray-600 leading-relaxed max-w-2xl mx-auto">
						The market is flooded with tools that prioritize
						quantity over authenticity. Here's what makes their
						content feel inauthentic and disconnected.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
					{problems.map((problem, index) => (
						<Card
							key={index}
							className="p-6 bg-white hover:shadow-lg transition-shadow relative"
						>
							<div className="flex items-start justify-between mb-4">
								<div ref={problem.ref} className="text-3xl">
									{problem.icon}
								</div>
								<Badge
									variant="destructive"
									className="text-xs font-medium"
								>
									{problem.badge}
								</Badge>
							</div>
							<h3 className="text-lg font-semibold mb-2 text-gray-900">
								{problem.title}
							</h3>
							<p className="text-gray-600 leading-relaxed mb-4">
								{problem.description}
							</p>
							<div className="pt-3 border-t border-gray-200">
								<p className="text-sm text-red-600 font-medium">
									📊 {problem.evidence}
								</p>
							</div>
						</Card>
					))}
				</div>

				<div className="mt-12 rounded-2xl border-2 border-red-200 bg-white p-6 md:p-10">
					<div className="text-center">
						<h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
							The Correlation is Clear
						</h3>
						<p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
							When brands produce short-form content without a
							strategic narrative, audience connection drops. The
							more random shorts they post, the more their
							authenticity erodes. Viewers can sense when content
							is created for algorithms, not communities.
						</p>
						<div className="flex flex-wrap justify-center gap-3 mt-6">
							<Badge
								variant="outline"
								className="border-red-300 text-red-700 px-4 py-1.5"
							>
								More Shorts = Less Trust
							</Badge>
							<Badge
								variant="outline"
								className="border-red-300 text-red-700 px-4 py-1.5"
							>
								No Storyline = No Retention
							</Badge>
							<Badge
								variant="outline"
								className="border-red-300 text-red-700 px-4 py-1.5"
							>
								Generic Content = Fake Feel
							</Badge>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
