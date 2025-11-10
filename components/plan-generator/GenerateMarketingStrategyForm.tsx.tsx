'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { getCommunityFitStoryline } from '../../actions/get-communiy-fit-story-form.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { CheckCircle2, Circle } from 'lucide-react';
import Image from 'next/image';

const FUNNY_MESSAGES = [
	'Baa patient! 🐑',
	'Almost there! 🌟',
	'Great things take time! ⏰',
	'Our AI is working overtime! 🤖',
	'Just a few more baaaas... 🐏',
	"We promise it's worth it! ✨",
	'Almost done, hang in there! 💪',
	'Our sheep are counting... 🧮',
	'Just brewing your perfect strategy! ☕',
	'Patience is a virtue... 🧘',
];

const targetPlatforms = [
	{
		id: 1,
		name: 'TikTok',
		icon: '/TikTok.png',
	},
	{
		id: 2,
		name: 'Instagram',
		icon: '/Instagram.png',
	},
	{
		id: 3,
		name: 'YouTube',
		icon: '/YouTube.png',
	},
	{
		id: 4,
		name: 'LinkedIn',
		icon: '/LinkedIn.png',
	},
	{
		id: 5,
		name: 'X (Twitter)',
		icon: '/X (Twitter).png',
	},
	{
		id: 6,
		name: 'Snapchat',
		icon: '/Snapchat.png',
	},
	{
		id: 7,
		name: 'Facebook',
		icon: '/Facebook.png',
	},
];

const getGenerationSteps = (platformName: string = 'TikTok') => [
	{
		id: 1,
		label: 'Analyzing your idea',
		description: 'Processing your concept and vision',
	},
	{
		id: 2,
		label: 'Assessing community market fit',
		description: 'Calculating engagement potential',
	},
	{
		id: 3,
		label: 'Creating ideal follower profile',
		description: 'Defining your target audience',
	},
	{
		id: 4,
		label: 'Generating personas',
		description: 'Building 5 distinct user profiles',
	},
	{
		id: 5,
		label: 'Building storylines',
		description: 'Crafting narrative arcs per persona',
	},
	{
		id: 6,
		label: `Crafting ${platformName} scripts`,
		description: 'Writing viral-ready content scripts',
	},
	{
		id: 7,
		label: 'Finalizing strategy',
		description: 'Compiling your complete plan',
	},
];

