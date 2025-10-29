'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export default function FinalCTA() {
	const ctaRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		(async () => {
			try {
				const { gsap } = await import('gsap');
				if (!ctaRef.current) return;
				const el = ctaRef.current;
				gsap.set(el, { opacity: 0, y: 16 });
				gsap.to(el, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: 'power2.out',
				});
			} catch (_) {
				// no-op if gsap not available
			}
		})();
	}, []);

	return (
		<section
			id="start"
			className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50"
		>
			<div className="max-w-screen-xl mx-auto px-6">
				<Card
					ref={ctaRef}
					className="px-6 py-10 md:px-10 md:py-14 text-center"
				>
					<h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
						Turn your idea into a community in days, not months.
					</h2>
					<p className="mt-4 text-gray-600 leading-relaxed md:text-lg">
						Answer a few questions and get your full TikTok &
						Instagram growth plan.
					</p>
					<div className="mt-8 flex items-center justify-center gap-3">
						<Button
							asChild
							className="rounded-full px-5 py-3 text-sm"
						>
							<a href="#start">Start for free</a>
						</Button>
						<span className="text-xs text-gray-500">
							No credit card required.
						</span>
					</div>
				</Card>
			</div>
		</section>
	);
}
