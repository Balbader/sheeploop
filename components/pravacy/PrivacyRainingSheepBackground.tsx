'use client';

import { useEffect, useRef } from 'react';

export default function RainingSheepBackground() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		let cleanupFn: (() => void) | null = null;

		(async () => {
			try {
				const { gsap } = await import('gsap');
				if (!containerRef.current) return;

				const container = containerRef.current;
				const numSheep = 12;
				const sheepArray: HTMLDivElement[] = [];
				const bubbleArray: Array<{
					bubble: HTMLDivElement;
					messageDiv: HTMLDivElement;
				}> = [];
				const allAnims: any[] = [];
				const allTimers: NodeJS.Timeout[] = [];

				const PRIVACY_MESSAGES = [
					"Your privacy? We've got it locked up!",
					"We don't sell your data. Ever. Baa-promise!",
					'Your content stays yours. We just help create it.',
					'Secure storage? We use the best encryption wool!',
					'You control your data. Access, delete, export anytime.',
					'AI privacy? Your prompts are safe with us.',
					'No sneaky tracking. We keep it transparent.',
					'Cookies? Only the helpful kind, not the creepy ones.',
					'Your rights matter. We respect them completely.',
					'Privacy updates? We notify you, not hide them.',
					'Children under 13? We protect them too.',
					'International transfers? Secure and compliant.',
					'Third parties? Only trusted partners.',
					'Data retention? Only as long as needed.',
				];

				// Create sheep elements
				for (let i = 0; i < numSheep; i++) {
					const sheepWrapper = document.createElement('div');
					sheepWrapper.className = 'absolute';
					sheepWrapper.style.left = `${Math.random() * 100}%`;
					sheepWrapper.style.top = '-120px';
					sheepWrapper.style.zIndex = '5';
					sheepWrapper.style.pointerEvents = 'none';

					const bubble = document.createElement('div');
					bubble.className =
						'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg border border-gray-200 whitespace-normal break-words';
					bubble.style.minWidth = '110px';
					bubble.style.maxWidth = '220px';
					bubble.style.opacity = '0';
					bubble.style.transform = 'scale(0.85)';
					bubble.style.pointerEvents = 'none';

					const messageDiv = document.createElement('div');
					messageDiv.className =
						'text-[10px] sm:text-xs font-medium text-gray-800 text-center';
					messageDiv.textContent =
						PRIVACY_MESSAGES[
							Math.floor(Math.random() * PRIVACY_MESSAGES.length)
						];

					const triangle = document.createElement('div');
					triangle.className =
						'absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white';

					bubble.appendChild(messageDiv);
					bubble.appendChild(triangle);

					const sheepImg = document.createElement('img');
					sheepImg.src = '/sheep-2.png';
					sheepImg.alt = 'Sheep';
					sheepImg.className =
						'w-12 h-12 sm:w-16 sm:h-16 object-contain';
					sheepImg.style.opacity = '0.75';
					sheepImg.style.pointerEvents = 'none';

					sheepWrapper.appendChild(bubble);
					sheepWrapper.appendChild(sheepImg);
					container.appendChild(sheepWrapper);

					sheepArray.push(sheepWrapper);
					bubbleArray.push({ bubble, messageDiv });
				}

				// Animate each sheep playing hide and seek
				sheepArray.forEach((sheep, index) => {
					// Start all sheep hidden
					gsap.set(sheep, {
						opacity: 0,
						scale: 0.8,
					});

					// Speech bubble setup
					const { bubble, messageDiv } = bubbleArray[index];
					let messageIndex = Math.floor(
						Math.random() * PRIVACY_MESSAGES.length,
					);

					const showBubbleWhenVisible = () => {
						// Update message
						messageIndex =
							(messageIndex + 1) % PRIVACY_MESSAGES.length;
						messageDiv.textContent = PRIVACY_MESSAGES[messageIndex];

						// Dynamically size bubble based on message length
						const len = messageDiv.textContent?.length ?? 0;
						const maxPx = len < 40 ? 180 : len < 80 ? 220 : 280;
						bubble.style.maxWidth = `${maxPx}px`;
						bubble.style.width = 'auto';

						// Show bubble with sheep
						gsap.to(bubble, {
							opacity: 1,
							scale: 1,
							duration: 0.4,
							ease: 'back.out(1.7)',
							delay: 0.3, // Slightly after sheep appears
						});
					};

					const hideBubbleWhenHidden = () => {
						// Hide bubble with sheep
						gsap.to(bubble, {
							opacity: 0,
							scale: 0.85,
							duration: 0.3,
							ease: 'power2.in',
						});
					};

					const createHideAndSeekCycle = () => {
						// Random position on screen
						const randomX = Math.random() * 100;
						const randomY =
							Math.random() * (window.innerHeight * 0.8) +
							window.innerHeight * 0.1;

						// Set initial hidden position
						gsap.set(sheep, {
							x: `${randomX}%`,
							y: randomY,
							rotation: (Math.random() - 0.5) * 20,
							opacity: 0,
							scale: 0.8,
						});

						// Timeline for hide and seek cycle
						const timeline = gsap.timeline({
							onComplete: () => {
								// After hiding, wait then reappear at new location
								const hideDuration = 3 + Math.random() * 4;
								setTimeout(() => {
									createHideAndSeekCycle();
								}, hideDuration * 1000);
							},
						});

						// Phase 1: Appear (fade in and scale up)
						timeline.to(sheep, {
							opacity: 0.75,
							scale: 1,
							duration: 0.6,
							ease: 'back.out(1.4)',
							onStart: () => {
								// Show bubble when sheep appears
								setTimeout(() => showBubbleWhenVisible(), 300);
							},
						});

						// Phase 2: Move around while visible (peek around)
						const visibleDuration = 4 + Math.random() * 3;
						const moveDistance = 30 + Math.random() * 40;

						timeline.to(
							sheep,
							{
								x: `+=${
									(Math.random() - 0.5) * moveDistance
								}px`,
								y: `+=${
									(Math.random() - 0.5) * moveDistance * 0.6
								}px`,
								rotation: `+=${(Math.random() - 0.5) * 25}`,
								duration: visibleDuration * 0.4,
								ease: 'sine.inOut',
							},
							'<0.2',
						);

						// Continue moving around
						timeline.to(
							sheep,
							{
								x: `+=${
									(Math.random() - 0.5) * moveDistance
								}px`,
								y: `+=${
									(Math.random() - 0.5) * moveDistance * 0.6
								}px`,
								rotation: `+=${(Math.random() - 0.5) * 25}`,
								duration: visibleDuration * 0.3,
								ease: 'sine.inOut',
							},
							'<0.3',
						);

						timeline.to(
							sheep,
							{
								x: `+=${
									(Math.random() - 0.5) * moveDistance
								}px`,
								y: `+=${
									(Math.random() - 0.5) * moveDistance * 0.6
								}px`,
								rotation: `+=${(Math.random() - 0.5) * 25}`,
								duration: visibleDuration * 0.3,
								ease: 'sine.inOut',
							},
							'<0.3',
						);

						// Phase 3: Hide (fade out and scale down)
						timeline.to(
							sheep,
							{
								opacity: 0,
								scale: 0.7,
								duration: 0.5,
								ease: 'power2.in',
								onStart: () => {
									// Hide bubble when sheep hides
									hideBubbleWhenHidden();
								},
							},
							'<0.5',
						);

						// Continuous subtle rotation while visible
						const rotateAnim = gsap.to(sheep, {
							rotation: `+=${(Math.random() - 0.5) * 15}`,
							duration: 2 + Math.random() * 1.5,
							repeat: Math.floor(visibleDuration / 2),
							yoyo: true,
							ease: 'sine.inOut',
						});

						allAnims.push(timeline, rotateAnim);
					};

					// Start the hide and seek cycle with staggered delays
					const initialDelay = index * 0.8 + Math.random() * 1.5;
					setTimeout(() => {
						createHideAndSeekCycle();
					}, initialDelay * 1000);
				});

				cleanupFn = () => {
					allAnims.forEach((a) => a?.kill?.());
					allTimers.forEach((t) => {
						clearTimeout(t);
						clearInterval(t as unknown as number);
					});
					sheepArray.forEach((el) => el.remove());
				};
			} catch (_) {
				// silent fail if gsap missing
			}
		})();

		return () => {
			if (cleanupFn) cleanupFn();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 overflow-hidden pointer-events-none"
			style={{ zIndex: 1 }}
		/>
	);
}
