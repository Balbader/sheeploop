'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Link from 'next/link';
import {
	DialogContent,
	Dialog,
	DialogTrigger,
	DialogTitle,
} from '../ui/dialog';
import FormSelectionTabs from '../user-validation-form/FormSelectionTabs';

const FUNNY_MESSAGES = [
	'BAAAAAA! 🐑',
	'SheepLoop rocks! 🎉',
	'Join the flock! 🐏',
	'MEEEEEEH! 🐑',
	'So fluffy! ✨',
	"Let's go! 🚀",
	'Wool-esome! 🧶',
	'Baa-rilliant! 💫',
	'Flock yeah! 🎊',
	'Sheep-tastic! 🌟',
];

interface Sheep {
	id: number;
	element: HTMLDivElement;
	timeline: any;
}

export default function FinalCTA() {
	const ctaRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const textRef = useRef<HTMLSpanElement | null>(null);
	const sheepContainerRef = useRef<HTMLDivElement | null>(null);
	const sheepIdCounterRef = useRef(0);
	const activeSheepRef = useRef<Sheep[]>([]);
	const isHoveringRef = useRef(false);
	const sheepSpawnTimerRef = useRef<number | null>(null);

	const createFlyingSheep = async () => {
		if (
			typeof window === 'undefined' ||
			!sheepContainerRef.current ||
			!buttonRef.current
		)
			return;

		try {
			const { gsap } = await import('gsap');
			const container = sheepContainerRef.current;
			const button = buttonRef.current;
			const buttonRect = button.getBoundingClientRect();
			const buttonCenterX = buttonRect.left + buttonRect.width / 2;
			const buttonCenterY = buttonRect.top + buttonRect.height / 2;

			// Create sheep element
			const sheep = document.createElement('div');
			const sheepId = sheepIdCounterRef.current;
			sheepIdCounterRef.current += 1;

			const message =
				FUNNY_MESSAGES[
					Math.floor(Math.random() * FUNNY_MESSAGES.length)
				];

			sheep.className = 'fixed pointer-events-none z-50';
			sheep.innerHTML = `
				<div class="flex flex-col items-center gap-1">
					<div class="text-4xl animate-bounce">🐑</div>
					<div class="bg-white border-2 border-gray-300 rounded-lg px-3 py-1 shadow-lg text-xs font-bold text-gray-800 whitespace-nowrap">
						${message}
					</div>
				</div>
			`;

			container.appendChild(sheep);

			// Random direction (angle in degrees)
			const angle = Math.random() * 360;
			const distance = 400 + Math.random() * 300; // 400-700px
			const radians = (angle * Math.PI) / 180;
			const endX = buttonCenterX + Math.cos(radians) * distance;
			const endY = buttonCenterY + Math.sin(radians) * distance;

			// Random rotation and scale
			const rotation = angle + (Math.random() > 0.5 ? 180 : 0);
			const scale = 0.5 + Math.random() * 0.5; // 0.5-1.0

			// Set initial position (button center)
			gsap.set(sheep, {
				x: buttonCenterX,
				y: buttonCenterY,
				xPercent: -50,
				yPercent: -50,
				opacity: 0,
				scale: 0,
				rotation: 0,
			});

			// Fade in
			await gsap.to(sheep, {
				opacity: 1,
				scale: scale,
				duration: 0.25,
				ease: 'power2.out',
			});

			// Wander loop across the screen until hover ends
			const moveNext = () => {
				if (!isHoveringRef.current) {
					gsap.to(sheep, {
						opacity: 0,
						scale: scale * 0.5,
						duration: 0.35,
						ease: 'power2.in',
						onComplete: () => {
							sheep.remove();
							activeSheepRef.current =
								activeSheepRef.current.filter(
									(s) => s.id !== sheepId,
								);
						},
					});
					return;
				}

				const vw = window.innerWidth;
				const vh = window.innerHeight;
				const padding = 40;
				const targetX = padding + Math.random() * (vw - padding * 2);
				const targetY = padding + Math.random() * (vh - padding * 2);
				const dur = 1.6 + Math.random() * 1.6; // 1.6 - 3.2s
				const rot = Math.random() * 360;

				const tween = gsap.to(sheep, {
					x: targetX,
					y: targetY,
					rotation: rot,
					ease: 'power1.inOut',
					duration: dur,
					onComplete: moveNext,
				});

				const existing = activeSheepRef.current.find(
					(s) => s.id === sheepId,
				);
				if (existing) {
					existing.timeline = tween;
				} else {
					activeSheepRef.current.push({
						id: sheepId,
						element: sheep,
						timeline: tween,
					});
				}
			};

			// First hop away from the button, then wander
			await gsap.to(sheep, {
				x: endX,
				y: endY,
				rotation: rotation,
				duration: 1.2 + Math.random() * 0.8,
				ease: 'power1.inOut',
				onComplete: moveNext,
			});
		} catch (_) {
			// no-op if gsap not available
		}
	};

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

			if (!isHoveringRef.current) {
				isHoveringRef.current = true;
				// Start continuous sheep spawns while hovering
				if (sheepSpawnTimerRef.current == null) {
					sheepSpawnTimerRef.current = window.setInterval(() => {
						createFlyingSheep();
					}, 350);
				}

				// Initial burst
				for (let i = 0; i < 6; i++) {
					setTimeout(() => createFlyingSheep(), i * 90);
				}
			}

			// Animate button scale and position
			gsap.to(buttonRef.current, {
				scale: 1.15,
				y: -2,
				duration: 0.3,
				ease: 'power2.out',
			});

			// Start continuous conic-gradient rotation via CSS variable
			gsap.to(buttonRef.current, {
				'--angle': '+=360deg',
				duration: 4,
				ease: 'none',
				repeat: -1,
			} as any);

			// Rainbow effects continue below

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

			// Stop spawning and mark hover off
			isHoveringRef.current = false;
			if (sheepSpawnTimerRef.current != null) {
				clearInterval(sheepSpawnTimerRef.current);
				sheepSpawnTimerRef.current = null;
			}

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

			// Stop conic-gradient rotation and normalize angle
			gsap.killTweensOf(buttonRef.current, ['--angle'] as any);
			gsap.set(buttonRef.current, { '--angle': '0deg' } as any);

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

			// Gracefully fade out all active sheep
			activeSheepRef.current.forEach((sheep) => {
				if (sheep.timeline) sheep.timeline.kill();
				gsap.to(sheep.element, {
					opacity: 0,
					scale: 0.5,
					duration: 0.3,
					ease: 'power2.in',
					onComplete: () => sheep.element.remove(),
				});
			});
			activeSheepRef.current = [];
		} catch (_) {
			// no-op if gsap not available
		}
	};

	return (
		<>
			{/* Container for flying sheep */}
			<div
				ref={sheepContainerRef}
				className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
				aria-hidden="true"
			/>
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
							Turn your idea into a community in{' '}
							<span className="text-green-600 font-bold">
								weeks
							</span>
							, not{' '}
							<span className="text-red-600 font-bold">
								months
							</span>
							.
						</h2>
						<p className="mt-4 text-gray-600 leading-relaxed md:text-lg">
							Choose your platform and answer a few questions and
							get your full shorts campaign and scripts
							<br /> to start posting today 🚀
						</p>
						<div className="mt-8 flex flex-col items-center justify-center gap-3">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										ref={buttonRef}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
										style={{ ['--angle' as any]: '0deg' }}
										className="relative overflow-hidden rounded-full px-5 py-3 text-sm font-medium text-white transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-400 border-2 border-transparent bg-slate-900 hover:font-bold hover:text-white before:content-[''] before:absolute before:inset-0 before:rounded-full before:p-[2px] before:opacity-0 before:transition-opacity before:duration-300 before:[mask:linear-gradient(#000_0_0)_content-box,_linear-gradient(#000_0_0)] before:[-webkit-mask:linear-gradient(#000_0_0)_content-box,_linear-gradient(#000_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:bg-[conic-gradient(from_var(--angle),_#ff004c,_#ff7a00,_#fffb00,_#00ff85,_#00c3ff,_#7a00ff,_#ff00c8,_#ff004c)] hover:before:opacity-100 hover:shadow-[0_0_30px_6px_rgba(255,0,128,0.35)]"
									>
										<span
											ref={textRef}
											className="relative z-[1]"
										>
											I really want to try it ^^
										</span>
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle className="sr-only">
										Sign up or log in to SheepLoop
									</DialogTitle>
									<FormSelectionTabs />
								</DialogContent>
							</Dialog>
							<span className="text-xs text-gray-500 italic">
								No credit card required
							</span>
						</div>
					</Card>
				</div>
			</section>
		</>
	);
}
