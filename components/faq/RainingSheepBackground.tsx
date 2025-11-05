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

				const FAQ_MESSAGES = [
					"Got questions? I've got baaa-answers!",
					'Pricing? Wool explain: start free, upgrade later.',
					'Cancel anytime. No hard feelings, just soft wool.',
					"Your data? We don't sell your wool.",
					'Team features? Share prompts like a flock.',
					'Scheduler integrations are on the baa-cklog.',
					'Yes, you can customize tone & voice.',
					'Outputs are yours to edit & publish.',
					'Accessibility? We follow good patterns.',
					'Unique outputs based on your inputs.',
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
						'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg border border-gray-200 whitespace-nowrap max-w-[160px]';
					bubble.style.minWidth = '110px';
					bubble.style.opacity = '0';
					bubble.style.transform = 'scale(0.85)';
					bubble.style.pointerEvents = 'none';

					const messageDiv = document.createElement('div');
					messageDiv.className =
						'text-[10px] sm:text-xs font-medium text-gray-800 text-center';
					messageDiv.textContent =
						FAQ_MESSAGES[
							Math.floor(Math.random() * FAQ_MESSAGES.length)
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

				// Animate each sheep falling (no mouse or click/hover interactions)
				sheepArray.forEach((sheep, index) => {
					const startDelay = index * 0.45;
					const fallDuration = 8 + Math.random() * 5;
					const startXPercent = Math.random() * 100;
					const horizontalDrift = (Math.random() - 0.5) * 60;

					gsap.set(sheep, {
						x: `${startXPercent}%`,
						y: -120,
						rotation: 0,
					});

					const fallAnim = gsap.to(sheep, {
						y: window.innerHeight + 220,
						x: `${
							startXPercent +
							(horizontalDrift / window.innerWidth) * 100
						}%`,
						rotation: (Math.random() - 0.5) * 40,
						duration: fallDuration,
						ease: 'none',
						delay: startDelay,
						repeat: -1,
						onRepeat: () => {
							const newX = Math.random() * 100;
							gsap.set(sheep, {
								x: `${newX}%`,
								y: -120,
								rotation: 0,
							});
							fallAnim.vars.x = `${
								newX +
								(horizontalDrift / window.innerWidth) * 100
							}%`;
						},
					});

					const rotateAnim = gsap.to(sheep, {
						rotation: `+=${(Math.random() - 0.5) * 30}`,
						duration: 2 + Math.random() * 2,
						repeat: -1,
						yoyo: true,
						ease: 'sine.inOut',
						delay: startDelay,
					});

					// Speech bubble show/hide loop
					const { bubble, messageDiv } = bubbleArray[index];
					let messageIndex = Math.floor(
						Math.random() * FAQ_MESSAGES.length,
					);
					let isBubbleVisible = false;

					const showBubble = () => {
						if (isBubbleVisible) return;
						isBubbleVisible = true;
						messageIndex = (messageIndex + 1) % FAQ_MESSAGES.length;
						messageDiv.textContent = FAQ_MESSAGES[messageIndex];

						gsap.to(bubble, {
							opacity: 1,
							scale: 1,
							duration: 0.35,
							ease: 'back.out(1.7)',
						});

						const hideTimer = setTimeout(() => {
							gsap.to(bubble, {
								opacity: 0,
								scale: 0.85,
								duration: 0.28,
								onComplete: () => {
									isBubbleVisible = false;
								},
							});
						}, 2400 + Math.random() * 1500);

						allTimers.push(hideTimer);
					};

					const startTimer = setTimeout(
						() => showBubble(),
						startDelay * 1000 + 900,
					);
					const bubbleInterval = setInterval(
						() => showBubble(),
						3400 + Math.random() * 2000,
					);

					allAnims.push(fallAnim, rotateAnim);
					allTimers.push(startTimer, bubbleInterval);
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
