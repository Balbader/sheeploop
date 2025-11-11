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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import TikTokIcon from '@/public/social-media.png';
import InstagramIcon from '@/public/instagram.png';
import YouTubeIcon from '@/public/youtube.png';
import LinkedInIcon from '@/public/linkedin.png';
import TwitterIcon from '@/public/twitter.png';
import SnapchatIcon from '@/public/Snapchat.png';
import FacebookIcon from '@/public/facebook.png';

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
		icon: TikTokIcon,
	},
	{
		id: 2,
		name: 'Instagram',
		icon: InstagramIcon,
	},
	{
		id: 3,
		name: 'YouTube',
		icon: YouTubeIcon,
	},
	{
		id: 4,
		name: 'LinkedIn',
		icon: LinkedInIcon,
	},
	{
		id: 5,
		name: 'X (Twitter)',
		icon: TwitterIcon,
	},
	{
		id: 6,
		name: 'Snapchat',
		icon: SnapchatIcon,
	},
	{
		id: 7,
		name: 'Facebook',
		icon: FacebookIcon,
	},
];

const getGenerationSteps = (
	platformName: string = 'TikTok',
	numberOfPersonas: string = '2',
) => {
	const personaCount = numberOfPersonas ? parseInt(numberOfPersonas, 10) : 2;
	const personaText =
		personaCount === 1
			? '1 distinct user profile'
			: `${personaCount} distinct user profiles`;

	return [
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
			description: `Building ${personaText}`,
		},
		{
			id: 5,
			label: 'Building storylines',
			description: `Crafting narrative arcs for ${personaCount} ${
				personaCount === 1 ? 'persona' : 'personas'
			}`,
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
};

export function GenerateMarketingStrategyForm() {
	const [result, setResult] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [remainingTime, setRemainingTime] = useState(300); // 5 minutes
	const [selectedPlatform, setSelectedPlatform] = useState<string>('TikTok');
	const [selectedDevice, setSelectedDevice] = useState<string>('');
	const [selectedTones, setSelectedTones] = useState<string[]>([]);
	const [selectedObjective, setSelectedObjective] = useState<string>('');
	const [numberOfPersonas, setNumberOfPersonas] = useState<string>('');
	const [tonePopoverOpen, setTonePopoverOpen] = useState(false);
	const [insightsExpanded, setInsightsExpanded] = useState(true);
	const [ifpExpanded, setIfpExpanded] = useState(true);
	const sheepContainerRef = useRef<HTMLDivElement>(null);
	const animationRefs = useRef<any[]>([]);
	const messageTimersRef = useRef<NodeJS.Timeout[]>([]);
	const formRef = useRef<HTMLFormElement>(null);
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const resultCardsAnimatedRef = useRef(false);

	// Generate steps dynamically based on selected platform and number of personas
	const GENERATION_STEPS = useMemo(
		() => getGenerationSteps(selectedPlatform, numberOfPersonas),
		[selectedPlatform, numberOfPersonas],
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
		setSelectedPlatform('TikTok');
		setSelectedDevice('');
		setSelectedTones([]);
		setSelectedObjective('');
		setNumberOfPersonas('');
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

	// Get platform info based on selected platform
	const selectedPlatformInfo = useMemo(() => {
		return (
			targetPlatforms.find(
				(platform) => platform.name === selectedPlatform,
			) || targetPlatforms[0]
		); // Fallback to TikTok
	}, [selectedPlatform]);

	const getScoreColor = (score: number) => {
		if (score >= 8) return 'bg-green-500';
		if (score >= 6) return 'bg-yellow-500';
		return 'bg-orange-500';
	};

	const progressPercentage = (currentStep / GENERATION_STEPS.length) * 100;

	// GSAP animations for form entrance
	useEffect(() => {
		if (typeof window === 'undefined' || isLoading) return;

		(async () => {
			try {
				const { gsap } = await import('gsap');

				// Animate form sections with stagger (only when form is visible)
				if (!parsedResult) {
					// Reset animation flag when results are cleared
					resultCardsAnimatedRef.current = false;
					const sections = sectionRefs.current.filter(Boolean);
					if (sections.length > 0) {
						gsap.set(sections, {
							opacity: 0,
							y: 20,
							scale: 0.98,
						});

						gsap.to(sections, {
							opacity: 1,
							y: 0,
							scale: 1,
							duration: 0.6,
							ease: 'power3.out',
							stagger: 0.1,
							delay: 0.2,
						});
					}

					// Animate main form card
					const mainCard = cardRefs.current[0];
					if (mainCard) {
						gsap.set(mainCard, {
							opacity: 0,
							scale: 0.95,
							y: 20,
						});

						gsap.to(mainCard, {
							opacity: 1,
							scale: 1,
							y: 0,
							duration: 0.6,
							ease: 'back.out(1.2)',
							delay: 0.1,
						});
					}
				}

				// Animate result cards with subtle entrance (only once)
				if (parsedResult && !resultCardsAnimatedRef.current) {
					resultCardsAnimatedRef.current = true;
					const cards = cardRefs.current.filter(Boolean);
					if (cards.length > 0) {
						gsap.set(cards, {
							opacity: 0,
							scale: 0.95,
							y: 20,
						});

						gsap.to(cards, {
							opacity: 1,
							scale: 1,
							y: 0,
							duration: 0.6,
							ease: 'back.out(1.2)',
							stagger: 0.1,
							delay: 0.2,
						});

						// Add subtle continuous float animation to result cards
						cards.forEach((card, index) => {
							if (card) {
								gsap.to(card, {
									y: -3,
									duration: 2.5 + index * 0.3,
									ease: 'sine.inOut',
									repeat: -1,
									yoyo: true,
									delay: 1.5 + index * 0.2,
								});
							}
						});
					}
				}
			} catch (error) {
				console.error('Failed to load GSAP:', error);
			}
		})();
	}, [isLoading, parsedResult]);

	return (
		<div className="w-full space-y-4 sm:space-y-6 relative py-8 md:py-12">
			{/* Raining Sheep Background */}
			{isLoading && (
				<div
					ref={sheepContainerRef}
					className="fixed inset-0 overflow-hidden"
					style={{ zIndex: 50 }}
				/>
			)}

			{/* Loading Progress */}
			{isLoading && (
				<Card className="w-full max-w-4xl mx-auto p-4 sm:p-5 transition-all border border-gray-200 bg-white shadow-lg">
					<CardHeader className="p-0 pb-4">
						<div className="flex items-center gap-2">
							<Spinner className="w-4 h-4 text-green-600" />
							<CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
								Generating Your Community Fit{' '}
								<span className="text-green-600">
									Storyline
								</span>
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
				<Card
					ref={(el) => {
						cardRefs.current[0] = el;
					}}
					className="w-full max-w-4xl mx-auto p-4 sm:p-5 md:p-6 transition-all hover:shadow-xl hover:-translate-y-1 border border-gray-200 bg-white"
				>
					<form
						ref={formRef}
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
						<div
							ref={(el) => {
								sectionRefs.current[0] = el;
							}}
							className="space-y-3 sm:space-y-4"
						>
							<h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-gray-900">
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

							<div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
												I want to get traction towards
												my site
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
												I want to engage with my
												community
											</SelectItem>
											<SelectItem value="I want to launch a new product or service">
												I want to launch a new product
												or service
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
													selectedObjective ===
													'Other'
												}
												className="text-sm"
											/>
										</div>
									)}
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="number_of_personas"
										className="text-xs sm:text-sm"
									>
										Number of Personas *
									</Label>
									<Select
										name="number_of_personas"
										value={numberOfPersonas}
										onValueChange={setNumberOfPersonas}
										required
									>
										<SelectTrigger>
											<SelectValue placeholder="Select number of personas" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">
												1 Persona
											</SelectItem>
											<SelectItem value="2">
												2 Personas
											</SelectItem>
											<SelectItem value="3" disabled>
												3 Personas (Coming Soon)
											</SelectItem>
											<SelectItem value="4" disabled>
												4 Personas (Coming Soon)
											</SelectItem>
											<SelectItem value="5" disabled>
												5 Personas (Coming Soon)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
						<Separator className="my-6" />

						{/* Platform & Timeline */}
						<div
							ref={(el) => {
								sectionRefs.current[1] = el;
							}}
							className="space-y-3 sm:space-y-4"
						>
							<h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-gray-900">
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

						<div
							ref={(el) => {
								sectionRefs.current[2] = el;
							}}
							className="space-y-2"
						>
							<Label
								htmlFor="tone"
								className="text-sm sm:text-base font-medium text-gray-900"
							>
								Tone & Style *{' '}
								<span className="text-gray-500 font-normal text-xs">
									(Select up to 2)
								</span>
							</Label>
							<Popover
								open={tonePopoverOpen}
								onOpenChange={setTonePopoverOpen}
							>
								<PopoverTrigger asChild>
									<Button
										type="button"
										variant="outline"
										className="w-full justify-between text-left font-normal"
									>
										<span className="truncate">
											{selectedTones.length === 0
												? 'Select tone & style'
												: selectedTones.length === 1
												? selectedTones[0]
												: `${selectedTones.length} selected`}
										</span>
										<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-[var(--radix-popover-trigger-width)] p-0"
									align="start"
								>
									<div className="max-h-[300px] overflow-y-auto p-2">
										<div className="space-y-1">
											{[
												'Friendly, motivational, and slightly humorous',
												'Professional and authoritative',
												'Casual and conversational',
												'Energetic and enthusiastic',
												'Calm and educational',
												'Witty and entertaining',
												'Inspirational and uplifting',
												'Direct and no-nonsense',
											].map((tone) => (
												<label
													key={tone}
													className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors"
												>
													<Checkbox
														checked={selectedTones.includes(
															tone,
														)}
														onCheckedChange={(
															checked,
														) => {
															if (checked) {
																if (
																	selectedTones.length <
																	2
																) {
																	setSelectedTones(
																		[
																			...selectedTones,
																			tone,
																		],
																	);
																}
															} else {
																setSelectedTones(
																	selectedTones.filter(
																		(t) =>
																			t !==
																			tone,
																	),
																);
															}
														}}
														disabled={
															!selectedTones.includes(
																tone,
															) &&
															selectedTones.length >=
																2
														}
													/>
													<span className="text-sm flex-1">
														{tone}
													</span>
												</label>
											))}
											<label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors">
												<Checkbox
													checked={selectedTones.includes(
														'Other',
													)}
													onCheckedChange={(
														checked,
													) => {
														if (checked) {
															if (
																selectedTones.length <
																2
															) {
																setSelectedTones(
																	[
																		...selectedTones,
																		'Other',
																	],
																);
															}
														} else {
															setSelectedTones(
																selectedTones.filter(
																	(t) =>
																		t !==
																		'Other',
																),
															);
														}
													}}
													disabled={
														!selectedTones.includes(
															'Other',
														) &&
														selectedTones.length >=
															2
													}
												/>
												<span className="text-sm">
													Other
												</span>
											</label>
										</div>
										{selectedTones.length > 0 && (
											<div className="border-t p-2 mt-2">
												<div className="flex items-center justify-between text-xs text-gray-500 mb-2">
													<span>
														{selectedTones.length}{' '}
														of 2 selected
													</span>
													{selectedTones.length >
														0 && (
														<button
															type="button"
															onClick={() => {
																setSelectedTones(
																	[],
																);
															}}
															className="text-red-500 hover:text-red-700 flex items-center gap-1"
														>
															<X className="h-3 w-3" />
															Clear
														</button>
													)}
												</div>
												<div className="flex flex-wrap gap-1">
													{selectedTones.map(
														(tone) => (
															<Badge
																key={tone}
																variant="secondary"
																className="text-xs"
															>
																{tone}
																<button
																	type="button"
																	onClick={() => {
																		setSelectedTones(
																			selectedTones.filter(
																				(
																					t,
																				) =>
																					t !==
																					tone,
																			),
																		);
																	}}
																	className="ml-1 hover:text-red-500"
																>
																	<X className="h-3 w-3" />
																</button>
															</Badge>
														),
													)}
												</div>
											</div>
										)}
									</div>
								</PopoverContent>
							</Popover>
							{selectedTones.length > 0 && (
								<div className="text-xs text-gray-500">
									{selectedTones.length} of 2 selected
								</div>
							)}
							{selectedTones.includes('Other') && (
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
										required={selectedTones.includes(
											'Other',
										)}
										className="text-sm"
									/>
								</div>
							)}
							{/* Hidden inputs for form submission */}
							{selectedTones.map((tone, index) => (
								<input
									key={index}
									type="hidden"
									name={`tone_${index}`}
									value={tone}
								/>
							))}
						</div>

						<Separator />

						{/* Actions */}
						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							<Button
								type="submit"
								disabled={isLoading}
								className="relative rounded-full px-6 py-3 text-sm font-semibold bg-black hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 text-white hover:font-bold shadow-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 overflow-hidden group flex-1 sm:flex-none w-full sm:w-auto min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{/* Animated shine effect */}
								<span
									aria-hidden
									className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none"
								/>
								<span className="relative">
									{isLoading
										? 'Generating...'
										: 'Generate Storyline'}
								</span>
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={handleReset}
								className="rounded-full px-5 py-3 text-sm hover:font-bold hover:bg-green-500 hover:text-white transition-all duration-300 flex-1 sm:flex-none w-full sm:w-auto min-h-[44px]"
							>
								Reset Form
							</Button>
						</div>
					</form>
				</Card>
			)}

			{/* Results Section */}
			{parsedResult && (
				<div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8">
					{/* Enhanced Header */}
					<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-green-100/50 p-8 sm:p-10 md:p-12 mb-8">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-100/20 via-transparent to-transparent"></div>
						<div className="relative text-center">
							<div className="flex items-center justify-center gap-4 mb-4">
								{selectedPlatformInfo && (
									<div className="relative">
										<div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50"></div>
										<Image
											src={selectedPlatformInfo.icon}
											alt={selectedPlatformInfo.name}
											width={56}
											height={56}
											className="relative w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-lg"
										/>
									</div>
								)}
								<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
									Your Community Fit{' '}
									<span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
										Storyline
									</span>
								</h2>
							</div>
							<p className="text-gray-700 text-base sm:text-lg font-medium">
								Your personalized{' '}
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-green-200/50 text-green-700 font-semibold shadow-sm">
									{selectedPlatformInfo?.name}
								</span>{' '}
								content strategy is ready
							</p>
						</div>
					</div>

					{/* Community Market Fit Scores */}
					{parsedResult.community_market_fit && (
						<Card
							ref={(el) => {
								cardRefs.current[1] = el;
							}}
							className="w-full p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-green-100/50 border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50/50 shadow-lg"
						>
							<CardHeader className="p-0 pb-6">
								<div className="flex items-center gap-3">
									<div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
										<svg
											className="w-5 h-5 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
											/>
										</svg>
									</div>
									<CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
										Community Market Fit Assessment
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent className="p-0 space-y-6">
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
									{Object.entries(
										parsedResult.community_market_fit
											.score || {},
									).map(([key, value]) => (
										<div
											key={key}
											className="group flex flex-col items-center p-4 sm:p-5 rounded-xl border-2 border-gray-100 bg-white hover:border-green-200 hover:shadow-lg transition-all duration-300"
										>
											<div className="text-[10px] sm:text-xs font-semibold text-gray-600 mb-3 text-center capitalize leading-tight">
												{key.replace(/_/g, ' ')}
											</div>
											<div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
												<svg
													className="transform -rotate-90 w-full h-full drop-shadow-sm"
													viewBox="0 0 36 36"
													preserveAspectRatio="xMidYMid meet"
												>
													<path
														className="text-gray-100"
														stroke="currentColor"
														strokeWidth="3.5"
														fill="none"
														d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
													/>
													<path
														className={getScoreColor(
															value as number,
														)}
														stroke="currentColor"
														strokeWidth="3.5"
														strokeLinecap="round"
														strokeDasharray={`${
															(value as number) *
															10
														}, 100`}
														fill="none"
														d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
													/>
												</svg>
												<div className="absolute inset-0 flex items-center justify-center">
													<span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
														{value as number}
														<span className="text-xs sm:text-sm text-gray-500 font-normal">
															/10
														</span>
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
								{parsedResult.community_market_fit.summary && (
									<div className="space-y-2 mt-6 pt-6 border-t-2 border-gray-100">
										<button
											type="button"
											onClick={() =>
												setInsightsExpanded(
													!insightsExpanded,
												)
											}
											className="flex items-center justify-between w-full text-left group"
										>
											<div className="flex items-center gap-3">
												<div className="p-1.5 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
													<svg
														className="w-4 h-4 text-green-700"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
														/>
													</svg>
												</div>
												<h3 className="font-bold text-sm sm:text-base text-gray-900">
													Key Insights
												</h3>
											</div>
											{insightsExpanded ? (
												<ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
											) : (
												<ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
											)}
										</button>
										{insightsExpanded && (
											<ul className="space-y-3 mt-4">
												{parsedResult.community_market_fit.summary.map(
													(
														item: string,
														idx: number,
													) => (
														<li
															key={idx}
															className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed break-words p-3 rounded-lg bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-green-100/50"
														>
															<div className="flex-shrink-0 mt-0.5 w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-600"></div>
															<span className="flex-1">
																{item}
															</span>
														</li>
													),
												)}
											</ul>
										)}
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* IFC Profile */}
					{parsedResult.ifc_profile && (
						<Card
							ref={(el) => {
								cardRefs.current[2] = el;
							}}
							className="w-full p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-blue-100/50 border-2 border-gray-100 bg-gradient-to-br from-white to-blue-50/30 shadow-lg"
						>
							<CardHeader className="p-0 pb-6">
								<button
									type="button"
									onClick={() => setIfpExpanded(!ifpExpanded)}
									className="flex items-center justify-between w-full text-left group"
								>
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
											<svg
												className="w-5 h-5 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
										</div>
										<CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
											Ideal Follower Profile (IFP)
										</CardTitle>
									</div>
									{ifpExpanded ? (
										<ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
									) : (
										<ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
									)}
								</button>
							</CardHeader>
							{ifpExpanded && (
								<CardContent className="p-0 space-y-5">
									{[
										{
											label: 'Demographics',
											value: parsedResult.ifc_profile
												.demographics,
											icon: '👥',
										},
										{
											label: 'Psychographics',
											value: parsedResult.ifc_profile
												.psychographics,
											icon: '🧠',
										},
										{
											label: 'Pain Points',
											value: parsedResult.ifc_profile
												.pain_points,
											icon: '💔',
										},
										{
											label: 'Triggers',
											value: parsedResult.ifc_profile
												.triggers,
											icon: '⚡',
										},
										{
											label: 'Community Behaviors',
											value: parsedResult.ifc_profile
												.community_behaviors,
											icon: '🤝',
										},
									].map((section) => (
										<div
											key={section.label}
											className="p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100/50 hover:border-blue-200 transition-colors"
										>
											<div className="flex items-center gap-2 mb-2.5">
												<span className="text-lg">
													{section.icon}
												</span>
												<h3 className="font-bold text-sm sm:text-base text-gray-900">
													{section.label}
												</h3>
											</div>
											<p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words pl-7">
												{section.value ||
													'Not provided'}
											</p>
										</div>
									))}
								</CardContent>
							)}
						</Card>
					)}

					{/* Personas */}
					{parsedResult.personas &&
						parsedResult.personas.length > 0 && (
							<div className="w-full space-y-6 sm:space-y-8">
								<div className="text-center">
									<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 mb-3">
										<span className="text-lg">🎯</span>
										<h2 className="text-base sm:text-lg font-bold text-gray-900">
											Personas & Strategies
										</h2>
									</div>
								</div>
								<Tabs
									defaultValue="persona-0"
									className="w-full"
								>
									<TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto p-1.5 gap-2 overflow-x-auto bg-gray-100/50 rounded-xl border border-gray-200">
										{parsedResult.personas.map(
											(persona: any, idx: number) => (
												<TabsTrigger
													key={idx}
													value={`persona-${idx}`}
													className="text-[10px] sm:text-xs md:text-sm py-2.5 min-h-[44px] font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
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
												className="mt-6 sm:mt-8 space-y-6"
											>
												<Card
													ref={(el) => {
														cardRefs.current[
															3 + idx
														] = el;
													}}
													className="w-full p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-purple-100/50 border-2 border-gray-100 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 shadow-lg"
												>
													<CardHeader className="p-0 pb-6">
														<div className="flex items-start justify-between gap-4">
															<div className="flex-1">
																<div className="flex items-center gap-3 mb-3">
																	<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
																		<svg
																			className="w-5 h-5 text-white"
																			fill="none"
																			viewBox="0 0 24 24"
																			stroke="currentColor"
																		>
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth={
																					2
																				}
																				d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
																			/>
																		</svg>
																	</div>
																	<CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
																		{persona.name ||
																			`Persona ${
																				idx +
																				1
																			}`}
																	</CardTitle>
																</div>
																{persona.segment && (
																	<Badge
																		variant="secondary"
																		className="mt-2 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200/50"
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
															<div className="rounded-2xl border-2 border-purple-200/50 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-rose-50/30 p-6 sm:p-8 shadow-lg">
																<div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-purple-200/30">
																	<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-md">
																		<span className="text-2xl">
																			📝
																		</span>
																	</div>
																	<h3 className="font-bold text-lg sm:text-xl text-gray-900">
																		Description
																	</h3>
																</div>
																<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-100/50 shadow-sm">
																	<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
																		{
																			persona.description
																		}
																	</p>
																</div>
															</div>
														)}

														<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
															{persona.key_motivation && (
																<div className="rounded-2xl border-2 border-amber-200/50 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/30 p-6 sm:p-8 shadow-lg">
																	<div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-amber-200/30">
																		<div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
																			<span className="text-2xl">
																				💪
																			</span>
																		</div>
																		<h3 className="font-bold text-base sm:text-lg text-gray-900">
																			Key
																			Motivation
																		</h3>
																	</div>
																	<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-100/50 shadow-sm">
																		<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
																			{
																				persona.key_motivation
																			}
																		</p>
																	</div>
																</div>
															)}
															{persona.core_pain_point && (
																<div className="rounded-2xl border-2 border-red-200/50 bg-gradient-to-br from-red-50/50 via-rose-50/30 to-pink-50/30 p-6 sm:p-8 shadow-lg">
																	<div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-red-200/30">
																		<div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-md">
																			<span className="text-2xl">
																				💔
																			</span>
																		</div>
																		<h3 className="font-bold text-base sm:text-lg text-gray-900">
																			Core
																			Pain
																			Point
																		</h3>
																	</div>
																	<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-red-100/50 shadow-sm">
																		<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
																			{
																				persona.core_pain_point
																			}
																		</p>
																	</div>
																</div>
															)}
														</div>

														{persona.storyline && (
															<div className="rounded-2xl border-2 border-indigo-200/50 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/30 p-6 sm:p-8 space-y-6 shadow-lg">
																<div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-indigo-200/30">
																	<div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
																		<span className="text-2xl">
																			🎬
																		</span>
																	</div>
																	<div>
																		<h3 className="font-bold text-lg sm:text-xl text-gray-900">
																			Storyline
																		</h3>
																		<p className="text-sm sm:text-base font-semibold text-indigo-700 mt-0.5">
																			{persona
																				.storyline
																				.title ||
																				'Untitled'}
																		</p>
																	</div>
																</div>

																{persona
																	.storyline
																	.theme && (
																	<div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-indigo-100/50 shadow-sm">
																		<div className="flex items-center gap-2 mb-2.5">
																			<span className="text-lg">
																				🎨
																			</span>
																			<h4 className="font-bold text-sm sm:text-base text-gray-900">
																				Theme
																			</h4>
																		</div>
																		<p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-6">
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
																	<div className="space-y-4">
																		<h4 className="font-bold text-base sm:text-lg text-gray-900 mb-4 flex items-center gap-2">
																			<span>
																				📖
																			</span>
																			Story
																			Arc
																		</h4>
																		<div className="space-y-4">
																			{persona
																				.storyline
																				.arc
																				.hook && (
																				<div className="relative pl-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50/50 to-cyan-50/30 p-4 rounded-r-xl">
																					<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center">
																						<span className="text-xs font-bold text-white">
																							I
																						</span>
																					</div>
																					<h5 className="font-bold text-sm sm:text-base text-blue-900 mb-2">
																						Act
																						I
																						-
																						Hook
																					</h5>
																					<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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
																				<div className="relative pl-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50/50 to-pink-50/30 p-4 rounded-r-xl">
																					<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-purple-500 border-4 border-white shadow-md flex items-center justify-center">
																						<span className="text-xs font-bold text-white">
																							II
																						</span>
																					</div>
																					<h5 className="font-bold text-sm sm:text-base text-purple-900 mb-2">
																						Act
																						II
																						-
																						Transformation
																					</h5>
																					<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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
																				<div className="relative pl-6 border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50/50 to-teal-50/30 p-4 rounded-r-xl">
																					<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-md flex items-center justify-center">
																						<span className="text-xs font-bold text-white">
																							III
																						</span>
																					</div>
																					<h5 className="font-bold text-sm sm:text-base text-emerald-900 mb-2">
																						Act
																						III
																						-
																						Outcome
																					</h5>
																					<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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
																	</div>
																)}

																{persona
																	.storyline
																	.core_message && (
																	<div className="pt-5 mt-5 border-t-2 border-indigo-200/50">
																		<div className="p-5 rounded-xl bg-gradient-to-br from-indigo-100/50 to-purple-100/30 border-2 border-indigo-200/50 shadow-sm">
																			<div className="flex items-center gap-2 mb-3">
																				<span className="text-xl">
																					💬
																				</span>
																				<h4 className="font-bold text-sm sm:text-base text-gray-900">
																					Core
																					Message
																				</h4>
																			</div>
																			<div className="pl-7">
																				<p className="text-sm sm:text-base font-semibold text-gray-900 italic leading-relaxed relative">
																					<span className="absolute -left-2 text-3xl text-indigo-300/50 leading-none">
																						"
																					</span>
																					<span className="relative z-10">
																						{
																							persona
																								.storyline
																								.core_message
																						}
																					</span>
																					<span className="text-3xl text-indigo-300/50 leading-none">
																						"
																					</span>
																				</p>
																			</div>
																		</div>
																	</div>
																)}
															</div>
														)}

														{persona.growth_strategy && (
															<div className="rounded-2xl border-2 border-teal-200/50 bg-gradient-to-br from-teal-50/50 via-cyan-50/30 to-blue-50/30 p-6 sm:p-8 space-y-6 shadow-lg">
																<div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-teal-200/30">
																	<div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md">
																		<span className="text-2xl">
																			📈
																		</span>
																	</div>
																	<h3 className="font-bold text-lg sm:text-xl text-gray-900">
																		Growth
																		Strategy
																	</h3>
																</div>

																{persona
																	.growth_strategy
																	.objective && (
																	<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-teal-100/50 shadow-sm">
																		<div className="flex items-center gap-2 mb-3">
																			<span className="text-lg">
																				🎯
																			</span>
																			<h4 className="font-bold text-sm sm:text-base text-gray-900">
																				Objective
																			</h4>
																		</div>
																		<p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-6">
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
																		<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-teal-100/50 shadow-sm">
																			<div className="flex items-center gap-2 mb-4">
																				<span className="text-lg">
																					🏛️
																				</span>
																				<h4 className="font-bold text-sm sm:text-base text-gray-900">
																					Content
																					Pillars
																				</h4>
																			</div>
																			<div className="flex flex-wrap gap-3 pl-6">
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
																							className="text-xs sm:text-sm px-4 py-2 font-semibold bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border-2 border-teal-200/50 hover:border-teal-300 hover:shadow-md transition-all break-words"
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
																<div className="space-y-5">
																	<div className="flex items-center gap-3 pb-2 border-b-2 border-gray-200">
																		{selectedPlatformInfo && (
																			<div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
																				<Image
																					src={
																						selectedPlatformInfo.icon
																					}
																					alt={
																						selectedPlatformInfo.name
																					}
																					width={
																						24
																					}
																					height={
																						24
																					}
																					className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
																				/>
																			</div>
																		)}
																		<h3 className="font-bold text-lg sm:text-xl text-gray-900">
																			{
																				selectedPlatformInfo?.name
																			}{' '}
																			Scripts
																		</h3>
																	</div>
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
																					className="p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50/50 transition-all hover:shadow-xl hover:border-green-300 hover:-translate-y-1 shadow-md"
																				>
																					<div className="flex items-start justify-between mb-4">
																						<h4 className="font-bold text-base sm:text-lg text-gray-900">
																							{script.title ||
																								`Script ${
																									sIdx +
																									1
																								}`}
																						</h4>
																						{script.duration && (
																							<Badge
																								variant="secondary"
																								className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200/50"
																							>
																								{
																									script.duration
																								}
																							</Badge>
																						)}
																					</div>
																					{script.script && (
																						<div className="mb-5 p-4 rounded-lg bg-gray-50/50 border border-gray-100">
																							<p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
																								{
																									script.script
																								}
																							</p>
																						</div>
																					)}
																					{script.cta && (
																						<div className="pt-4 border-t-2 border-gray-200">
																							<span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
																								Call
																								to
																								Action:
																							</span>
																							<p className="text-sm sm:text-base text-gray-900 mt-2 font-semibold bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
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
						<Card className="w-full p-4 sm:p-5 bg-slate-50 border border-gray-200">
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
