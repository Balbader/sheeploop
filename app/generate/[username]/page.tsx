'use client';

import { GenerateMarketingStrategyForm } from '@/components/plan-generator/GenerateMarketingStrategyForm';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { UserModel } from '@/backend/models/users.model';
import React, { useEffect, useRef, useState } from 'react';

export default function Page({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const [username, setUsername] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);
	const pageRef = useRef<HTMLElement | null>(null);
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

	useEffect(() => {
		async function loadUser() {
			const resolvedParams = await params;
			const rawUsername = resolvedParams.username;
			const decodedUsername = decodeURIComponent(
				(rawUsername ?? '').trim(),
			);
			if (!decodedUsername) {
				redirect('/');
				return;
			}
			setUsername(decodedUsername);
			try {
				const user = await UserModel.findByUsername(decodedUsername);
				if (!user) {
					redirect('/');
					return;
				}
			} catch (error) {
				redirect('/');
				return;
			}
			setIsLoading(false);
		}
		loadUser();
	}, [params]);

	// GSAP animations for sheep
	useEffect(() => {
		if (typeof window === 'undefined' || isLoading) return;

		let cleanupMouseMove: (() => void) | null = null;

		(async () => {
			try {
				const { gsap } = await import('gsap');
				if (!pageRef.current || !backgroundRef.current) return;

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
					const speed = 15 + (index % 5) * 3;
					const duration = 20 + (index % 7) * 2;
					const amplitude = 60 + (index % 4) * 20;

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

					// Vertical bobbing animation
					gsap.to(sheep, {
						y: startY + 20,
						duration: duration * 0.8,
						ease: 'sine.inOut',
						repeat: -1,
						yoyo: true,
						delay: index * 0.2 + 0.5,
					});

					// Rotation animation
					gsap.to(sheep, {
						rotation: (index % 2 === 0 ? 1 : -1) * 15,
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

				// Animate background gradient with mouse movement
				const handleMouseMove = (e: MouseEvent) => {
					if (!pageRef.current || !backgroundRef.current) return;

					const rect = pageRef.current.getBoundingClientRect();
					const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
					const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

					// Animate background gradient
					gsap.to(backgroundRef.current, {
						x: x * 50,
						y: y * 50,
						duration: 1.2,
						ease: 'power2.out',
					});
				};

				pageRef.current.addEventListener('mousemove', handleMouseMove);

				cleanupMouseMove = () => {
					if (pageRef.current) {
						pageRef.current.removeEventListener(
							'mousemove',
							handleMouseMove,
						);
					}
				};
			} catch (error) {
				console.error('Failed to load GSAP:', error);
			}
		})();

		return () => {
			if (cleanupMouseMove) {
				cleanupMouseMove();
			}
		};
	}, [isLoading]);

	if (isLoading) {
		return (
			<main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden flex items-center justify-center">
				<div className="text-center">
					<div className="text-gray-600">Loading...</div>
				</div>
			</main>
		);
	}

	return (
		<main
			ref={pageRef}
			className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
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
				style={{ zIndex: 0 }}
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
			{/* Clouds in top section */}
			<div
				className="absolute top-0 left-0 w-full h-1/4 pointer-events-none overflow-hidden"
				style={{ zIndex: 0 }}
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

			<header className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between relative z-10">
				<Link href="/">
					<div className="flex items-center gap-2 sm:gap-3">
						<Image
							src="/sheep.png"
							alt="SheepLoop logo"
							width={32}
							height={32}
							className="rounded flex-shrink-0"
						/>
						<span className="text-sm sm:text-base font-semibold">
							SheepLoop
						</span>
					</div>
				</Link>
				<div>
					<Button
						asChild
						variant="outline"
						className="rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm min-h-[44px]"
					>
						<Link href="/">Logout</Link>
					</Button>
				</div>
			</header>

			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12 sm:pb-16 md:pb-24 relative z-10">
				<div className="mx-auto max-w-3xl text-center mb-6 sm:mb-8 md:mb-12">
					<h1 className="mt-3 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight px-2">
						Shorts Content Strategy
						<br />
						Plan Generator
					</h1>
					<p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2">
						Fill in the details about your idea/goals/constraints
						and get a tailored content strategy designed to help you
						find and grow your community.
					</p>
				</div>
				<GenerateMarketingStrategyForm />
			</div>
		</main>
	);
}
