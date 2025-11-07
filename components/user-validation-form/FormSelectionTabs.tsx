'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import LoginForm from './LoginForm';
import UserValidationForm from './UserValidationForm';

export default function FormSelectionTabs() {
	const [activeTab, setActiveTab] = useState('validation');
	const loginTabRef = useRef<HTMLButtonElement>(null);
	const validationTabRef = useRef<HTMLButtonElement>(null);
	const sheepRef = useRef<HTMLDivElement>(null);
	const tabsListRef = useRef<HTMLDivElement>(null);
	const walkingAnimationRef = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const animateSheep = () => {
			const targetTab =
				activeTab === 'login'
					? loginTabRef.current
					: validationTabRef.current;
			const sheep = sheepRef.current;
			const tabsList = tabsListRef.current;

			if (!targetTab || !sheep || !tabsList) return;

			// Kill any existing walking animation
			if (walkingAnimationRef.current) {
				walkingAnimationRef.current.kill();
				walkingAnimationRef.current = null;
			}

			// Get positions relative to TabsList
			const tabsListRect = tabsList.getBoundingClientRect();
			const targetRect = targetTab.getBoundingClientRect();

			// Calculate target position (center of the tab)
			const targetX =
				targetRect.left - tabsListRect.left + targetRect.width / 2;
			const targetY =
				targetRect.top - tabsListRect.top + targetRect.height / 2;

			// Calculate target position accounting for sheep width/height
			const sheepWidth = sheep.offsetWidth;
			const sheepHeight = sheep.offsetHeight;

			// Calculate tab bounds first to constrain positioning
			const tabLeft = targetRect.left - tabsListRect.left;
			const tabRight = targetRect.right - tabsListRect.left;
			const padding = 8;
			const leftBound = tabLeft + padding;
			const rightBound = tabRight - sheepWidth - padding;

			// Ensure bounds are valid (sheep can actually fit)
			const minX = Math.max(leftBound, tabLeft);
			const maxX = Math.min(rightBound, tabRight - sheepWidth);

			// Get current GSAP transform values and clamp to bounds
			let currentX = (gsap.getProperty(sheep, 'x') as number) || 0;
			currentX = Math.max(minX, Math.min(maxX, currentX)); // Clamp current position to bounds
			const currentY = (gsap.getProperty(sheep, 'y') as number) || 0;

			// Calculate target X and clamp it to stay within tab bounds
			let finalX = targetX - sheepWidth / 2;
			finalX = Math.max(minX, Math.min(maxX, finalX)); // Clamp to tab bounds
			const finalY = targetY - sheepHeight / 2;

			// Determine which direction sheep will walk
			const centerX = (minX + maxX) / 2;
			const willFaceRight = finalX < centerX;

			// Simply position the sheep in the selected tab (no jump)
			gsap.set(sheep, {
				x: finalX,
				y: finalY,
				rotation: 0,
				scaleX: willFaceRight ? 1 : -1,
			});

			// Start walking animation immediately
			startWalkingAnimation(sheep, targetRect, tabsListRect, finalY);
		};

		const startWalkingAnimation = (
			sheep: HTMLDivElement,
			tabRect: DOMRect,
			tabsListRect: DOMRect,
			baseY: number,
		) => {
			// Calculate walking bounds within the tab
			const tabLeft = tabRect.left - tabsListRect.left;
			const tabRight = tabRect.right - tabsListRect.left;
			const sheepWidth = sheep.offsetWidth;
			const padding = 8; // Padding from edges

			// Calculate bounds and ensure sheep stays within tab
			const leftBound = Math.max(tabLeft + padding, tabLeft);
			const rightBound = Math.min(
				tabRight - sheepWidth - padding,
				tabRight - sheepWidth,
			);

			// Ensure bounds are valid (rightBound must be > leftBound)
			const safeLeftBound = Math.min(leftBound, rightBound - sheepWidth);
			const safeRightBound = Math.max(
				rightBound,
				safeLeftBound + sheepWidth,
			);

			// Get current position to determine starting direction and clamp it
			let currentX = (gsap.getProperty(sheep, 'x') as number) || 0;
			currentX = Math.max(
				safeLeftBound,
				Math.min(safeRightBound, currentX),
			);
			const centerX = (safeLeftBound + safeRightBound) / 2;
			const startFacingRight = currentX < centerX;

			// Create walking timeline that repeats
			const walkTl = gsap.timeline({ repeat: -1 });

			// Helper function for walking animation with bounce and tilt
			const createWalkAnimation = (
				targetX: number,
				direction: 'left' | 'right',
				sheepElement: HTMLDivElement,
				sheepBaseY: number,
			) => {
				// Clamp targetX to stay within bounds
				const clampedTargetX = Math.max(
					safeLeftBound,
					Math.min(safeRightBound, targetX),
				);

				// Set direction instantly (no transition)
				gsap.set(sheepElement, {
					scaleX: direction === 'right' ? 1 : -1,
				});
				return gsap.to(sheepElement, {
					x: clampedTargetX,
					duration: 2,
					ease: 'power1.inOut',
					onUpdate: function () {
						const progress = this.progress();
						// More natural walking bounce
						const bounce = Math.sin(progress * Math.PI * 6) * 2.5;
						// Subtle tilt while walking (like a real sheep bobbing)
						const tilt = Math.sin(progress * Math.PI * 8) * 2;

						// Get current x position and clamp it to bounds
						const currentX =
							(gsap.getProperty(sheepElement, 'x') as number) ||
							0;
						const clampedX = Math.max(
							safeLeftBound,
							Math.min(safeRightBound, currentX),
						);

						gsap.set(sheepElement, {
							x: clampedX,
							y: sheepBaseY - bounce,
							rotation: tilt,
						});
					},
				});
			};

			// Start walking based on current position
			if (startFacingRight) {
				// Walk right first
				walkTl.add(
					createWalkAnimation(safeRightBound, 'right', sheep, baseY),
				);
				// Pause and look around before turning
				walkTl.to(sheep, {
					rotation: 0,
					duration: 0.3,
					ease: 'power1.out',
				});
				// Turn around instantly (spontaneous)
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				walkTl.call(() => void gsap.set(sheep, { scaleX: -1 }));
				// Walk left
				walkTl.add(
					createWalkAnimation(safeLeftBound, 'left', sheep, baseY),
				);
				// Pause and look around before turning
				walkTl.to(sheep, {
					rotation: 0,
					duration: 0.3,
					ease: 'power1.out',
				});
				// Turn around instantly (spontaneous)
				walkTl.call(() => void gsap.set(sheep, { scaleX: 1 }));
			} else {
				// Walk left first
				walkTl.add(
					createWalkAnimation(safeLeftBound, 'left', sheep, baseY),
				);
				// Pause and look around before turning
				walkTl.to(sheep, {
					rotation: 0,
					duration: 0.3,
					ease: 'power1.out',
				});
				// Turn around instantly (spontaneous)
				walkTl.call(() => void gsap.set(sheep, { scaleX: 1 }));
				// Walk right
				walkTl.add(
					createWalkAnimation(safeRightBound, 'right', sheep, baseY),
				);
				// Pause and look around before turning
				walkTl.to(sheep, {
					rotation: 0,
					duration: 0.3,
					ease: 'power1.out',
				});
				// Turn around instantly (spontaneous)
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				walkTl.call(() => void gsap.set(sheep, { scaleX: -1 }));
			}

			walkingAnimationRef.current = walkTl;
		};

		// Initial positioning
		const initialTab =
			activeTab === 'login'
				? loginTabRef.current
				: validationTabRef.current;
		if (initialTab && sheepRef.current && tabsListRef.current) {
			const tabsListRect = tabsListRef.current.getBoundingClientRect();
			const tabRect = initialTab.getBoundingClientRect();
			const sheepWidth = sheepRef.current.offsetWidth;
			const padding = 8;

			// Calculate tab bounds
			const tabLeft = tabRect.left - tabsListRect.left;
			const tabRight = tabRect.right - tabsListRect.left;
			const leftBound = Math.max(tabLeft + padding, tabLeft);
			const rightBound = Math.min(
				tabRight - sheepWidth - padding,
				tabRight - sheepWidth,
			);
			const minX = Math.min(leftBound, rightBound - sheepWidth);
			const maxX = Math.max(rightBound, minX + sheepWidth);

			// Calculate initial position and clamp to bounds
			let x =
				tabRect.left -
				tabsListRect.left +
				tabRect.width / 2 -
				sheepWidth / 2;
			x = Math.max(minX, Math.min(maxX, x));
			const y =
				tabRect.top -
				tabsListRect.top +
				tabRect.height / 2 -
				sheepRef.current.offsetHeight / 2;

			gsap.set(sheepRef.current, {
				x: x,
				y: y,
				rotation: 0,
				scaleX: 1, // Face right initially
			});

			// Start walking animation on initial load
			setTimeout(() => {
				if (sheepRef.current && tabsListRef.current && initialTab) {
					const tabsListRect =
						tabsListRef.current.getBoundingClientRect();
					const tabRect = initialTab.getBoundingClientRect();
					const y =
						tabRect.top -
						tabsListRect.top +
						tabRect.height / 2 -
						sheepRef.current.offsetHeight / 2;
					startWalkingAnimation(
						sheepRef.current,
						tabRect,
						tabsListRect,
						y,
					);
				}
			}, 300);
		}

		// Animate when tab changes
		const timeoutId = setTimeout(animateSheep, 100);
		return () => {
			clearTimeout(timeoutId);
			// Clean up walking animation on unmount or tab change
			if (walkingAnimationRef.current) {
				walkingAnimationRef.current.kill();
				walkingAnimationRef.current = null;
			}
		};
	}, [activeTab]);

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
			<div className="relative mb-6">
				<TabsList
					ref={tabsListRef}
					className="grid w-full grid-cols-2 relative"
				>
					<TabsTrigger
						ref={validationTabRef}
						value="validation"
						className={
							activeTab === 'validation'
								? 'text-green-600 font-bold'
								: 'text-foreground'
						}
					>
						Sign Up
					</TabsTrigger>
					<TabsTrigger
						ref={loginTabRef}
						value="login"
						className={
							activeTab === 'login'
								? 'text-green-600 font-bold'
								: 'text-foreground'
						}
					>
						Log In
					</TabsTrigger>
					<div
						ref={sheepRef}
						className="absolute pointer-events-none text-2xl z-10 will-change-transform"
					>
						🐑
					</div>
				</TabsList>
			</div>
			<TabsContent value="login">
				<LoginForm />
			</TabsContent>
			<TabsContent value="validation">
				<UserValidationForm />
			</TabsContent>
		</Tabs>
	);
}
