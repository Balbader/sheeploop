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
	const backgroundRef = useRef<HTMLDivElement | null>(null);
	const sheep1Ref = useRef<HTMLDivElement | null>(null);
	const sheep2Ref = useRef<HTMLDivElement | null>(null);
	const sheep3Ref = useRef<HTMLDivElement | null>(null);
	const sheep4Ref = useRef<HTMLDivElement | null>(null);
	const sheep5Ref = useRef<HTMLDivElement | null>(null);
	const sheep6Ref = useRef<HTMLDivElement | null>(null);
	const headlineRef = useRef<HTMLHeadingElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);
	const icon1Ref = useRef<HTMLDivElement | null>(null);
	const icon2Ref = useRef<HTMLDivElement | null>(null);
	const icon3Ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		let cleanupMouseMove: (() => void) | null = null;

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

				// Mouse interaction for background and sheep
				if (backgroundRef.current && heroRef.current) {
					// Initialize sheep refs
					const sheepRefs = [
						sheep1Ref.current,
						sheep2Ref.current,
						sheep3Ref.current,
						sheep4Ref.current,
						sheep5Ref.current,
						sheep6Ref.current,
					].filter(Boolean);

					// Initialize sheep positions
					sheepRefs.forEach((sheep) => {
						if (sheep) {
							gsap.set(sheep, {
								transformOrigin: 'center center',
							});
						}
					});

					const handleMouseMove = (e: MouseEvent) => {
						if (!heroRef.current || !backgroundRef.current) return;

						const rect = heroRef.current.getBoundingClientRect();
						const x =
							((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
						const y =
							((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1

						// Animate background gradient
						gsap.to(backgroundRef.current, {
							x: x * 50, // Max 50px movement
							y: y * 50, // Max 50px movement
							duration: 1.2,
							ease: 'power2.out',
						});

						// Animate sheep characters - each follows mouse with different intensity
						sheepRefs.forEach((sheep, index) => {
							if (!sheep) return;
							const intensity = 0.3 + index * 0.2; // Different follow intensity for each sheep

							gsap.to(sheep, {
								x: x * 40 * intensity,
								y: y * 40 * intensity,
								rotation: x * 15 * intensity, // Slight rotation
								duration: 1 + index * 0.3, // Different speeds
								ease: 'power2.out',
							});
						});
					};

					heroRef.current.addEventListener(
						'mousemove',
						handleMouseMove,
					);

					cleanupMouseMove = () => {
						if (heroRef.current) {
							heroRef.current.removeEventListener(
								'mousemove',
								handleMouseMove,
							);
						}
					};
				}
			} catch (_) {
				// no-op if gsap not available
			}
		})();

		return () => {
			if (cleanupMouseMove) {
				cleanupMouseMove();
			}
		};
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
		>
			{/* Subtle animated background */}
			<div
				ref={backgroundRef}
				className="absolute inset-0 opacity-80 pointer-events-none"
				style={{
					background:
						'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.35) 0%, transparent 60%)',
				}}
			/>
			{/* Prairie background */}
			<div
				className="absolute inset-0 pointer-events-none overflow-hidden"
				style={{ zIndex: 1 }}
			>
				{/* Sky gradient */}
				<div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-100 to-green-100 opacity-70" />

				{/* Rolling hills */}
				<svg
					className="absolute bottom-0 w-full h-full opacity-70"
					viewBox="0 0 1200 600"
					preserveAspectRatio="none"
				>
					{/* Distant hills */}
					<path
						d="M0,400 Q200,350 400,380 T800,360 T1200,380 L1200,600 L0,600 Z"
						fill="rgba(21, 128, 61, 0.4)"
					/>
					{/* Middle hills */}
					<path
						d="M0,450 Q300,420 600,440 T1200,430 L1200,600 L0,600 Z"
						fill="rgba(34, 197, 94, 0.5)"
					/>
					{/* Foreground hills */}
					<path
						d="M0,500 Q400,470 800,490 T1200,480 L1200,600 L0,600 Z"
						fill="rgba(74, 222, 128, 0.6)"
					/>
				</svg>

				{/* Grass layer */}
				<div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-green-300 to-transparent opacity-80" />

				{/* Grass blades scattered */}
				<svg
					className="absolute bottom-0 w-full h-full opacity-60"
					viewBox="0 0 1200 600"
					preserveAspectRatio="none"
				>
					{/* Grass blades */}
					{Array.from({ length: 30 }).map((_, i) => {
						const x = (i * 40) % 1200;
						const y = 550 + (i % 5) * 10;
						const height = 15 + (i % 8);
						return (
							<path
								key={i}
								d={`M${x},${y} Q${x - 3},${y - height} ${x},${
									y - height * 1.2
								} T${x},${y - height}`}
								stroke="rgba(21, 128, 61, 0.7)"
								strokeWidth="2"
								fill="none"
							/>
						);
					})}
				</svg>
			</div>
			{/* Animated sheep characters */}
			<div
				ref={sheep1Ref}
				className="absolute top-1/4 left-1/4 w-24 h-24 pointer-events-none opacity-40"
				style={{ zIndex: 2 }}
			>
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{/* Wool - body base */}
					<ellipse cx="50" cy="65" rx="28" ry="22" fill="white" />
					{/* Wool fluffs - overlapping for texture */}
					<circle cx="25" cy="55" r="14" fill="white" />
					<circle cx="35" cy="50" r="13" fill="white" />
					<circle cx="75" cy="55" r="14" fill="white" />
					<circle cx="65" cy="50" r="13" fill="white" />
					<circle cx="20" cy="70" r="11" fill="white" />
					<circle cx="42" cy="75" r="12" fill="white" />
					<circle cx="80" cy="70" r="11" fill="white" />
					<circle cx="58" cy="75" r="12" fill="white" />
					<circle cx="45" cy="60" r="10" fill="white" />
					<circle cx="55" cy="60" r="10" fill="white" />
					{/* Head - smaller and more proportional */}
					<ellipse cx="50" cy="30" rx="12" ry="14" fill="white" />
					{/* Ears */}
					<ellipse cx="40" cy="28" rx="3" ry="6" fill="white" />
					<ellipse cx="60" cy="28" rx="3" ry="6" fill="white" />
					{/* Legs */}
					<rect
						x="35"
						y="82"
						width="6"
						height="12"
						rx="3"
						fill="white"
					/>
					<rect
						x="45"
						y="82"
						width="6"
						height="12"
						rx="3"
						fill="white"
					/>
					<rect
						x="49"
						y="82"
						width="6"
						height="12"
						rx="3"
						fill="white"
					/>
					<rect
						x="59"
						y="82"
						width="6"
						height="12"
						rx="3"
						fill="white"
					/>
					{/* Eyes */}
					<circle cx="45" cy="28" r="2.5" fill="black" />
					<circle cx="55" cy="28" r="2.5" fill="black" />
					{/* Nose/mouth */}
					<ellipse cx="50" cy="34" rx="2" ry="1.5" fill="black" />
				</svg>
			</div>
			<div
				ref={sheep2Ref}
				className="absolute top-1/2 right-1/3 w-[88px] h-[88px] pointer-events-none opacity-35"
				style={{ zIndex: 2 }}
			>
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{/* Wool - body base */}
					<ellipse cx="50" cy="65" rx="26" ry="20" fill="white" />
					{/* Wool fluffs */}
					<circle cx="26" cy="56" r="13" fill="white" />
					<circle cx="36" cy="52" r="12" fill="white" />
					<circle cx="74" cy="56" r="13" fill="white" />
					<circle cx="64" cy="52" r="12" fill="white" />
					<circle cx="22" cy="72" r="10" fill="white" />
					<circle cx="42" cy="76" r="11" fill="white" />
					<circle cx="78" cy="72" r="10" fill="white" />
					<circle cx="58" cy="76" r="11" fill="white" />
					<circle cx="44" cy="62" r="9" fill="white" />
					<circle cx="56" cy="62" r="9" fill="white" />
					{/* Head */}
					<ellipse cx="50" cy="30" rx="11" ry="13" fill="white" />
					{/* Ears */}
					<ellipse cx="40" cy="28" rx="2.5" ry="5.5" fill="white" />
					<ellipse cx="60" cy="28" rx="2.5" ry="5.5" fill="white" />
					{/* Legs */}
					<rect
						x="36"
						y="82"
						width="5"
						height="11"
						rx="2.5"
						fill="white"
					/>
					<rect
						x="44"
						y="82"
						width="5"
						height="11"
						rx="2.5"
						fill="white"
					/>
					<rect
						x="51"
						y="82"
						width="5"
						height="11"
						rx="2.5"
						fill="white"
					/>
					<rect
						x="59"
						y="82"
						width="5"
						height="11"
						rx="2.5"
						fill="white"
					/>
					{/* Eyes */}
					<circle cx="45" cy="28" r="2.3" fill="black" />
					<circle cx="55" cy="28" r="2.3" fill="black" />
					{/* Nose/mouth */}
					<ellipse cx="50" cy="34" rx="1.8" ry="1.3" fill="black" />
				</svg>
			</div>
			<div
				ref={sheep3Ref}
				className="absolute bottom-1/4 right-1/4 w-20 h-20 pointer-events-none opacity-30"
				style={{ zIndex: 2 }}
			>
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{/* Wool - body base */}
					<ellipse cx="50" cy="65" rx="23" ry="18" fill="white" />
					{/* Wool fluffs */}
					<circle cx="29" cy="57" r="11" fill="white" />
					<circle cx="38" cy="54" r="10" fill="white" />
					<circle cx="71" cy="57" r="11" fill="white" />
					<circle cx="62" cy="54" r="10" fill="white" />
					<circle cx="25" cy="73" r="9" fill="white" />
					<circle cx="41" cy="76" r="9.5" fill="white" />
					<circle cx="75" cy="73" r="9" fill="white" />
					<circle cx="59" cy="76" r="9.5" fill="white" />
					<circle cx="44" cy="63" r="8" fill="white" />
					<circle cx="56" cy="63" r="8" fill="white" />
					{/* Head */}
					<ellipse cx="50" cy="30" rx="9.5" ry="11" fill="white" />
					{/* Ears */}
					<ellipse cx="41" cy="28" rx="2" ry="4.5" fill="white" />
					<ellipse cx="59" cy="28" rx="2" ry="4.5" fill="white" />
					{/* Legs */}
					<rect
						x="38"
						y="82"
						width="4"
						height="9"
						rx="2"
						fill="white"
					/>
					<rect
						x="44"
						y="82"
						width="4"
						height="9"
						rx="2"
						fill="white"
					/>
					<rect
						x="52"
						y="82"
						width="4"
						height="9"
						rx="2"
						fill="white"
					/>
					<rect
						x="58"
						y="82"
						width="4"
						height="9"
						rx="2"
						fill="white"
					/>
					{/* Eyes */}
					<circle cx="45" cy="28" r="2" fill="black" />
					<circle cx="55" cy="28" r="2" fill="black" />
					{/* Nose/mouth */}
					<ellipse cx="50" cy="34" rx="1.5" ry="1.2" fill="black" />
				</svg>
			</div>
			<div
				ref={sheep4Ref}
				className="absolute top-1/3 left-1/2 w-[80px] h-[80px] pointer-events-none opacity-38"
				style={{ zIndex: 2 }}
			>
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{/* Wool - body base */}
					<ellipse cx="50" cy="65" rx="25" ry="19" fill="white" />
					{/* Wool fluffs */}
					<circle cx="27" cy="56" r="12.5" fill="white" />
					<circle cx="37" cy="53" r="11.5" fill="white" />
					<circle cx="73" cy="56" r="12.5" fill="white" />
					<circle cx="63" cy="53" r="11.5" fill="white" />
					<circle cx="23" cy="73" r="10" fill="white" />
					<circle cx="41" cy="77" r="10.5" fill="white" />
					<circle cx="77" cy="73" r="10" fill="white" />
					<circle cx="59" cy="77" r="10.5" fill="white" />
					<circle cx="44" cy="63" r="9" fill="white" />
					<circle cx="56" cy="63" r="9" fill="white" />
					{/* Head */}
					<ellipse cx="50" cy="30" rx="10.5" ry="12.5" fill="white" />
					{/* Ears */}
					<ellipse cx="41" cy="28" rx="2.3" ry="5" fill="white" />
					<ellipse cx="59" cy="28" rx="2.3" ry="5" fill="white" />
					{/* Legs */}
					<rect
						x="37"
						y="82"
						width="4.5"
						height="10"
						rx="2"
						fill="white"
					/>
					<rect
						x="44"
						y="82"
						width="4.5"
						height="10"
						rx="2"
						fill="white"
					/>
					<rect
						x="51.5"
						y="82"
						width="4.5"
						height="10"
						rx="2"
						fill="white"
					/>
					<rect
						x="58.5"
						y="82"
						width="4.5"
						height="10"
						rx="2"
						fill="white"
					/>
					{/* Eyes */}
					<circle cx="45" cy="28" r="2.5" fill="black" />
					<circle cx="55" cy="28" r="2.5" fill="black" />
					{/* Nose/mouth */}
					<ellipse cx="50" cy="34" rx="1.7" ry="1.2" fill="black" />
				</svg>
			</div>
			<div
				ref={sheep5Ref}
				className="absolute bottom-1/3 left-1/6 w-[72px] h-[72px] pointer-events-none opacity-33"
				style={{ zIndex: 2 }}
			>
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{/* Body */}
					<ellipse cx="50" cy="60" rx="22" ry="17.5" fill="white" />
					{/* Head */}
					<circle cx="50" cy="35" r="15.5" fill="white" />
					{/* Wool fluffs */}
					<circle cx="32.5" cy="52" r="10.5" fill="white" />
					<circle cx="67.5" cy="52" r="10.5" fill="white" />
					<circle cx="43" cy="72" r="8.5" fill="white" />
					<circle cx="57" cy="72" r="8.5" fill="white" />
					{/* Eyes */}
					<circle cx="47" cy="30.5" r="2.3" fill="black" />
					<circle cx="53" cy="30.5" r="2.3" fill="black" />
					{/* Nose */}
					<ellipse cx="50" cy="36.5" rx="1.6" ry="1.1" fill="black" />
				</svg>
			</div>
			<div
				ref={sheep6Ref}
				className="absolute top-2/3 right-1/6 w-[76px] h-[76px] pointer-events-none opacity-32"
				style={{ zIndex: 2 }}
			>
				<svg viewBox="0 0 100 100" className="w-full h-full">
					{/* Wool - body base */}
					<ellipse cx="50" cy="65" rx="24.5" ry="19" fill="white" />
					{/* Wool fluffs */}
					<circle cx="28" cy="57" r="12" fill="white" />
					<circle cx="37" cy="54" r="11" fill="white" />
					<circle cx="72" cy="57" r="12" fill="white" />
					<circle cx="63" cy="54" r="11" fill="white" />
					<circle cx="24" cy="73" r="9.5" fill="white" />
					<circle cx="41" cy="77" r="10" fill="white" />
					<circle cx="76" cy="73" r="9.5" fill="white" />
					<circle cx="59" cy="77" r="10" fill="white" />
					<circle cx="44" cy="63" r="9" fill="white" />
					<circle cx="56" cy="63" r="9" fill="white" />
					{/* Head */}
					<ellipse cx="50" cy="30" rx="10.2" ry="12.2" fill="white" />
					{/* Ears */}
					<ellipse cx="41" cy="28" rx="2.2" ry="4.8" fill="white" />
					<ellipse cx="59" cy="28" rx="2.2" ry="4.8" fill="white" />
					{/* Legs */}
					<rect
						x="37"
						y="82"
						width="4.5"
						height="10"
						rx="2"
						fill="white"
					/>
					<rect
						x="44"
						y="82"
						width="4.5"
						height="10"
						rx="2"
						fill="white"
					/>
					<rect
						x="51.5"
						y="82"
						width="4.5"
						height="10"
						rx="2"
						fill="white"
					/>
					<rect
						x="58.5"
						y="82"
						width="4.5"
						height="10"
						rx="2"
						fill="white"
					/>
					{/* Eyes */}
					<circle cx="45" cy="28" r="2.4" fill="black" />
					<circle cx="55" cy="28" r="2.4" fill="black" />
					{/* Nose/mouth */}
					<ellipse cx="50" cy="34" rx="1.65" ry="1.2" fill="black" />
				</svg>
			</div>
			<header className="max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
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

			<div className="max-w-screen-xl mx-auto px-6 pt-6 pb-16 md:pb-24 relative z-10">
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
