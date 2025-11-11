'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function AnimatedSheepBackground() {
	const pageRef = useRef<HTMLDivElement | null>(null);
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

	// GSAP animations for sheep
	useEffect(() => {
		if (typeof window === 'undefined') return;

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
	}, []);

	return (
		<>
			{/* Subtle animated background */}
			<div
				ref={backgroundRef}
				className="fixed inset-0 opacity-80 pointer-events-none"
				style={{
					background:
						'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.35) 0%, transparent 60%)',
					zIndex: 0,
				}}
			/>

			{/* Animated sheep characters - grouped by 2 and 3 */}
			{/* Group 1: 2 sheep - UP */}
			<div
				ref={sheep1Ref}
				className="fixed bottom-[30%] left-[8%] w-24 h-24 pointer-events-none opacity-40"
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
				className="fixed bottom-[28%] left-[13%] w-[88px] h-[88px] pointer-events-none opacity-35"
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
				className="fixed bottom-[12%] left-[22%] w-20 h-20 pointer-events-none opacity-30"
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
				className="fixed bottom-[10%] left-[28%] w-[80px] h-[80px] pointer-events-none opacity-38"
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
				className="fixed bottom-[11%] left-[34%] w-[72px] h-[72px] pointer-events-none opacity-33"
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
				className="fixed bottom-[28%] left-[42%] w-[76px] h-[76px] pointer-events-none opacity-32"
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
				className="fixed bottom-[27%] left-[48%] w-[74px] h-[74px] pointer-events-none opacity-36"
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
				className="fixed bottom-[14%] left-[56%] w-[70px] h-[70px] pointer-events-none opacity-34"
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
				className="fixed bottom-[12%] left-[62%] w-[68px] h-[68px] pointer-events-none opacity-31"
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
				className="fixed bottom-[13%] left-[68%] w-[82px] h-[82px] pointer-events-none opacity-37"
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
				className="fixed bottom-[26%] left-[76%] w-[65px] h-[65px] pointer-events-none opacity-29"
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
				className="fixed bottom-[25%] left-[82%] w-[78px] h-[78px] pointer-events-none opacity-35"
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

			{/* Hidden div to track mouse movement */}
			<div
				ref={pageRef}
				className="fixed inset-0 pointer-events-none"
				style={{ zIndex: 0 }}
			/>
		</>
	);
}
