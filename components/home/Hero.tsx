'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

export default function Hero() {
	const heroRef = useRef<HTMLDivElement | null>(null);
	const headlineRef = useRef<HTMLHeadingElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		(async () => {
			try {
				const { gsap } = await import('gsap');
				if (!heroRef.current || !headlineRef.current || !ctaRef.current)
					return;
				gsap.set([headlineRef.current, ctaRef.current], {
					opacity: 0,
					y: 16,
				});
				gsap.to(headlineRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: 'power2.out',
					delay: 0.1,
				});
				gsap.to(ctaRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: 'power2.out',
					delay: 0.25,
				});
			} catch (_) {
				// no-op if gsap not available
			}
		})();
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
		>
			<header className="max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Image
						src="/sheep.png"
						alt="SheepLoop logo"
						width={32}
						height={32}
						className="rounded"
					/>
					<span className="text-base font-semibold">SheepLoop</span>
				</div>
				<div>
					<Button
						asChild
						className="rounded-full px-5 py-2.5 text-sm"
					>
						<a href="#start">Get started</a>
					</Button>
				</div>
			</header>

			<div className="max-w-screen-xl mx-auto px-6 pt-6 pb-16 md:pb-24">
				<div className="mx-auto max-w-3xl text-center">
					<Badge
						variant="secondary"
						className="rounded-full px-3 py-1 text-[11px]"
					>
						AI coach for creators
					</Badge>
					<h1
						ref={headlineRef}
						className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight"
					>
						Your AI growth partner for TikTok & Instagram.
					</h1>
					<p className="mt-4 text-gray-600 leading-relaxed md:text-lg">
						Type your idea. Get a content strategy, ICP, storyline,
						and posting schedule.
					</p>
					<div
						ref={ctaRef}
						className="mt-8 flex items-center justify-center gap-3"
					>
						<Button
							asChild
							className="rounded-full px-5 py-3 text-sm"
						>
							<a href="#start">Generate my plan</a>
						</Button>
						<Button
							asChild
							variant="outline"
							className="rounded-full px-5 py-3 text-sm"
						>
							<a href="#how">See how it works</a>
						</Button>
					</div>
				</div>

				<div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
					<Card className="p-5 h-28" />
					<Card className="p-5 h-28" />
					<Card className="p-5 h-28" />
				</div>
			</div>
		</section>
	);
}
