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
				const allAnims: any[] = [];
				const allTimers: NodeJS.Timeout[] = [];
				const allGroups: Array<{
					sheep: HTMLDivElement[];
					bubbles: Array<{
						bubble: HTMLDivElement;
						messageDiv: HTMLDivElement;
					}>;
				}> = [];

				const TERMS_MESSAGES = [
					'You own your content! We just help create it.',
					"Fair pricing? We're transparent about everything!",
					'Cancel anytime. No strings attached, baa-promise!',
					"Your data stays yours. We don't sell it.",
					'Terms are clear and fair. No hidden catches!',
					'We respect your rights. Always have, always will!',
					'AI-generated content? You review it first.',
					'Subscription fees? Fair and upfront.',
					'You can export your data anytime you want.',
					"We're transparent about what we can and can't do.",
					'Privacy protected. Terms respected. Always fair.',
					"Your content, your control. That's the deal!",
					'Fair use policy? We believe in fair play!',
					'Changes to terms? We notify you first.',
					'SheepLoop is built on fairness and transparency.',
					'No tricks, no traps. Just honest terms.',
					'You keep what you create. Simple as that!',
					'Fair terms mean fair treatment for everyone.',
				];

				// Add perspective to container for 3D depth
				container.style.perspective = '1000px';
				container.style.perspectiveOrigin = '50% 50%';

				// Create groups of sheep
				const numGroups = 6;
				const sheepPerGroup = 4;

				for (let groupIdx = 0; groupIdx < numGroups; groupIdx++) {
					// Depth factor: 0 = front, 1 = back
					// First group is closer, last group is further
					const depthFactor = groupIdx / (numGroups - 1);
					const depthScale = 0.7 + (1 - depthFactor) * 0.3; // 0.7 to 1.0
					const depthOpacity = 0.6 + (1 - depthFactor) * 0.4; // 0.6 to 1.0
					const depthZ = depthFactor * -100; // Move back groups further in Z
					const depthBlur = depthFactor * 2; // Blur for depth of field effect

					// Position group center - distribute groups across screen in a grid-like pattern
					const cols = 3; // Number of columns
					const col = groupIdx % cols;
					const row = Math.floor(groupIdx / cols);
					const totalRows = Math.ceil(numGroups / cols);

					// X position: distribute across width with some margin
					const xSpacing = cols > 1 ? 80 / (cols - 1) : 0; // Spread across 80% of width
					const groupCenterXPercent =
						10 +
						(cols > 1 ? col * xSpacing : 50) +
						Math.random() * 8 -
						4;

					// Y position: distribute across height with some margin
					const ySpacing = totalRows > 1 ? 60 / (totalRows - 1) : 0; // Spread across 60% of height
					const groupCenterYPercent =
						15 +
						(totalRows > 1 ? row * ySpacing : 40) +
						Math.random() * 8 -
						4;

					// Convert group center position to pixels for accurate sheep positioning
					const groupCenterXPixels =
						(groupCenterXPercent / 100) * window.innerWidth;
					const groupCenterYPixels =
						(groupCenterYPercent / 100) * window.innerHeight;

					const groupSheep: HTMLDivElement[] = [];
					const groupBubbles: Array<{
						bubble: HTMLDivElement;
						messageDiv: HTMLDivElement;
					}> = [];

					// Create sheep in a circle around group center
					for (
						let sheepIdx = 0;
						sheepIdx < sheepPerGroup;
						sheepIdx++
					) {
						// Individual sheep depth variation within group
						const sheepDepthVariation =
							(sheepIdx / sheepPerGroup) * 0.3;
						const sheepDepthScale =
							depthScale * (1 - sheepDepthVariation * 0.2);
						const sheepDepthOpacity =
							depthOpacity * (1 - sheepDepthVariation * 0.15);
						const sheepZOffset = depthZ - sheepDepthVariation * 20;

						const sheepWrapper = document.createElement('div');
						sheepWrapper.className = 'absolute';
						sheepWrapper.style.zIndex = String(
							5 + groupIdx * 10 + sheepIdx,
						);
						sheepWrapper.style.pointerEvents = 'none';
						sheepWrapper.style.transformStyle = 'preserve-3d';
						sheepWrapper.style.transform = `translateZ(${sheepZOffset}px)`;

						// Position sheep in a circle around group center (in pixels, then convert to %)
						const angle = (sheepIdx / sheepPerGroup) * Math.PI * 2;
						const radius = (80 + Math.random() * 20) * depthScale;
						const sheepXPixels =
							groupCenterXPixels + Math.cos(angle) * radius;
						const sheepYPixels =
							groupCenterYPixels + Math.sin(angle) * radius;

						const sheepXPercent =
							(sheepXPixels / window.innerWidth) * 100;
						const sheepYPercent =
							(sheepYPixels / window.innerHeight) * 100;

						sheepWrapper.style.left = `${sheepXPercent}%`;
						sheepWrapper.style.top = `${sheepYPercent}%`;

						// Add subtle 3D rotation for depth
						const rotateX = (Math.random() - 0.5) * 5;
						const rotateY = (Math.random() - 0.5) * 5;
						sheepWrapper.style.transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

						// Create speech bubble with depth-aware styling
						const bubble = document.createElement('div');
						bubble.className =
							'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg border border-gray-200 whitespace-normal break-words';
						bubble.style.minWidth = `${110 * sheepDepthScale}px`;
						bubble.style.maxWidth = `${220 * sheepDepthScale}px`;
						bubble.style.opacity = '0';
						bubble.style.transform = 'scale(0.85)';
						bubble.style.pointerEvents = 'none';
						bubble.style.transformStyle = 'preserve-3d';
						// Enhanced shadow for bubbles closer to camera
						const bubbleShadowIntensity =
							(1 - depthFactor - sheepDepthVariation) * 0.4 + 0.1;
						bubble.style.boxShadow = `0 ${4 * sheepDepthScale}px ${
							12 * sheepDepthScale
						}px rgba(0,0,0,${bubbleShadowIntensity}), 0 ${
							2 * sheepDepthScale
						}px ${4 * sheepDepthScale}px rgba(0,0,0,${
							bubbleShadowIntensity * 0.5
						})`;

						const messageDiv = document.createElement('div');
						const fontSize =
							sheepDepthScale < 0.85 ? '10px' : '12px';
						messageDiv.className = `text-[10px] sm:text-xs font-medium text-gray-800 text-center`;
						messageDiv.style.fontSize = `${
							parseInt(fontSize) * sheepDepthScale
						}px`;
						messageDiv.textContent =
							TERMS_MESSAGES[
								Math.floor(
									Math.random() * TERMS_MESSAGES.length,
								)
							];

						const triangle = document.createElement('div');
						const triangleSize = 8 * sheepDepthScale;
						triangle.className =
							'absolute top-full left-1/2 -translate-x-1/2 border-transparent border-t-white';
						triangle.style.borderWidth = `${triangleSize}px`;

						bubble.appendChild(messageDiv);
						bubble.appendChild(triangle);

						// Create sheep image with depth-aware sizing
						const sheepImg = document.createElement('img');
						sheepImg.src = '/sheep-2.png';
						sheepImg.alt = 'Sheep';
						const baseSize = window.innerWidth < 640 ? 12 : 16;
						const sheepSize = baseSize * sheepDepthScale;
						sheepImg.style.width = `${sheepSize * 4}px`;
						sheepImg.style.height = `${sheepSize * 4}px`;
						sheepImg.className = 'object-contain';
						sheepImg.style.opacity = String(sheepDepthOpacity);
						sheepImg.style.pointerEvents = 'none';
						// Add drop shadow to sheep for depth
						sheepImg.style.filter = `drop-shadow(0 ${
							2 * sheepDepthScale
						}px ${4 * sheepDepthScale}px rgba(0,0,0,${
							bubbleShadowIntensity * 0.6
						}))`;

						sheepWrapper.appendChild(bubble);
						sheepWrapper.appendChild(sheepImg);
						container.appendChild(sheepWrapper);

						groupSheep.push(sheepWrapper);
						groupBubbles.push({ bubble, messageDiv });
					}

					allGroups.push({
						sheep: groupSheep,
						bubbles: groupBubbles,
					});
				}

				// Animate groups having conversations
				allGroups.forEach((group, groupIdx) => {
					const { sheep, bubbles } = group;

					// Get depth factors for this group
					const depthFactor = groupIdx / (numGroups - 1);
					const depthScale = 0.7 + (1 - depthFactor) * 0.3;
					const depthOpacity = 0.6 + (1 - depthFactor) * 0.4;

					// Start all sheep visible but positioned
					sheep.forEach((sheepEl, sheepIdx) => {
						const sheepDepthVariation =
							(sheepIdx / sheepPerGroup) * 0.3;
						const sheepDepthScale =
							depthScale * (1 - sheepDepthVariation * 0.2);
						const sheepDepthOpacity =
							depthOpacity * (1 - sheepDepthVariation * 0.15);

						gsap.set(sheepEl, {
							opacity: 0,
							scale: 0.8 * sheepDepthScale,
							rotation: (Math.random() - 0.5) * 15,
						});
					});

					// Group timeline for coordinated conversation
					const groupTimeline = gsap.timeline({
						delay: groupIdx * 0.8,
						repeat: -1,
						repeatDelay: 2,
					});

					// Phase 1: Sheep appear (depth-aware)
					sheep.forEach((sheepEl, sheepIdx) => {
						const sheepDepthVariation =
							(sheepIdx / sheepPerGroup) * 0.3;
						const sheepDepthScale =
							depthScale * (1 - sheepDepthVariation * 0.2);
						const sheepDepthOpacity =
							depthOpacity * (1 - sheepDepthVariation * 0.15);

						groupTimeline.to(
							sheepEl,
							{
								opacity: sheepDepthOpacity * 0.75,
								scale: sheepDepthScale,
								duration: 0.5,
								ease: 'back.out(1.2)',
							},
							'<0.1',
						);
					});

					// Phase 2: Conversation - sheep take turns talking
					const conversationCycle = () => {
						sheep.forEach((sheepEl, sheepIdx) => {
							const { bubble, messageDiv } = bubbles[sheepIdx];
							let messageIndex = Math.floor(
								Math.random() * TERMS_MESSAGES.length,
							);

							// Subtle idle animation while waiting (depth-aware with parallax)
							const sheepDepthVariation =
								(sheepIdx / sheepPerGroup) * 0.3;
							const movementScale =
								depthScale * (1 - depthFactor * 0.5); // Less movement for further groups

							const idleAnim = gsap.to(sheepEl, {
								rotation: `+=${
									(Math.random() - 0.5) * 8 * movementScale
								}`,
								y: `+=${
									(Math.random() - 0.5) * 3 * movementScale
								}`,
								duration:
									(2 + Math.random()) *
									(1 + depthFactor * 0.5), // Slower for further groups
								repeat: -1,
								yoyo: true,
								ease: 'sine.inOut',
							});

							allAnims.push(idleAnim);

							// Conversation timing - each sheep talks in sequence
							const talkSequence = () => {
								const delay = sheepIdx * 1.2 + groupIdx * 0.5;

								const talkTimer = setTimeout(() => {
									// Update message
									messageIndex =
										(messageIndex + 1) %
										TERMS_MESSAGES.length;
									messageDiv.textContent =
										TERMS_MESSAGES[messageIndex];

									// Dynamically size bubble
									const len =
										messageDiv.textContent?.length ?? 0;
									const maxPx =
										len < 40 ? 180 : len < 80 ? 220 : 280;
									bubble.style.maxWidth = `${maxPx}px`;
									bubble.style.width = 'auto';

									// Show bubble with animation (depth-aware)
									const sheepDepthVariationForBubble =
										(sheepIdx / sheepPerGroup) * 0.3;
									const sheepDepthScaleForBubble =
										depthScale *
										(1 -
											sheepDepthVariationForBubble * 0.2);

									gsap.to(bubble, {
										opacity: 1,
										scale: 1,
										duration: 0.3,
										ease: 'back.out(1.7)',
									});

									// Slight attention animation when talking (depth-aware)
									const sheepDepthVariation =
										(sheepIdx / sheepPerGroup) * 0.3;
									const sheepDepthScale =
										depthScale *
										(1 - sheepDepthVariation * 0.2);

									gsap.to(sheepEl, {
										scale: sheepDepthScale * 1.1,
										duration: 0.3,
										yoyo: true,
										repeat: 1,
										ease: 'power2.inOut',
									});

									// Hide bubble after talking
									const hideTimer = setTimeout(() => {
										gsap.to(bubble, {
											opacity: 0,
											scale: 0.85,
											duration: 0.25,
											ease: 'power2.in',
										});
									}, 2000 + Math.random() * 1000);

									allTimers.push(hideTimer);

									// Schedule next talk
									const nextTalkDelay = 4 + Math.random() * 3;
									const nextTimer = setTimeout(() => {
										talkSequence();
									}, nextTalkDelay * 1000);

									allTimers.push(nextTimer);
								}, delay * 1000);

								allTimers.push(talkTimer);
							};

							// Start conversation sequence
							talkSequence();
						});
					};

					// Start conversation after group appears
					const conversationStartDelay = groupIdx * 1.5 + 1.5;
					const startTimer = setTimeout(() => {
						conversationCycle();
					}, conversationStartDelay * 1000);

					allTimers.push(startTimer);

					// Subtle group movement (gentle swaying with depth-aware parallax)
					const movementIntensity =
						depthScale * (1 - depthFactor * 0.6); // Less movement for further groups
					const groupMovement = gsap.to(sheep, {
						rotation: `+=${
							(Math.random() - 0.5) * 5 * movementIntensity
						}`,
						duration:
							(4 + Math.random() * 2) * (1 + depthFactor * 0.5), // Slower for further groups
						repeat: -1,
						yoyo: true,
						ease: 'sine.inOut',
					});

					allAnims.push(groupTimeline, groupMovement);
				});

				cleanupFn = () => {
					allAnims.forEach((a) => a?.kill?.());
					allTimers.forEach((t) => {
						clearTimeout(t);
						clearInterval(t as unknown as number);
					});
					allGroups.forEach((group) => {
						group.sheep.forEach((el) => el.remove());
					});
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
