'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import Link from 'next/link';

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
	const instaLogoRef = useRef<HTMLSpanElement | null>(null);
	const tiktokLogoRef = useRef<HTMLSpanElement | null>(null);
	const youtubeLogoRef = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		let cleanupMouseMove: (() => void) | null = null;
		const logoCleanups: Array<() => void> = [];
		const sheepAnimations: any[] = [];

		(async () => {
			try {
				const { gsap } = await import('gsap');

				// Animate headline and CTA if available
				if (headlineRef.current && ctaRef.current) {
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
				}

				// Animate platform logos
				const platformLogos = [
					instaLogoRef.current,
					tiktokLogoRef.current,
					youtubeLogoRef.current,
				].filter(Boolean);
				if (platformLogos.length > 0) {
					gsap.set(platformLogos, {
						opacity: 0,
						scale: 0.85,
						y: 8,
					});
					gsap.to(platformLogos, {
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 0.5,
						ease: 'power2.out',
						delay: 0.3,
						stagger: 0.08,
					});

					// Bouncing ball animation
					platformLogos.forEach((logo, index) => {
						if (logo) {
							// Create a bouncing ball timeline
							const bounceTimeline = gsap.timeline({
								repeat: -1,
								delay: 0.8 + index * 0.2,
							});

							// Initial drop - fall down with gravity
							bounceTimeline.to(logo, {
								y: 6,
								scaleY: 1.1,
								scaleX: 0.9,
								duration: 0.3,
								ease: 'power2.in',
							});

							// Bounce back up - first big bounce
							bounceTimeline.to(
								logo,
								{
									y: -8,
									scaleY: 1,
									scaleX: 1,
									duration: 0.4,
									ease: 'power2.out',
								},
								'<0.1',
							);

							// Second bounce - smaller
							bounceTimeline.to(logo, {
								y: 4,
								scaleY: 1.08,
								scaleX: 0.92,
								duration: 0.25,
								ease: 'power2.in',
							});
							bounceTimeline.to(logo, {
								y: -4,
								scaleY: 1,
								scaleX: 1,
								duration: 0.3,
								ease: 'power2.out',
							});

							// Third bounce - even smaller
							bounceTimeline.to(logo, {
								y: 2,
								scaleY: 1.05,
								scaleX: 0.95,
								duration: 0.2,
								ease: 'power2.in',
							});
							bounceTimeline.to(logo, {
								y: -2,
								scaleY: 1,
								scaleX: 1,
								duration: 0.25,
								ease: 'power2.out',
							});

							// Final settle - return to rest position
							bounceTimeline.to(logo, {
								y: 0,
								scaleY: 1,
								scaleX: 1,
								duration: 0.15,
								ease: 'power2.out',
							});

							// Hover animations with smoother transitions
							const handleMouseEnter = () => {
								gsap.to(logo, {
									scale: 1.12,
									rotation: 3,
									duration: 0.25,
									ease: 'power1.out',
								});
								bounceTimeline.pause();
							};

							const handleMouseLeave = () => {
								gsap.to(logo, {
									scale: 1,
									rotation: 0,
									duration: 0.3,
									ease: 'power1.out',
								});
								bounceTimeline.resume();
							};

							logo.addEventListener(
								'mouseenter',
								handleMouseEnter,
							);
							logo.addEventListener(
								'mouseleave',
								handleMouseLeave,
							);

							// Store cleanup function
							logoCleanups.push(() => {
								logo.removeEventListener(
									'mouseenter',
									handleMouseEnter,
								);
								logo.removeEventListener(
									'mouseleave',
									handleMouseLeave,
								);
								bounceTimeline.kill();
							});
						}
					});
				}

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

				// Animate sheep - ensure they animate regardless of other conditions
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
					const horizontalAnim = gsap.to(sheep, {
						x: startX + amplitude * (index % 2 === 0 ? 1 : -1),
						duration: duration,
						ease: 'sine.inOut',
						repeat: -1,
						yoyo: true,
						delay: index * 0.3,
					});

					// Vertical bobbing animation (increased movement)
					const verticalAnim = gsap.to(sheep, {
						y: startY + 20, // Increased from 10 to 20
						duration: duration * 0.8,
						ease: 'sine.inOut',
						repeat: -1,
						yoyo: true,
						delay: index * 0.2 + 0.5,
					});

					// Increased rotation animation
					const rotationAnim = gsap.to(sheep, {
						rotation: (index % 2 === 0 ? 1 : -1) * 15, // Increased from 8 to 15
						duration: duration * 1.2,
						ease: 'sine.inOut',
						repeat: -1,
						yoyo: true,
						delay: index * 0.4,
					});

					// Occasional scale bob (like breathing/grazing)
					const scaleAnim = gsap.to(sheep, {
						scale: 1 + (index % 3) * 0.03,
						duration: 4 + (index % 4),
						ease: 'sine.inOut',
						repeat: -1,
						yoyo: true,
						delay: index * 0.6,
					});

					// Store animations for cleanup
					sheepAnimations.push(
						horizontalAnim,
						verticalAnim,
						rotationAnim,
						scaleAnim,
					);
				});

				// Mouse interaction for background
				if (backgroundRef.current && heroRef.current) {
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
			logoCleanups.forEach((cleanup) => cleanup());
			sheepAnimations.forEach((anim) => {
				if (anim && typeof anim.kill === 'function') {
					anim.kill();
				}
			});
		};
	}, []);

	return (
		<section ref={heroRef} className="relative overflow-hidden ">
			<header className="max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
				<Link href="/">
					<div className="flex items-center gap-3">
						<Image
							src="/sheep.png"
							alt="SheepLoop logo"
							width={32}
							height={32}
							className="rounded"
						/>
						<span className="text-base font-semibold">
							SheepLoop
						</span>
					</div>
				</Link>
				<div>
					<Button
						asChild
						className="rounded-full px-5 py-2.5 text-sm"
					>
						<Link href="/generate">Give it a try ^^</Link>
					</Button>
				</div>
			</header>
		</section>
	);
}
