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
	const sheep7Ref = useRef<HTMLDivElement | null>(null);
	const sheep8Ref = useRef<HTMLDivElement | null>(null);
	const sheep9Ref = useRef<HTMLDivElement | null>(null);
	const sheep10Ref = useRef<HTMLDivElement | null>(null);
	const sheep11Ref = useRef<HTMLDivElement | null>(null);
	const sheep12Ref = useRef<HTMLDivElement | null>(null);
	const cloudsRef = useRef<HTMLDivElement | null>(null);
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
						sheep7Ref.current,
						sheep8Ref.current,
						sheep9Ref.current,
						sheep10Ref.current,
						sheep11Ref.current,
						sheep12Ref.current,
					].filter(Boolean);

					// Initialize sheep positions
					sheepRefs.forEach((sheep) => {
						if (sheep) {
							gsap.set(sheep, {
								transformOrigin: 'center center',
							});
						}
					});

					// Automatic sheep movement animations
					sheepRefs.forEach((sheep, index) => {
						if (!sheep) return;

						// Each sheep gets unique movement parameters
						const speed = 15 + (index % 5) * 3; // Vary speed between 15-30
						const duration = 20 + (index % 7) * 2; // Vary duration between 20-32
						const amplitude = 60 + (index % 4) * 20; // Increased movement range (was 30-40, now 60-80)

						// Create random starting offsets for each sheep
						const startX = ((index % 3) - 1) * 30;
						const startY = (index % 2 === 0 ? 1 : -1) * 25;

						// Horizontal wandering animation
						gsap.to(sheep, {
							x: startX + amplitude * (index % 2 === 0 ? 1 : -1),
							duration: duration,
							ease: 'sine.inOut',
							repeat: -1,
							yoyo: true,
							delay: index * 0.3,
						});

						// Vertical bobbing animation (increased movement)
						gsap.to(sheep, {
							y: startY + 20, // Increased from 10 to 20
							duration: duration * 0.8,
							ease: 'sine.inOut',
							repeat: -1,
							yoyo: true,
							delay: index * 0.2 + 0.5,
						});

						// Increased rotation animation
						gsap.to(sheep, {
							rotation: (index % 2 === 0 ? 1 : -1) * 15, // Increased from 8 to 15
							duration: duration * 1.2,
							ease: 'sine.inOut',
							repeat: -1,
							yoyo: true,
							delay: index * 0.4,
						});

						// Occasional scale bob (like breathing/grazing)
						gsap.to(sheep, {
							scale: 1 + (index % 3) * 0.03,
							duration: 4 + (index % 4),
							ease: 'sine.inOut',
							repeat: -1,
							yoyo: true,
							delay: index * 0.6,
						});
					});

					// Animate clouds with slow drifting motion
					if (cloudsRef.current) {
						const cloudElements =
							cloudsRef.current.querySelectorAll('svg');
						cloudElements.forEach((cloud, index) => {
							const speed = 20 + index * 5; // Vary speed per cloud
							const duration = 30 + index * 5; // Vary duration
							const direction = index % 2 === 0 ? 1 : -1; // Alternate directions

							gsap.to(cloud, {
								x: direction * speed,
								duration: duration,
								ease: 'none',
								repeat: -1,
								yoyo: true,
								delay: index * 0.5,
							});
						});
					}

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

						// Sheep no longer respond to mouse movement - they move automatically
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
			{/* Clouds in top 1/4 of hero section */}
			<div
				ref={cloudsRef}
				className="absolute top-0 left-0 w-full h-1/4 pointer-events-none overflow-hidden"
				style={{ zIndex: 1 }}
			>
				{/* Cloud 1 */}
				<svg
					className="absolute top-[10%] left-[5%] w-48 h-24 opacity-60"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M50,60 Q30,40 20,50 T10,55 Q15,45 25,48 T45,52 Q55,35 70,40 T95,38 Q105,28 120,35 T145,33 Q155,23 170,30 T195,28 Q190,38 180,40 T160,42 Q150,50 135,48 T110,50 Q100,55 85,53 T60,55 Q55,62 50,60 Z"
						fill="rgba(255, 255, 255, 0.8)"
					/>
				</svg>
				{/* Cloud 2 */}
				<svg
					className="absolute top-[15%] left-[25%] w-56 h-28 opacity-50"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M60,55 Q40,35 30,45 T20,50 Q25,40 35,43 T55,47 Q65,30 80,35 T105,33 Q115,23 130,30 T155,28 Q165,18 180,25 T200,23 Q195,33 185,35 T165,37 Q155,45 140,43 T115,45 Q105,50 90,48 T65,50 Q60,57 60,55 Z"
						fill="rgba(255, 255, 255, 0.75)"
					/>
				</svg>
				{/* Cloud 3 */}
				<svg
					className="absolute top-[8%] left-[45%] w-44 h-22 opacity-55"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M55,58 Q35,38 25,48 T15,53 Q20,43 30,46 T50,50 Q60,33 75,38 T100,36 Q110,26 125,33 T150,31 Q160,21 175,28 T195,26 Q190,36 180,38 T160,40 Q150,48 135,46 T110,48 Q100,53 85,51 T60,53 Q55,60 55,58 Z"
						fill="rgba(255, 255, 255, 0.7)"
					/>
				</svg>
				{/* Cloud 4 */}
				<svg
					className="absolute top-[12%] left-[65%] w-52 h-26 opacity-45"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M58,53 Q38,33 28,43 T18,48 Q23,38 33,41 T53,45 Q63,28 78,33 T103,31 Q113,21 128,28 T153,26 Q163,16 178,23 T198,21 Q193,31 183,33 T163,35 Q153,43 138,41 T113,43 Q103,48 88,46 T63,48 Q58,55 58,53 Z"
						fill="rgba(255, 255, 255, 0.8)"
					/>
				</svg>
				{/* Cloud 5 */}
				<svg
					className="absolute top-[6%] left-[80%] w-40 h-20 opacity-50"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M52,56 Q32,36 22,46 T12,51 Q17,41 27,44 T47,48 Q57,31 72,36 T97,34 Q107,24 122,31 T147,29 Q157,19 172,26 T192,24 Q187,34 177,36 T157,38 Q147,46 132,44 T107,46 Q97,51 82,49 T57,51 Q52,58 52,56 Z"
						fill="rgba(255, 255, 255, 0.7)"
					/>
				</svg>
				{/* Cloud 6 - smaller accent cloud */}
				<svg
					className="absolute top-[18%] left-[12%] w-36 h-18 opacity-40"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M50,60 Q35,45 28,52 T20,55 Q25,48 32,50 T48,53 Q58,40 68,44 T83,42 Q90,35 98,40 T113,38 Q120,31 130,36 T145,34 Q140,42 132,44 T118,46 Q110,50 100,48 T85,50 Q78,54 70,52 T55,54 Q52,60 50,60 Z"
						fill="rgba(255, 255, 255, 0.65)"
					/>
				</svg>
				{/* Cloud 7 */}
				<svg
					className="absolute top-[14%] left-[55%] w-48 h-24 opacity-50"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M54,57 Q34,37 24,47 T14,52 Q19,42 29,45 T49,49 Q59,32 74,37 T99,35 Q109,25 124,32 T149,30 Q159,20 174,27 T194,25 Q189,35 179,37 T159,39 Q149,47 134,45 T109,47 Q99,52 84,50 T59,52 Q54,59 54,57 Z"
						fill="rgba(255, 255, 255, 0.75)"
					/>
				</svg>
				{/* Cloud 8 */}
				<svg
					className="absolute top-[10%] left-[72%] w-44 h-22 opacity-45"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M56,55 Q36,35 26,45 T16,50 Q21,40 31,43 T51,47 Q61,30 76,35 T101,33 Q111,23 126,30 T151,28 Q161,18 176,25 T196,23 Q191,33 181,35 T161,37 Q151,45 136,43 T111,45 Q101,50 86,48 T61,50 Q56,57 56,55 Z"
						fill="rgba(255, 255, 255, 0.7)"
					/>
				</svg>
			</div>
			{/* Animated sheep characters - grouped by 2 and 3 */}
			{/* Group 1: 2 sheep - UP */}
			<div
				ref={sheep1Ref}
				className="absolute bottom-[30%] left-[8%] w-24 h-24 pointer-events-none opacity-40"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={96}
					height={96}
					className="w-full h-full object-contain"
				/>
			</div>
			<div
				ref={sheep2Ref}
				className="absolute bottom-[28%] left-[13%] w-[88px] h-[88px] pointer-events-none opacity-35"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={88}
					height={88}
					className="w-full h-full object-contain"
				/>
			</div>
			{/* Group 2: 3 sheep - DOWN */}
			<div
				ref={sheep3Ref}
				className="absolute bottom-[12%] left-[22%] w-20 h-20 pointer-events-none opacity-30"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={80}
					height={80}
					className="w-full h-full object-contain"
				/>
			</div>
			<div
				ref={sheep4Ref}
				className="absolute bottom-[10%] left-[28%] w-[80px] h-[80px] pointer-events-none opacity-38"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={80}
					height={80}
					className="w-full h-full object-contain"
				/>
			</div>
			<div
				ref={sheep5Ref}
				className="absolute bottom-[11%] left-[34%] w-[72px] h-[72px] pointer-events-none opacity-33"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={72}
					height={72}
					className="w-full h-full object-contain"
				/>
			</div>
			{/* Group 3: 2 sheep - UP */}
			<div
				ref={sheep6Ref}
				className="absolute bottom-[28%] left-[42%] w-[76px] h-[76px] pointer-events-none opacity-32"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={76}
					height={76}
					className="w-full h-full object-contain"
				/>
			</div>
			<div
				ref={sheep7Ref}
				className="absolute bottom-[27%] left-[48%] w-[74px] h-[74px] pointer-events-none opacity-36"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={74}
					height={74}
					className="w-full h-full object-contain"
				/>
			</div>
			{/* Group 4: 3 sheep - DOWN */}
			<div
				ref={sheep8Ref}
				className="absolute bottom-[14%] left-[56%] w-[70px] h-[70px] pointer-events-none opacity-34"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={70}
					height={70}
					className="w-full h-full object-contain"
				/>
			</div>
			<div
				ref={sheep9Ref}
				className="absolute bottom-[12%] left-[62%] w-[68px] h-[68px] pointer-events-none opacity-31"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={68}
					height={68}
					className="w-full h-full object-contain"
				/>
			</div>
			<div
				ref={sheep10Ref}
				className="absolute bottom-[13%] left-[68%] w-[82px] h-[82px] pointer-events-none opacity-37"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={82}
					height={82}
					className="w-full h-full object-contain"
				/>
			</div>
			{/* Group 5: 2 sheep - UP */}
			<div
				ref={sheep11Ref}
				className="absolute bottom-[26%] left-[76%] w-[65px] h-[65px] pointer-events-none opacity-29"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={65}
					height={65}
					className="w-full h-full object-contain"
				/>
			</div>
			<div
				ref={sheep12Ref}
				className="absolute bottom-[25%] left-[82%] w-[78px] h-[78px] pointer-events-none opacity-35"
				style={{ zIndex: 2 }}
			>
				<Image
					src="/sheep-2.png"
					alt="Sheep"
					width={78}
					height={78}
					className="w-full h-full object-contain"
				/>
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
						className="rounded-full px-5 py-2.5 text-sm border-2 hover:text-bold hover:bg-black hover:text-white"
						variant="outline"
					>
						<Link href="#">Give it a try ^^</Link>
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
							<Link href="#">Generate my plan</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							className="rounded-full px-5 py-3 text-sm"
						>
							<Link href="#">See how it works</Link>
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
									Create 'Smart' Shorts
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
