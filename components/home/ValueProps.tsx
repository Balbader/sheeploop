'use client';

import { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
} from '../ui/dialog';
import FormSelectionTabs from '../user-validation-form/FormSelectionTabs';

export default function ValueProps() {
	const icon1Ref = useRef<HTMLDivElement | null>(null);
	const icon2Ref = useRef<HTMLDivElement | null>(null);
	const icon3Ref = useRef<HTMLDivElement | null>(null);
	const features = [
		{
			k: 'ifp',
			title: 'Define Your IFP',
			desc: 'We analyze your market and tell you who actually cares.',
			icon: '🎯',
			ref: icon1Ref,
		},
		{
			k: 'storyline',
			title: 'Storyline Engine',
			desc: 'We generate a multi-episode narrative your audience can follow.',
			icon: '🎬',
			ref: icon2Ref,
		},
		{
			k: 'plan',
			title: 'Daily / Weekly / Monthly Plan',
			desc: 'Never wonder what to post. We schedule it for you.',
			icon: '📅',
			ref: icon3Ref,
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
				].filter(Boolean);

				if (icons.length > 0) {
					// Initial state - hidden and scaled down
					gsap.set(icons, {
						opacity: 0,
						scale: 0.5,
						rotation: -15,
					});

					// Entrance animation with stagger
					gsap.to(icons, {
						opacity: 1,
						scale: 1,
						rotation: 0,
						duration: 0.6,
						ease: 'back.out(1.4)',
						stagger: 0.15,
						delay: 0.2,
					});

					// Continuous subtle bounce animation
					icons.forEach((icon, index) => {
						if (icon) {
							gsap.to(icon, {
								y: -8,
								duration: 1.5 + index * 0.2,
								ease: 'sine.inOut',
								repeat: -1,
								yoyo: true,
								delay: 0.8 + index * 0.2,
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
								<div ref={f.ref} className="text-2xl mb-3">
									{f.icon}
								</div>
								<CardTitle className="text-lg">
									{f.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 leading-relaxed">
									{f.desc}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-12 flex items-center justify-center">
					<Dialog>
						<DialogTrigger asChild>
							<Button className="rounded-full px-5 py-3 text-sm hover:font-bold hover:bg-green-500 hover:text-white">
								Try it now! It&apos;s free.
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle className="sr-only">
								Sign up or log in to SheepLoop
							</DialogTitle>
							<FormSelectionTabs />
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</section>
	);
}
