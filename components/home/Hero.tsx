'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Sparkles, TrendingUp, Crosshair } from 'lucide-react';
import Link from 'next/link';

import BackedBy from './BackedBy';

export default function Hero() {
	const heroRef = useRef<HTMLDivElement | null>(null);
	const headlineRef = useRef<HTMLHeadingElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);
	const icon1Ref = useRef<HTMLDivElement | null>(null);
	const icon2Ref = useRef<HTMLDivElement | null>(null);
	const icon3Ref = useRef<HTMLDivElement | null>(null);

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

				// Animate icons
				const icons = [
					icon1Ref.current,
					icon2Ref.current,
					icon3Ref.current,
				].filter(Boolean);
				if (icons.length > 0) {
					gsap.set(icons, {
						opacity: 0,
						scale: 0.5,
						rotation: -10,
					});
					gsap.to(icons, {
						opacity: 1,
						scale: 1,
						rotation: 0,
						duration: 0.6,
						ease: 'back.out(1.2)',
						delay: 0.5,
						stagger: 0.1,
					});

					// Continuous subtle pulse animation with hover
					icons.forEach((icon) => {
						if (icon) {
							const pulseAnimation = gsap.to(icon, {
								scale: 1.05,
								duration: 2,
								ease: 'sine.inOut',
								repeat: -1,
								yoyo: true,
								delay: 1.2,
								paused: true,
							});

							pulseAnimation.play();

							// Hover animations
							icon.addEventListener('mouseenter', () => {
								gsap.to(icon, {
									scale: 1.15,
									rotation: 5,
									duration: 0.3,
									ease: 'back.out(1.7)',
								});
								pulseAnimation.pause();
							});

							icon.addEventListener('mouseleave', () => {
								gsap.to(icon, {
									scale: 1.05,
									rotation: 0,
									duration: 0.3,
									ease: 'power2.out',
								});
								pulseAnimation.resume();
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
						<Link href="#start">Get started</Link>
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
						Type your idea. Get a content strategy, IFP, storyline,
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
							<Link href="#start">Generate my plan</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							className="rounded-full px-5 py-3 text-sm"
						>
							<Link href="#how">See how it works</Link>
						</Button>
					</div>
				</div>

				<div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
					<Card className="p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
						<div className="flex items-start gap-3">
							<div
								ref={icon1Ref}
								className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center transition-all hover:bg-purple-200 cursor-pointer"
							>
								<Sparkles className="w-4 h-4 text-purple-600" />
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-sm mb-2">
									Smart 'Shorts'
								</h3>
								<p className="text-xs text-gray-600 leading-relaxed">
									A clear understanding of what value 'shorts'
									must create in order to build momentum.
								</p>
							</div>
						</div>
					</Card>
					<Card className="p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
						<div className="flex items-start gap-3">
							<div
								ref={icon2Ref}
								className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center transition-all hover:bg-blue-200 cursor-pointer"
							>
								<TrendingUp className="w-4 h-4 text-blue-600" />
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-sm mb-2">
									IFP with maximum engagement
								</h3>
								<p className="text-xs text-gray-600 leading-relaxed">
									Find your "Ideal Follower Profile", who
									exactly will engage with your content.
								</p>
							</div>
						</div>
					</Card>
					<Card className="p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
						<div className="flex items-start gap-3">
							<div
								ref={icon3Ref}
								className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center transition-all hover:bg-green-200 cursor-pointer"
							>
								<Crosshair className="w-4 h-4 text-green-600" />
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-sm mb-2">
									Focus on the right topics
								</h3>
								<p className="text-xs text-gray-600 leading-relaxed">
									Which topics to focus on to finding and
									engaging with your audience.
								</p>
							</div>
						</div>
					</Card>
				</div>
				<BackedBy />
			</div>
		</section>
	);
}
