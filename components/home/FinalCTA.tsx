'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Link from 'next/link';

export default function FinalCTA() {
	const ctaRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLAnchorElement | null>(null);
	const textRef = useRef<HTMLSpanElement | null>(null);

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

	const handleMouseEnter = async () => {
		if (typeof window === 'undefined' || !buttonRef.current) return;
		try {
			const { gsap } = await import('gsap');

			// Animate button scale and position
			gsap.to(buttonRef.current, {
				scale: 1.15,
				y: -2,
				duration: 0.3,
				ease: 'power2.out',
			});

			const rainbowColors = [
				'#ff0000', // red
				'#ff7f00', // orange
				'#ffff00', // yellow
				'#00ff00', // green
				'#0000ff', // blue
				'#4b0082', // indigo
				'#9400d3', // violet
			];

			// Create a timeline that cycles through rainbow colors
			const tl = gsap.timeline({ repeat: -1 });

			// Animate rainbow text effect
			if (textRef.current) {
				rainbowColors.forEach((color, index) => {
					tl.to(
						textRef.current,
						{
							color: color,
							duration: 0.3,
							ease: 'none',
						},
						index * 0.3,
					);
				});

				// Store timeline on element for cleanup
				(textRef.current as any).rainbowTimeline = tl;
			}

			// Animate rainbow border effect on button
			rainbowColors.forEach((color, index) => {
				tl.to(
					buttonRef.current,
					{
						borderColor: color,
						duration: 0.3,
						ease: 'none',
					},
					index * 0.3,
				);
			});

			// Store timeline on button for cleanup
			(buttonRef.current as any).rainbowBorderTimeline = tl;
		} catch (_) {
			// no-op if gsap not available
		}
	};

	const handleMouseLeave = async () => {
		if (typeof window === 'undefined' || !buttonRef.current) return;
		try {
			const { gsap } = await import('gsap');

			// Reset button scale and position
			gsap.to(buttonRef.current, {
				scale: 1,
				y: 0,
				duration: 0.3,
				ease: 'power2.out',
			});

			// Stop rainbow animations and reset colors
			const borderTl = (buttonRef.current as any).rainbowBorderTimeline;
			if (borderTl) {
				borderTl.kill();
				delete (buttonRef.current as any).rainbowBorderTimeline;
			}

			gsap.to(buttonRef.current, {
				borderColor: '', // Reset to original border color
				duration: 0.3,
				ease: 'power2.out',
			});

			if (textRef.current) {
				const textTl = (textRef.current as any).rainbowTimeline;
				if (textTl) {
					textTl.kill();
					delete (textRef.current as any).rainbowTimeline;
				}
				gsap.to(textRef.current, {
					color: '', // Reset to original color
					duration: 0.3,
					ease: 'power2.out',
				});
			}
		} catch (_) {
			// no-op if gsap not available
		}
	};

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
					<div className="mt-8 flex flex-col items-center justify-center gap-3">
						<Button
							asChild
							className="rounded-full px-5 py-3 text-sm font-medium border-2 border-black-500 hover:text-bold"
							variant="outline"
						>
							<Link
								ref={buttonRef}
								href="#"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								<span ref={textRef}>
									I really want to try it ^^
								</span>
							</Link>
						</Button>
						<span className="text-xs text-gray-500 italic">
							No credit card required
						</span>
					</div>
				</Card>
			</div>
		</section>
	);
}
