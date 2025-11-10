'use client';

import { useEffect, useRef } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '../ui/card';
import { Wrench, Clock, Sparkles } from 'lucide-react';

export default function MaintenanceOngoing() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const iconRef = useRef<HTMLDivElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const descriptionRef = useRef<HTMLParagraphElement | null>(null);
	const cardRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		(async () => {
			try {
				const { gsap } = await import('gsap');
				const elements = [
					iconRef.current,
					titleRef.current,
					descriptionRef.current,
					cardRef.current,
				].filter(Boolean);

				if (elements.length > 0 && containerRef.current) {
					// Initial state - hidden and positioned
					gsap.set(elements, {
						opacity: 0,
						y: 20,
					});

					gsap.set(iconRef.current, {
						scale: 0.8,
						rotation: -10,
					});

					// Entrance animation with stagger
					gsap.to(elements, {
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: 'power3.out',
						stagger: 0.15,
						delay: 0.2,
					});

					// Icon entrance animation with bounce
					if (iconRef.current) {
						gsap.to(iconRef.current, {
							scale: 1,
							rotation: 0,
							duration: 0.8,
							ease: 'back.out(1.7)',
							delay: 0.2,
						});

						// Continuous subtle pulse animation
						gsap.to(iconRef.current, {
							scale: 1.1,
							duration: 2,
							ease: 'sine.inOut',
							repeat: -1,
							yoyo: true,
							delay: 1.2,
						});

						// Continuous gentle rotation
						gsap.to(iconRef.current, {
							rotation: 5,
							duration: 3,
							ease: 'sine.inOut',
							repeat: -1,
							yoyo: true,
							delay: 1.5,
						});
					}

					// Sparkle icons animation
					const sparkles =
						containerRef.current.querySelectorAll('[data-sparkle]');
					if (sparkles.length > 0) {
						gsap.set(sparkles, {
							opacity: 0,
							scale: 0,
						});

						sparkles.forEach((sparkle, index) => {
							gsap.to(sparkle, {
								opacity: 1,
								scale: 1,
								duration: 0.4,
								ease: 'back.out(1.7)',
								delay: 0.8 + index * 0.1,
							});

							gsap.to(sparkle, {
								opacity: 0.6,
								scale: 0.8,
								duration: 1.5,
								ease: 'sine.inOut',
								repeat: -1,
								yoyo: true,
								delay: 1.5 + index * 0.2,
							});
						});
					}
				}
			} catch (_) {
				// no-op if gsap not available
			}
		})();
	}, []);

	return (
		<div
			ref={containerRef}
			className="min-h-[400px] flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 p-4 sm:p-6 lg:p-8"
		>
			<div className="max-w-2xl w-full">
				<Card
					ref={cardRef}
					className="relative overflow-hidden border-2 border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-xl"
				>
					{/* Decorative gradient overlay matching site DNA */}
					<div className="absolute inset-0 bg-gradient-to-b from-sky-200/30 via-blue-100/20 to-green-100/30 pointer-events-none" />

					{/* Sparkle decorations with green theme */}
					<Sparkles
						data-sparkle
						className="absolute top-6 right-8 w-5 h-5 text-green-400/60"
					/>
					<Sparkles
						data-sparkle
						className="absolute bottom-8 left-6 w-4 h-4 text-green-500/60"
					/>
					<Sparkles
						data-sparkle
						className="absolute top-1/2 right-12 w-3 h-3 text-green-400/50"
					/>

					<CardHeader className="text-center pb-4 relative z-10">
						<div
							ref={iconRef}
							className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50"
						>
							<Wrench className="w-8 h-8 text-white" />
						</div>
						<CardTitle
							ref={titleRef}
							className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
						>
							Maintenance in{' '}
							<span className="text-green-600">Progress</span>
						</CardTitle>
						<CardDescription
							ref={descriptionRef}
							className="mt-3 text-base md:text-lg text-slate-600 max-w-md mx-auto"
						>
							We're currently performing scheduled maintenance to
							improve your experience.
						</CardDescription>
					</CardHeader>

					<CardContent className="pt-0 pb-8 relative z-10">
						<div className="flex flex-col items-center gap-6">
							<div className="flex items-center gap-2 text-slate-500">
								<Clock className="w-5 h-5" />
								<span className="text-sm font-medium">
									We'll be back shortly
								</span>
							</div>

							<div className="w-full max-w-xs h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
								<div className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full w-3/5 animate-pulse" />
							</div>

							<p className="text-sm text-slate-500 text-center max-w-md">
								Thank you for your patience. We're working hard
								to bring you an even better experience.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