export function GenerateMarketingStrategyForm() {
	const [result, setResult] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [remainingTime, setRemainingTime] = useState(300); // 5 minutes
	const [selectedPlatform, setSelectedPlatform] = useState<string>('TikTok');
	const [selectedDevice, setSelectedDevice] = useState<string>('');
	const [selectedTone, setSelectedTone] = useState<string>('');
	const [selectedObjective, setSelectedObjective] = useState<string>('');
	const sheepContainerRef = useRef<HTMLDivElement>(null);
	const animationRefs = useRef<any[]>([]);
	const messageTimersRef = useRef<NodeJS.Timeout[]>([]);

	// Generate steps dynamically based on selected platform
	const GENERATION_STEPS = useMemo(
		() => getGenerationSteps(selectedPlatform),
		[selectedPlatform],
	);

	// Simulate progress through steps during loading
	useEffect(() => {
		if (!isLoading) {
			setCurrentStep(0);
			setRemainingTime(300); // Reset timer to 5 minutes
			return;
		}

		const stepInterval = setInterval(() => {
			setCurrentStep((prev) => {
				if (prev < GENERATION_STEPS.length) {
					return prev + 1;
				}
				return prev;
			});
		}, 12000); // Move to next step every 12 seconds

		return () => clearInterval(stepInterval);
	}, [isLoading]);

	// Countdown timer
	useEffect(() => {
		if (!isLoading) {
			return;
		}

		const timerInterval = setInterval(() => {
			setRemainingTime((prev) => {
				if (prev <= 1) {
					return 0;
				}
				return prev - 1;
			});
		}, 1000); // Update every second

		return () => clearInterval(timerInterval);
	}, [isLoading]);

	// Animate raining sheep when loading
	useEffect(() => {
		if (typeof window === 'undefined' || !isLoading) {
			// Clean up animations when not loading
			animationRefs.current.forEach((anim) => anim?.kill());
			animationRefs.current = [];
			messageTimersRef.current.forEach((timer) => {
				clearTimeout(timer);
				clearInterval(timer);
			});
			messageTimersRef.current = [];
			if (sheepContainerRef.current) {
				sheepContainerRef.current.innerHTML = '';
			}
			return;
		}

		let cleanupFn: (() => void) | null = null;

		(async () => {
			try {
				const { gsap } = await import('gsap');
				if (!sheepContainerRef.current) return;

				const container = sheepContainerRef.current;
				const numSheep = 12;
				const sheepArray: HTMLDivElement[] = [];
				const bubbleArray: Array<{
					bubble: HTMLDivElement;
					messageDiv: HTMLDivElement;
				}> = [];
				const allAnims: any[] = [];
				const allTimers: NodeJS.Timeout[] = [];

				// Create sheep elements
				for (let i = 0; i < numSheep; i++) {
					const sheepWrapper = document.createElement('div');
					sheepWrapper.className = 'absolute cursor-pointer';
					sheepWrapper.style.left = `${Math.random() * 100}%`;
					sheepWrapper.style.top = '-100px';
					sheepWrapper.style.zIndex = '10';

					// Speech bubble - responsive sizing
					const bubble = document.createElement('div');
					bubble.className =
						'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg border border-gray-200 whitespace-normal break-words';
					bubble.style.minWidth = '100px';
					bubble.style.maxWidth = '220px';
					bubble.style.opacity = '0';
					bubble.style.transform = 'scale(0.8)';
					const messageDiv = document.createElement('div');
					messageDiv.className =
						'text-[10px] sm:text-xs font-medium text-gray-800 text-center';
					const initialMessage =
						FUNNY_MESSAGES[
							Math.floor(Math.random() * FUNNY_MESSAGES.length)
						];
					messageDiv.textContent = initialMessage;
					const triangle = document.createElement('div');
					triangle.className =
						'absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white';
					bubble.appendChild(messageDiv);
					bubble.appendChild(triangle);

					// Sheep image - responsive size
					const sheepImg = document.createElement('img');
					sheepImg.src = '/sheep-2.png';
					sheepImg.alt = 'Sheep';
					sheepImg.className =
						'w-12 h-12 sm:w-16 sm:h-16 object-contain';
					sheepImg.style.opacity = '0.7';

					sheepWrapper.appendChild(bubble);
					sheepWrapper.appendChild(sheepImg);
					container.appendChild(sheepWrapper);

					sheepArray.push(sheepWrapper);
					bubbleArray.push({ bubble, messageDiv });
				}

				// Track mouse position for interaction
				let mouseX = 0;
				let mouseY = 0;
				const mouseUpdateHandler = (e: MouseEvent) => {
					mouseX = e.clientX;
					mouseY = e.clientY;
				};
				window.addEventListener('mousemove', mouseUpdateHandler);

				// Animate each sheep falling
				sheepArray.forEach((sheep, index) => {
					const startDelay = index * 0.4;
					const fallDuration = 7 + Math.random() * 5;
					const startXPercent = Math.random() * 100;
					const horizontalDrift = (Math.random() - 0.5) * 60;

					// Store current animation state
					let currentX = startXPercent;
					let currentY = -100;
					let isInteracting = false;
					let interactionAnim: any = null;
					let fallAnim: any = null;

					// Set initial position
					gsap.set(sheep, {
						x: `${startXPercent}%`,
						y: -100,
						rotation: 0,
					});

					// Fall animation - create first so it can be referenced
					fallAnim = gsap.to(sheep, {
						y: window.innerHeight + 200,
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
							currentX = newX;
							gsap.set(sheep, {
								x: `${newX}%`,
								y: -100,
								rotation: 0,
							});
							fallAnim.vars.x = `${
								newX +
								(horizontalDrift / window.innerWidth) * 100
							}%`;
						},
					});

					// Function to check distance and react to mouse
					const checkMouseDistance = () => {
						if (!container || !fallAnim) return;

						const rect = sheep.getBoundingClientRect();
						const sheepCenterX = rect.left + rect.width / 2;
						const sheepCenterY = rect.top + rect.height / 2;

						const distance = Math.sqrt(
							Math.pow(mouseX - sheepCenterX, 2) +
								Math.pow(mouseY - sheepCenterY, 2),
						);

						const interactionRadius = 120; // Distance threshold for interaction

						if (distance < interactionRadius && !isInteracting) {
							isInteracting = true;
							// Pause fall animation temporarily
							fallAnim.pause();

							// Calculate direction away from mouse
							const angle = Math.atan2(
								sheepCenterY - mouseY,
								sheepCenterX - mouseX,
							);
							// Increased push distance for more dramatic bounce
							const pushDistance = 120 + Math.random() * 40;
							const newX =
								sheepCenterX + Math.cos(angle) * pushDistance;
							const newY =
								sheepCenterY + Math.sin(angle) * pushDistance;

							// Convert to percentage for X
							const newXPercent =
								(newX / window.innerWidth) * 100;

							// Create a bouncy timeline animation
							const bounceTimeline = gsap.timeline({
								onComplete: () => {
									// Resume fall animation after bounce completes
									setTimeout(() => {
										isInteracting = false;
										fallAnim.resume();
									}, 200);
								},
							});

							// Initial bounce away - main movement with elastic bounce
							bounceTimeline.to(sheep, {
								x: `${newXPercent}%`,
								y: `+=${Math.sin(angle) * pushDistance}`,
								rotation: `+=${(Math.random() - 0.5) * 540}`,
								scale: 1.3,
								duration: 0.6,
								ease: 'elastic.out(1, 0.5)',
							});

							// Secondary smaller bounce - creates the bounce effect
							bounceTimeline.to(sheep, {
								x: `+=${Math.cos(angle) * 20}`,
								y: `+=${Math.sin(angle) * 20}`,
								scale: 1.1,
								duration: 0.3,
								ease: 'bounce.out',
							});

							// Final settle - return to normal scale
							bounceTimeline.to(sheep, {
								scale: 1,
								duration: 0.2,
								ease: 'power2.out',
							});

							interactionAnim = bounceTimeline;
						}
					};

					// Check mouse distance periodically - more frequent for responsive bouncing
					const mouseCheckInterval = setInterval(() => {
						if (isLoading) checkMouseDistance();
					}, 50);

					// Click interaction - make sheep bounce
					sheep.addEventListener('click', (e) => {
						e.stopPropagation();
						if (interactionAnim) interactionAnim.kill();

						// Bounce animation
						gsap.to(sheep, {
							scale: 1.5,
							rotation: `+=${(Math.random() - 0.5) * 720}`,
							duration: 0.3,
							ease: 'back.out(2)',
							yoyo: true,
							repeat: 1,
							onComplete: () => {
								gsap.to(sheep, {
									scale: 1,
									duration: 0.2,
								});
							},
						});
					});

					// Hover effect - slight scale up
					sheep.addEventListener('mouseenter', () => {
						gsap.to(sheep, {
							scale: 1.15,
							duration: 0.2,
							ease: 'power2.out',
						});
					});

					sheep.addEventListener('mouseleave', () => {
						gsap.to(sheep, {
							scale: 1,
							duration: 0.2,
							ease: 'power2.out',
						});
					});

					// Gentle rotation animation
					const rotateAnim = gsap.to(sheep, {
						rotation: `+=${(Math.random() - 0.5) * 45}`,
						duration: 2 + Math.random() * 2,
						repeat: -1,
						yoyo: true,
						ease: 'sine.inOut',
						delay: startDelay,
					});

					allTimers.push(mouseCheckInterval);

					// Speech bubble animations
					const { bubble, messageDiv } = bubbleArray[index];
					let messageIndex = Math.floor(
						Math.random() * FUNNY_MESSAGES.length,
					);
					let isBubbleVisible = false;

					const showBubble = () => {
						if (!isLoading || isBubbleVisible) return;

						isBubbleVisible = true;
						messageIndex =
							(messageIndex + 1) % FUNNY_MESSAGES.length;
						messageDiv.textContent = FUNNY_MESSAGES[messageIndex];

						// Dynamically size bubble based on message length
						const len = messageDiv.textContent?.length ?? 0;
						const maxPx = len < 40 ? 180 : len < 80 ? 220 : 280;
						bubble.style.maxWidth = `${maxPx}px`;
						bubble.style.width = 'auto';

						gsap.to(bubble, {
							opacity: 1,
							scale: 1,
							duration: 0.4,
							ease: 'back.out(1.7)',
						});

						// Hide after showing
						const hideTimer = setTimeout(() => {
							if (!isLoading) return;
							gsap.to(bubble, {
								opacity: 0,
								scale: 0.8,
								duration: 0.3,
								onComplete: () => {
									isBubbleVisible = false;
								},
							});
						}, 2500 + Math.random() * 1500);

						allTimers.push(hideTimer);
					};

					// Start showing bubbles periodically
					const startTimer = setTimeout(() => {
						showBubble();
					}, startDelay * 1000 + 1000);

					const bubbleInterval = setInterval(() => {
						if (isLoading) showBubble();
					}, 3500 + Math.random() * 2000);

					allAnims.push(fallAnim, rotateAnim);
					allTimers.push(startTimer, bubbleInterval);
				});

				animationRefs.current = allAnims;
				messageTimersRef.current = allTimers;

				cleanupFn = () => {
					window.removeEventListener('mousemove', mouseUpdateHandler);
					allAnims.forEach((anim) => anim?.kill());
					allTimers.forEach((timer) => {
						clearTimeout(timer);
						clearInterval(timer);
					});
					sheepArray.forEach((sheep) => sheep.remove());
				};
			} catch (error) {
				console.error('Failed to load GSAP:', error);
			}
		})();

		return () => {
			if (cleanupFn) cleanupFn();
		};
	}, [isLoading]);

	async function handleSubmit(formData: FormData) {
		setResult(null);
		setCurrentStep(0);
		setIsLoading(true);
		try {
			const res = await getCommunityFitStoryline(formData);
			setResult(res);
			setCurrentStep(GENERATION_STEPS.length); // Mark all steps as complete
		} catch (error) {
			console.error('Error generating storyline:', error);
		} finally {
			setIsLoading(false);
		}
	}

	const handleReset = () => {
		setResult(null);
		setSelectedDevice('');
		setSelectedTone('');
		setSelectedObjective('');
		const form = document.getElementById(
			'storyline-form',
		) as HTMLFormElement;
		if (form) {
			form.reset();
		}
	};

	const parseResult = (result: string) => {
		try {
			return JSON.parse(result);
		} catch {
			return null;
		}
	};

	const parsedResult = result ? parseResult(result) : null;

	const getScoreColor = (score: number) => {
		if (score >= 8) return 'bg-green-500';
		if (score >= 6) return 'bg-yellow-500';
		return 'bg-orange-500';
	};

	const progressPercentage = (currentStep / GENERATION_STEPS.length) * 100;

	return (
		<div className="w-full space-y-4 sm:space-y-6 relative">
			{/* Raining Sheep Background */}
			{isLoading && (
				<div
					ref={sheepContainerRef}
					className="fixed inset-0 overflow-hidden"
					style={{ zIndex: 5 }}
				/>
			)}

			{/* Loading Progress */}
			{isLoading && (
				<Card className="w-full p-4 sm:p-5 transition-all">
					<CardHeader className="p-0 pb-4">
						<div className="flex items-center gap-2">
							<Spinner className="w-4 h-4 text-green-600" />
							<CardTitle className="text-sm font-semibold">
								Generating Your Community Fit Storyline
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="p-0 space-y-6">
						<div className="space-y-4">
							<div className="relative">
								<div className="flex items-center gap-3 mb-2">
									{/* Background progress bar */}
									<div className="h-2 sm:h-3 flex-1 bg-gray-100 rounded-full overflow-hidden">
										{/* Green gradient progress bar with shimmer effect */}
										<div
											className="h-full rounded-full transition-all duration-500 ease-out progress-shimmer"
											style={{
												width: `${progressPercentage}%`,
												background:
													'linear-gradient(90deg, rgba(34, 197, 94, 0.8) 0%, rgba(22, 163, 74, 1) 35%, rgba(34, 197, 94, 1) 50%, rgba(22, 163, 74, 1) 65%, rgba(34, 197, 94, 0.8) 100%)',
												backgroundSize: '200% 100%',
											}}
										/>
									</div>
									{/* Timer display */}
									<div className="flex-shrink-0 text-xs sm:text-sm font-medium text-gray-700 tabular-nums">
										{Math.floor(remainingTime / 60)}:
										{(remainingTime % 60)
											.toString()
											.padStart(2, '0')}
									</div>
								</div>
								<style
									dangerouslySetInnerHTML={{
										__html: `
									@keyframes shimmer {
										0% {
											background-position: -200% 0;
										}
										100% {
											background-position: 200% 0;
										}
									}
									.progress-shimmer {
										animation: shimmer 2s infinite;
									}
								`,
									}}
								/>
							</div>
							<div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 px-2">
								<Spinner className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
								<span className="text-center">
									{currentStep > 0 &&
									currentStep <= GENERATION_STEPS.length
										? `${
												GENERATION_STEPS[
													currentStep - 1
												].description
										  }...`
										: 'Starting generation...'}
								</span>
							</div>
						</div>

						<div className="space-y-2 sm:space-y-3">
							{GENERATION_STEPS.map((step, index) => {
								const isCompleted = index < currentStep;
								const isCurrent = index === currentStep - 1;
								const isPending = index >= currentStep;

								return (
									<div
										key={step.id}
										className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all ${
											isCurrent
												? 'bg-slate-50 border border-gray-200'
												: isCompleted
												? 'opacity-75'
												: 'opacity-50'
										}`}
									>
										<div className="flex-shrink-0 mt-0.5">
											{isCompleted ? (
												<CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
											) : isCurrent ? (
												<div className="relative">
													<Spinner className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
												</div>
											) : (
												<Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<div
												className={`text-xs sm:text-sm font-medium leading-snug ${
													isCompleted || isCurrent
														? 'text-gray-900'
														: 'text-gray-400'
												}`}
											>
												{step.label}
											</div>
											{isCurrent && (
												<div className="text-xs text-gray-600 mt-1 leading-relaxed">
													{step.description}
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>
			)}

			{!isLoading && !parsedResult && (
				<Card className="w-full p-4 sm:p-5 md:p-6 transition-all hover:shadow-md">
					<form
						id="storyline-form"
						action={handleSubmit}
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(
								new FormData(e.target as HTMLFormElement),
							);
						}}
						className="space-y-4 sm:space-y-6"
					>
						{/* Basic Information */}
						<div className="space-y-3 sm:space-y-4">
							<h2 className="text-xs sm:text-sm font-semibold tracking-tight">
								Basic Information
							</h2>

							<div className="space-y-2">
								<Label
									htmlFor="idea"
									className="text-xs sm:text-sm"
								>
									Your Idea *
								</Label>
								<Textarea
									id="idea"
									name="idea"
									placeholder="Describe your idea or concept..."
									required
									className="min-h-20 sm:min-h-24 text-sm"
								/>
							</div>

							{/* Vision: //todo: this section is to be generated by the agent */}
							<div className="space-y-2">
								<Label
									htmlFor="objective"
									className="text-xs sm:text-sm"
								>
									Your Objective/Goal *
								</Label>
								<Select
									name="objective"
									value={selectedObjective}
									onValueChange={setSelectedObjective}
									required
								>
									<SelectTrigger>
										<SelectValue placeholder="Select your objective/goal" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="I want to promote a product">
											I want to promote a product
										</SelectItem>
										<SelectItem value="I want to grow my followers base">
											I want to grow my followers base
										</SelectItem>
										<SelectItem value="I want to get traction towards my site">
											I want to get traction towards my
											site
										</SelectItem>
										<SelectItem value="I want to build brand awareness">
											I want to build brand awareness
										</SelectItem>
										<SelectItem value="I want to drive sales and conversions">
											I want to drive sales and
											conversions
										</SelectItem>
										<SelectItem value="I want to establish thought leadership">
											I want to establish thought
											leadership
										</SelectItem>
										<SelectItem value="I want to engage with my community">
											I want to engage with my community
										</SelectItem>
										<SelectItem value="I want to launch a new product or service">
											I want to launch a new product or
											service
										</SelectItem>
										<SelectItem value="I want to generate leads">
											I want to generate leads
										</SelectItem>
										<SelectItem value="Other">
											Other
										</SelectItem>
									</SelectContent>
								</Select>
								{selectedObjective === 'Other' && (
									<div className="space-y-2">
										<Label
											htmlFor="other_objective"
											className="text-xs sm:text-sm"
										>
											Custom Objective/Goal *
										</Label>
										<Input
											id="other_objective"
											name="other_objective"
											placeholder="Describe your objective/goal"
											required={
												selectedObjective === 'Other'
											}
											className="text-sm"
										/>
									</div>
								)}
							</div>
						</div>

						<Separator />

						{/* Platform & Timeline */}
						<div className="space-y-3 sm:space-y-4">
							<h2 className="text-xs sm:text-sm font-semibold tracking-tight">
								Platform & Timeline
							</h2>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
								<div className="space-y-2">
									<Label htmlFor="target_platforms">
										Target Platforms *
									</Label>
									<Select
										name="target_platforms"
										onValueChange={setSelectedPlatform}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a platform" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="TikTok">
												<svg
													className="size-4"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
														fill="#000000"
													/>
												</svg>
												TikTok
											</SelectItem>
											<SelectItem value="Instagram">
												<svg
													className="size-4"
													viewBox="0 0 24 24"
													fill="none"
												>
													<defs>
														<linearGradient
															id="instagram-gradient"
															x1="0%"
															y1="0%"
															x2="100%"
															y2="100%"
														>
															<stop
																offset="0%"
																stopColor="#E4405F"
															/>
															<stop
																offset="50%"
																stopColor="#C13584"
															/>
															<stop
																offset="100%"
																stopColor="#833AB4"
															/>
														</linearGradient>
													</defs>
													<path
														d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
														fill="url(#instagram-gradient)"
													/>
												</svg>
												Instagram
											</SelectItem>
											<SelectItem value="YouTube">
												<svg
													className="size-4"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
														fill="#FF0000"
													/>
												</svg>
												YouTube
											</SelectItem>
											<SelectItem
												value="LinkedIn"
												disabled
											>
												<svg
													className="size-4"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
														fill="#0077B5"
													/>
												</svg>
												LinkedIn (Coming Soon)
											</SelectItem>
											<SelectItem
												value="X (Twitter)"
												disabled
											>
												<svg
													className="size-4"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
														fill="#000000"
													/>
												</svg>
												X (Twitter) (Coming Soon)
											</SelectItem>
											<SelectItem
												value="Snapchat"
												disabled
											>
												<Image
													className="w-4 h-4"
													src="/Snapchat.png"
													alt="Snapchat"
													width={24}
													height={24}
												/>
												Snapchat (Coming Soon)
											</SelectItem>
											<SelectItem
												value="Facebook"
												disabled
											>
												<svg
													className="size-4"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
														fill="#1877F2"
													/>
												</svg>
												Facebook (Coming Soon)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="posting_frequency"
										className="text-xs sm:text-sm"
									>
										Posting Frequency *
									</Label>
									<Select name="posting_frequency">
										<SelectTrigger>
											<SelectValue placeholder="Select a posting frequency" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1 post/day">
												1 post/day
											</SelectItem>
											<SelectItem value="2 posts/day">
												2 posts/day
											</SelectItem>
											<SelectItem
												value="3 posts/day"
												disabled
											>
												3 posts/day (Coming Soon)
											</SelectItem>
											<SelectItem
												value="4 posts/day"
												disabled
											>
												4 posts/day (Coming Soon)
											</SelectItem>
											<SelectItem
												value="5 posts/day"
												disabled
											>
												5 posts/day (Coming Soon)
											</SelectItem>
											<SelectItem
												value="6 posts/day"
												disabled
											>
												6 posts/day (Coming Soon)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="duration">Duration *</Label>
									<Select name="duration">
										<SelectTrigger>
											<SelectValue placeholder="Select a duration" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1 week">
												1 week
											</SelectItem>
											<SelectItem value="2 weeks">
												2 weeks
											</SelectItem>
											<SelectItem
												value="3 weeks"
												disabled
											>
												3 weeks (Coming Soon)
											</SelectItem>
											<SelectItem
												value="4 weeks"
												disabled
											>
												4 weeks (Coming Soon)
											</SelectItem>
											<SelectItem
												value="5 weeks"
												disabled
											>
												5 weeks (Coming Soon)
											</SelectItem>
											<SelectItem
												value="6 weeks"
												disabled
											>
												6 weeks (Coming Soon)
											</SelectItem>
											<SelectItem
												value="7 weeks"
												disabled
											>
												7 weeks (Coming Soon)
											</SelectItem>
											<SelectItem
												value="8 weeks"
												disabled
											>
												8 weeks (Coming Soon)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="device">Device *</Label>
									<Select
										name="device"
										value={selectedDevice}
										onValueChange={setSelectedDevice}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a device" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="iPhone 5s">
												iPhone
											</SelectItem>
											<SelectItem value="Android">
												Android
											</SelectItem>
											<SelectItem value="Other">
												Other
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Device Details for iPhone, Android and Other */}
							{(selectedDevice.startsWith('iPhone') ||
								selectedDevice === 'Android' ||
								selectedDevice === 'Other') && (
								<div className="space-y-2">
									<Label
										htmlFor={
											selectedDevice.startsWith('iPhone')
												? 'iphone_device_name'
												: selectedDevice === 'Android'
												? 'android_device_name'
												: 'other_device_name'
										}
									>
										{selectedDevice.startsWith('iPhone')
											? 'iPhone Device Name *'
											: selectedDevice === 'Android'
											? 'Android Device Name *'
											: 'Device Name *'}
									</Label>
									<Input
										id={
											selectedDevice.startsWith('iPhone')
												? 'iphone_device_name'
												: selectedDevice === 'Android'
												? 'android_device_name'
												: 'other_device_name'
										}
										name={
											selectedDevice.startsWith('iPhone')
												? 'iphone_device_name'
												: selectedDevice === 'Android'
												? 'android_device_name'
												: 'other_device_name'
										}
										placeholder={
											selectedDevice.startsWith('iPhone')
												? `e.g., ${selectedDevice}`
												: selectedDevice === 'Android'
												? 'e.g., Samsung Galaxy S24'
												: 'e.g., iPad Pro, Windows Phone'
										}
										required={
											selectedDevice.startsWith(
												'iPhone',
											) ||
											selectedDevice === 'Android' ||
											selectedDevice === 'Other'
										}
										className="text-sm"
									/>
								</div>
							)}
						</div>

						{/* Content Strategy // ! FIX: remove this section and all related inputs -> the agent will handle this*/}
						<div className="space-y-3 sm:space-y-4"></div>
						<div className="space-y-2">
							<Label
								htmlFor="tone"
								className="text-xs sm:text-sm"
							>
								Tone & Style *
							</Label>
							<Select
								name="tone"
								value={selectedTone}
								onValueChange={setSelectedTone}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a tone & style" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Friendly, motivational, and slightly humorous">
										Friendly, motivational, and slightly
										humorous
									</SelectItem>
									<SelectItem value="Professional and authoritative">
										Professional and authoritative
									</SelectItem>
									<SelectItem value="Casual and conversational">
										Casual and conversational
									</SelectItem>
									<SelectItem value="Energetic and enthusiastic">
										Energetic and enthusiastic
									</SelectItem>
									<SelectItem value="Calm and educational">
										Calm and educational
									</SelectItem>
									<SelectItem value="Witty and entertaining">
										Witty and entertaining
									</SelectItem>
									<SelectItem value="Inspirational and uplifting">
										Inspirational and uplifting
									</SelectItem>
									<SelectItem value="Direct and no-nonsense">
										Direct and no-nonsense
									</SelectItem>
									<SelectItem value="Other">Other</SelectItem>
								</SelectContent>
							</Select>
							{selectedTone === 'Other' && (
								<div className="space-y-2">
									<Label
										htmlFor="other_tone"
										className="text-xs sm:text-sm"
									>
										Custom Tone & Style *
									</Label>
									<Input
										id="other_tone"
										name="other_tone"
										placeholder="e.g., Friendly, motivational, and slightly humorous"
										required={selectedTone === 'Other'}
										className="text-sm"
									/>
								</div>
							)}
						</div>

						<Separator />

						{/* Actions */}
						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							<Button
								type="submit"
								disabled={isLoading}
								className="rounded-full px-6 py-3 text-sm sm:text-base min-h-[44px] flex-1 sm:flex-none w-full sm:w-auto"
							>
								{isLoading
									? 'Generating...'
									: 'Generate Storyline'}
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={handleReset}
								className="rounded-full px-6 py-3 text-sm sm:text-base min-h-[44px] flex-1 sm:flex-none w-full sm:w-auto"
							>
								Reset Form
							</Button>
						</div>
					</form>
				</Card>
			)}

			{/* Results Section */}
			{parsedResult && (
				<div className="w-full space-y-4 sm:space-y-6">
					<div className="text-center mb-6 sm:mb-8 px-2">
						<h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-2">
							Your Community Fit Storyline
						</h2>
						<p className="text-gray-600 text-xs sm:text-sm">
							Your personalized content strategy is ready
						</p>
					</div>

					{/* Community Market Fit Scores */}
					{parsedResult.community_market_fit && (
						<Card className="w-full p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
							<CardHeader className="p-0 pb-4">
								<CardTitle className="text-sm font-semibold">
									Community Market Fit Assessment
								</CardTitle>
							</CardHeader>
							<CardContent className="p-0 space-y-4 sm:space-y-6">
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
									{Object.entries(
										parsedResult.community_market_fit
											.score || {},
									).map(([key, value]) => (
										<div
											key={key}
											className="flex flex-col items-center p-3 sm:p-4 rounded-lg border border-gray-200 bg-slate-50"
										>
											<div className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2 text-center capitalize leading-tight">
												{key.replace(/_/g, ' ')}
											</div>
											<div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-2">
												<svg
													className="transform -rotate-90 w-full h-full"
													viewBox="0 0 36 36"
													preserveAspectRatio="xMidYMid meet"
												>
													<path
														className="text-gray-200"
														stroke="currentColor"
														strokeWidth="3"
														fill="none"
														d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
													/>
													<path
														className={getScoreColor(
															value as number,
														)}
														stroke="currentColor"
														strokeWidth="3"
														strokeDasharray={`${
															(value as number) *
															10
														}, 100`}
														fill="none"
														d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
													/>
												</svg>
												<div className="absolute inset-0 flex items-center justify-center">
													<span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
														{value as number}/10
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
								{parsedResult.community_market_fit.summary && (
									<div className="space-y-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
										<h3 className="font-semibold text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
											Key Insights
										</h3>
										<ul className="space-y-2">
											{parsedResult.community_market_fit.summary.map(
												(item: string, idx: number) => (
													<li
														key={idx}
														className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed break-words"
													>
														<span className="text-green-600 mt-1">
															•
														</span>
														<span>{item}</span>
													</li>
												),
											)}
										</ul>
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* IFC Profile */}
					{parsedResult.ifc_profile && (
						<Card className="w-full p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
							<CardHeader className="p-0 pb-3 sm:pb-4">
								<CardTitle className="text-xs sm:text-sm font-semibold">
									Ideal Follower Profile (IFP)
								</CardTitle>
							</CardHeader>
							<CardContent className="p-0 space-y-3 sm:space-y-4">
								<div>
									<h3 className="font-semibold text-[11px] sm:text-xs text-gray-700 mb-1.5 sm:mb-2">
										Demographics
									</h3>
									<p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
										{parsedResult.ifc_profile
											.demographics || 'Not provided'}
									</p>
								</div>
								<div>
									<h3 className="font-semibold text-[11px] sm:text-xs text-gray-700 mb-1.5 sm:mb-2">
										Psychographics
									</h3>
									<p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
										{parsedResult.ifc_profile
											.psychographics || 'Not provided'}
									</p>
								</div>
								<div>
									<h3 className="font-semibold text-[11px] sm:text-xs text-gray-700 mb-1.5 sm:mb-2">
										Pain Points
									</h3>
									<p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
										{parsedResult.ifc_profile.pain_points ||
											'Not provided'}
									</p>
								</div>
								<div>
									<h3 className="font-semibold text-[11px] sm:text-xs text-gray-700 mb-1.5 sm:mb-2">
										Triggers
									</h3>
									<p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
										{parsedResult.ifc_profile.triggers ||
											'Not provided'}
									</p>
								</div>
								<div>
									<h3 className="font-semibold text-[11px] sm:text-xs text-gray-700 mb-1.5 sm:mb-2">
										Community Behaviors
									</h3>
									<p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
										{parsedResult.ifc_profile
											.community_behaviors ||
											'Not provided'}
									</p>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Personas */}
					{parsedResult.personas &&
						parsedResult.personas.length > 0 && (
							<div className="w-full space-y-4 sm:space-y-6">
								<h2 className="text-xs sm:text-sm font-semibold tracking-tight text-center px-2">
									Personas & Strategies
								</h2>
								<Tabs
									defaultValue="persona-0"
									className="w-full"
								>
									<TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto p-1 gap-1 overflow-x-auto">
										{parsedResult.personas.map(
											(persona: any, idx: number) => (
												<TabsTrigger
													key={idx}
													value={`persona-${idx}`}
													className="text-[10px] sm:text-xs md:text-sm py-2 min-h-[44px]"
												>
													<span className="truncate">
														Persona {idx + 1}
													</span>
												</TabsTrigger>
											),
										)}
									</TabsList>
									{parsedResult.personas.map(
										(persona: any, idx: number) => (
											<TabsContent
												key={idx}
												value={`persona-${idx}`}
												className="mt-4 sm:mt-6 space-y-4 sm:space-y-6"
											>
												<Card className="w-full p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
													<CardHeader className="p-0 pb-4">
														<div className="flex items-start justify-between gap-4">
															<div>
																<CardTitle className="text-sm font-semibold mb-2">
																	{persona.name ||
																		`Persona ${
																			idx +
																			1
																		}`}
																</CardTitle>
																{persona.segment && (
																	<Badge
																		variant="secondary"
																		className="mt-1"
																	>
																		{
																			persona.segment
																		}
																	</Badge>
																)}
															</div>
														</div>
													</CardHeader>
													<CardContent className="p-0 space-y-6">
														{persona.description && (
															<div>
																<h3 className="font-semibold text-xs text-gray-700 mb-2">
																	Description
																</h3>
																<p className="text-xs text-gray-600 leading-relaxed">
																	{
																		persona.description
																	}
																</p>
															</div>
														)}

														<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
															{persona.key_motivation && (
																<div>
																	<h3 className="font-semibold text-xs text-gray-700 mb-2">
																		Key
																		Motivation
																	</h3>
																	<p className="text-xs text-gray-600 leading-relaxed">
																		{
																			persona.key_motivation
																		}
																	</p>
																</div>
															)}
															{persona.core_pain_point && (
																<div>
																	<h3 className="font-semibold text-xs text-gray-700 mb-2">
																		Core
																		Pain
																		Point
																	</h3>
																	<p className="text-xs text-gray-600 leading-relaxed">
																		{
																			persona.core_pain_point
																		}
																	</p>
																</div>
															)}
														</div>

														{persona.storyline && (
															<div className="rounded-lg border border-gray-200 bg-slate-50 p-4 sm:p-5 space-y-3 sm:space-y-4">
																<h3 className="font-semibold text-xs text-gray-900 mb-4">
																	Storyline:{' '}
																	{persona
																		.storyline
																		.title ||
																		'Untitled'}
																</h3>
																{persona
																	.storyline
																	.theme && (
																	<div>
																		<h4 className="font-medium text-xs text-gray-700 mb-1">
																			Theme
																		</h4>
																		<p className="text-xs text-gray-600">
																			{
																				persona
																					.storyline
																					.theme
																			}
																		</p>
																	</div>
																)}
																{persona
																	.storyline
																	.arc && (
																	<div className="space-y-3">
																		<h4 className="font-medium text-xs text-gray-700">
																			Story
																			Arc
																		</h4>
																		{persona
																			.storyline
																			.arc
																			.hook && (
																			<div>
																				<span className="text-xs font-semibold text-gray-600">
																					Act
																					I
																					-
																					Hook:
																				</span>
																				<p className="text-xs text-gray-600 mt-1">
																					{
																						persona
																							.storyline
																							.arc
																							.hook
																					}
																				</p>
																			</div>
																		)}
																		{persona
																			.storyline
																			.arc
																			.transformation && (
																			<div>
																				<span className="text-xs font-semibold text-gray-600">
																					Act
																					II
																					-
																					Transformation:
																				</span>
																				<p className="text-xs text-gray-600 mt-1">
																					{
																						persona
																							.storyline
																							.arc
																							.transformation
																					}
																				</p>
																			</div>
																		)}
																		{persona
																			.storyline
																			.arc
																			.outcome && (
																			<div>
																				<span className="text-xs font-semibold text-gray-600">
																					Act
																					III
																					-
																					Outcome:
																				</span>
																				<p className="text-xs text-gray-600 mt-1">
																					{
																						persona
																							.storyline
																							.arc
																							.outcome
																					}
																				</p>
																			</div>
																		)}
																	</div>
																)}
																{persona
																	.storyline
																	.core_message && (
																	<div className="pt-3 border-t border-gray-200">
																		<h4 className="font-medium text-xs text-gray-700 mb-1">
																			Core
																			Message
																		</h4>
																		<p className="text-xs font-medium text-gray-900 italic">
																			"
																			{
																				persona
																					.storyline
																					.core_message
																			}
																			"
																		</p>
																	</div>
																)}
															</div>
														)}

														{persona.growth_strategy && (
															<div className="space-y-3 sm:space-y-4">
																<h3 className="font-semibold text-xs sm:text-sm text-gray-900">
																	Growth
																	Strategy
																</h3>
																{persona
																	.growth_strategy
																	.objective && (
																	<div>
																		<h4 className="font-medium text-[11px] sm:text-xs text-gray-700 mb-1 sm:mb-1.5">
																			Objective
																		</h4>
																		<p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
																			{
																				persona
																					.growth_strategy
																					.objective
																			}
																		</p>
																	</div>
																)}
																{persona
																	.growth_strategy
																	.content_pillars &&
																	persona
																		.growth_strategy
																		.content_pillars
																		.length >
																		0 && (
																		<div>
																			<h4 className="font-medium text-[11px] sm:text-xs text-gray-700 mb-2 sm:mb-3">
																				Content
																				Pillars
																			</h4>
																			<div className="flex flex-wrap gap-2 sm:gap-3">
																				{persona.growth_strategy.content_pillars.map(
																					(
																						pillar: string,
																						pIdx: number,
																					) => (
																						<Badge
																							key={
																								pIdx
																							}
																							variant="outline"
																							className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 sm:py-1.5 break-words"
																						>
																							{
																								pillar
																							}
																						</Badge>
																					),
																				)}
																			</div>
																		</div>
																	)}
															</div>
														)}

														{persona.scripts &&
															persona.scripts
																.length > 0 && (
																<div className="space-y-4">
																	<h3 className="font-semibold text-xs text-gray-900">
																		TikTok
																		Scripts
																	</h3>
																	<div className="space-y-4">
																		{persona.scripts.map(
																			(
																				script: any,
																				sIdx: number,
																			) => (
																				<Card
																					key={
																						sIdx
																					}
																					className="p-5 border-gray-200 transition-all hover:shadow-md"
																				>
																					<div className="flex items-start justify-between mb-3">
																						<h4 className="font-semibold text-xs text-gray-900">
																							{script.title ||
																								`Script ${
																									sIdx +
																									1
																								}`}
																						</h4>
																						{script.duration && (
																							<Badge
																								variant="secondary"
																								className="text-xs"
																							>
																								{
																									script.duration
																								}
																							</Badge>
																						)}
																					</div>
																					{script.script && (
																						<div className="mb-4">
																							<p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
																								{
																									script.script
																								}
																							</p>
																						</div>
																					)}
																					{script.cta && (
																						<div className="pt-3 border-t border-gray-200">
																							<span className="text-xs font-medium text-gray-600">
																								CTA:
																							</span>
																							<p className="text-xs text-gray-700 mt-1 font-medium">
																								{
																									script.cta
																								}
																							</p>
																						</div>
																					)}
																				</Card>
																			),
																		)}
																	</div>
																</div>
															)}
													</CardContent>
												</Card>
											</TabsContent>
										),
									)}
								</Tabs>
							</div>
						)}

					{/* Fallback for raw JSON if structure doesn't match */}
					{!parsedResult && result && (
						<Card className="w-full p-4 sm:p-5 bg-slate-50">
							<CardContent className="p-0">
								<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
									<pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-700 leading-relaxed p-4 sm:p-6 md:p-8 overflow-x-auto">
										{result}
									</pre>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			)}
		</div>
	);
}
