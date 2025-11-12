'use client';

/**
 * GenerateMarketingStrategyForm Component
 *
 * A comprehensive form component for generating personalized marketing strategies.
 * This component handles the complete workflow from idea analysis to final strategy
 * compilation, including community market fit assessment, ideal follower profiling,
 * persona generation, storyline creation, and platform-specific script generation
 * for various social media platforms (TikTok, Instagram, YouTube, LinkedIn, etc.).
 * Features include multi-step progress tracking, real-time generation updates,
 * and downloadable strategy plans.
 */

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
import {
	CheckCircle2,
	Circle,
	ChevronDown,
	ChevronUp,
	X,
	Download,
	AlertTriangle,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import TikTokIcon from '@/public/social-media.png';
import InstagramIcon from '@/public/instagram.png';
import YouTubeIcon from '@/public/youtube.png';
import LinkedInIcon from '@/public/linkedin.png';
import TwitterIcon from '@/public/twitter.png';
import SnapchatIcon from '@/public/Snapchat.png';
import FacebookIcon from '@/public/facebook.png';
import { CommunityMarketFitAssessment } from './CommunityMarketFitAssessment';
import { IdealFollowerProfile } from './IdealFollowerProfile';
import { PersonasSection } from './PersonasSection';

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

interface GenerateMarketingStrategyFormProps {
	username?: string;
	onOutputGenerated?: (hasOutput: boolean) => void;
}

export function GenerateMarketingStrategyForm({
	username,
	onOutputGenerated,
}: GenerateMarketingStrategyFormProps = {}) {
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
	const [hasDownloadedPlan, setHasDownloadedPlan] = useState(false);
	const [personaSectionsExpanded, setPersonaSectionsExpanded] = useState<
		Record<
			string,
			{
				description: boolean;
				keyMotivation: boolean;
				corePainPoint: boolean;
				storyline: boolean;
				growthStrategy: boolean;
			}
		>
	>({});
	const sheepContainerRef = useRef<HTMLDivElement>(null);
	const animationRefs = useRef<any[]>([]);
	const messageTimersRef = useRef<NodeJS.Timeout[]>([]);
	const formRef = useRef<HTMLFormElement>(null);
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const resultCardsAnimatedRef = useRef(false);
	const downloadButtonRef = useRef<HTMLButtonElement>(null);
	const downloadButtonAnimatedRef = useRef(false);

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
		setHasDownloadedPlan(false); // Reset download state for new generation
		setIsLoading(true);
		try {
			const res = await getCommunityFitStoryline(formData, username);
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
		setHasDownloadedPlan(false);
		downloadButtonAnimatedRef.current = false; // Reset animation flag
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

	// Notify parent when output is generated
	useEffect(() => {
		if (onOutputGenerated) {
			onOutputGenerated(!!parsedResult);
		}
	}, [parsedResult, onOutputGenerated]);

	// Scroll to top when output is generated
	useEffect(() => {
		if (parsedResult && !isLoading) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}, [parsedResult, isLoading]);

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

		let cleanupFunctions: (() => void)[] = [];

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

					// Animate download button with cool effects
					if (
						downloadButtonRef.current &&
						!downloadButtonAnimatedRef.current
					) {
						downloadButtonAnimatedRef.current = true;
						const button = downloadButtonRef.current;

						// Initial state
						gsap.set(button, {
							opacity: 0,
							scale: 0.5,
							rotation: -180,
							y: 50,
						});

						// Entrance animation with bounce and rotation
						const entranceTimeline = gsap.timeline({ delay: 0.8 });
						entranceTimeline
							.to(button, {
								opacity: 1,
								scale: 1.2,
								rotation: 0,
								y: 0,
								duration: 0.8,
								ease: 'back.out(2)',
							})
							.to(button, {
								scale: 1,
								duration: 0.3,
								ease: 'power2.out',
							});

						// Continuous subtle pulse animation
						gsap.to(button, {
							scale: 1.05,
							duration: 2,
							ease: 'sine.inOut',
							repeat: -1,
							yoyo: true,
							delay: 2,
						});

						// Hover animations
						const handleMouseEnter = () => {
							gsap.to(button, {
								scale: 1.1,
								rotation: 5,
								boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)',
								duration: 0.3,
								ease: 'power2.out',
							});
						};

						const handleMouseLeave = () => {
							gsap.to(button, {
								scale: 1,
								rotation: 0,
								boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
								duration: 0.3,
								ease: 'power2.out',
							});
						};

						// Click animation
						const handleClick = () => {
							const clickTimeline = gsap.timeline();
							clickTimeline
								.to(button, {
									scale: 0.95,
									rotation: -10,
									duration: 0.1,
									ease: 'power2.in',
								})
								.to(button, {
									scale: 1.1,
									rotation: 10,
									duration: 0.2,
									ease: 'power2.out',
								})
								.to(button, {
									scale: 1,
									rotation: 0,
									duration: 0.2,
									ease: 'power2.out',
								});
						};

						button.addEventListener('mouseenter', handleMouseEnter);
						button.addEventListener('mouseleave', handleMouseLeave);
						button.addEventListener('mousedown', handleClick);

						// Store cleanup function
						cleanupFunctions.push(() => {
							button.removeEventListener(
								'mouseenter',
								handleMouseEnter,
							);
							button.removeEventListener(
								'mouseleave',
								handleMouseLeave,
							);
							button.removeEventListener(
								'mousedown',
								handleClick,
							);
						});
					}
				}
			} catch (error) {
				console.error('Failed to load GSAP:', error);
			}
		})();

		// Cleanup function
		return () => {
			cleanupFunctions.forEach((cleanup) => cleanup());
		};
	}, [isLoading, parsedResult]);

	return (
		<>
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
						className="w-full max-w-5xl mx-auto p-6 sm:p-8 md:p-10 transition-all hover:shadow-2xl hover:-translate-y-1 border border-gray-200/80 bg-gradient-to-br from-white via-green-50/30 to-white shadow-lg backdrop-blur-sm"
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
							className="space-y-6 sm:space-y-8"
						>
							{/* Basic Information */}
							<div
								ref={(el) => {
									sectionRefs.current[0] = el;
								}}
								className="space-y-4 sm:space-y-5 relative"
							>
								<div className="relative">
									<div className="absolute inset-0 bg-gradient-to-r from-green-100/50 via-emerald-100/30 to-teal-100/50 rounded-2xl blur-xl opacity-60"></div>
									<div className="relative bg-gradient-to-br from-green-50/80 via-white to-emerald-50/40 rounded-2xl p-5 sm:p-6 border border-green-100/50 shadow-sm">
										<h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent flex items-center gap-2">
											<span className="text-2xl">✨</span>
											Basic Information
										</h2>

										<div className="space-y-4">
											<div className="space-y-2.5">
												<Label
													htmlFor="idea"
													className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2"
												>
													<span className="text-green-600">
														💡
													</span>
													Your Idea{' '}
													<span className="text-red-500">
														*
													</span>
												</Label>
												<Textarea
													id="idea"
													name="idea"
													placeholder="Describe your idea or concept in detail..."
													required
													className="min-h-24 sm:min-h-28 text-sm sm:text-base border-gray-300 bg-white/80 focus:bg-white focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 placeholder:text-gray-400 rounded-lg shadow-sm hover:shadow-md"
												/>
											</div>

											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
												<div className="space-y-2.5">
													<Label
														htmlFor="objective"
														className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2"
													>
														<span className="text-green-600">
															🎯
														</span>
														Your Objective/Goal{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<Select
														name="objective"
														value={
															selectedObjective
														}
														onValueChange={
															setSelectedObjective
														}
														required
													>
														<SelectTrigger className="w-full h-11 border-gray-300 bg-white/80 focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 hover:bg-white hover:shadow-md rounded-lg">
															<SelectValue placeholder="Select your objective/goal" />
														</SelectTrigger>
														<SelectContent className="rounded-lg border-gray-200 shadow-xl">
															<SelectItem value="I want to promote a product">
																I want to
																promote a
																product
															</SelectItem>
															<SelectItem value="I want to grow my followers base">
																I want to grow
																my followers
																base
															</SelectItem>
															<SelectItem value="I want to get traction towards my site">
																I want to get
																traction towards
																my site
															</SelectItem>
															<SelectItem value="I want to build brand awareness">
																I want to build
																brand awareness
															</SelectItem>
															<SelectItem value="I want to drive sales and conversions">
																I want to drive
																sales and
																conversions
															</SelectItem>
															<SelectItem value="I want to establish thought leadership">
																I want to
																establish
																thought
																leadership
															</SelectItem>
															<SelectItem value="I want to engage with my community">
																I want to engage
																with my
																community
															</SelectItem>
															<SelectItem value="I want to launch a new product or service">
																I want to launch
																a new product or
																service
															</SelectItem>
															<SelectItem value="I want to generate leads">
																I want to
																generate leads
															</SelectItem>
															<SelectItem value="Other">
																Other
															</SelectItem>
														</SelectContent>
													</Select>
													{selectedObjective ===
														'Other' && (
														<div className="space-y-2.5 mt-3">
															<Label
																htmlFor="other_objective"
																className="text-sm font-semibold text-gray-800"
															>
																Custom
																Objective/Goal{' '}
																<span className="text-red-500">
																	*
																</span>
															</Label>
															<Input
																id="other_objective"
																name="other_objective"
																placeholder="Describe your objective/goal"
																required={
																	selectedObjective ===
																	'Other'
																}
																className="text-sm h-11 border-gray-300 bg-white/80 focus:bg-white focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
															/>
														</div>
													)}
												</div>

												<div className="space-y-2.5">
													<Label
														htmlFor="number_of_personas"
														className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2"
													>
														<span className="text-green-600">
															👥
														</span>
														Number of Personas{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<Select
														name="number_of_personas"
														value={numberOfPersonas}
														onValueChange={
															setNumberOfPersonas
														}
														required
													>
														<SelectTrigger className="w-full h-11 border-gray-300 bg-white/80 focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 hover:bg-white hover:shadow-md rounded-lg">
															<SelectValue placeholder="Select number of personas" />
														</SelectTrigger>
														<SelectContent className="rounded-lg border-gray-200 shadow-xl">
															<SelectItem value="1">
																1 Persona
															</SelectItem>
															<SelectItem value="2">
																2 Personas
															</SelectItem>
															<SelectItem
																value="3"
																disabled
															>
																3 Personas
																(Coming Soon)
															</SelectItem>
															<SelectItem
																value="4"
																disabled
															>
																4 Personas
																(Coming Soon)
															</SelectItem>
															<SelectItem
																value="5"
																disabled
															>
																5 Personas
																(Coming Soon)
															</SelectItem>
														</SelectContent>
													</Select>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<Separator className="my-8 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

							{/* Platform & Timeline */}
							<div
								ref={(el) => {
									sectionRefs.current[1] = el;
								}}
								className="space-y-4 sm:space-y-5 relative"
							>
								<div className="relative">
									<div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-cyan-100/30 to-teal-100/50 rounded-2xl blur-xl opacity-60"></div>
									<div className="relative bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/40 rounded-2xl p-5 sm:p-6 border border-blue-100/50 shadow-sm">
										<h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent flex items-center gap-2">
											<span className="text-2xl">📱</span>
											Platform & Timeline
										</h2>

										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
											<div className="space-y-2.5">
												<Label
													htmlFor="target_platforms"
													className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2"
												>
													<span className="text-green-600">
														🌐
													</span>
													Target Platforms{' '}
													<span className="text-red-500">
														*
													</span>
												</Label>
												<Select
													name="target_platforms"
													onValueChange={
														setSelectedPlatform
													}
												>
													<SelectTrigger className="w-full h-11 border-gray-300 bg-white/80 focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 hover:bg-white hover:shadow-md rounded-lg">
														<SelectValue placeholder="Select a platform" />
													</SelectTrigger>
													<SelectContent className="rounded-lg border-gray-200 shadow-xl">
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
															LinkedIn (Coming
															Soon)
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
															X (Twitter) (Coming
															Soon)
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
															Snapchat (Coming
															Soon)
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
															Facebook (Coming
															Soon)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2.5">
												<Label
													htmlFor="posting_frequency"
													className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2"
												>
													<span className="text-green-600">
														📅
													</span>
													Posting Frequency{' '}
													<span className="text-red-500">
														*
													</span>
												</Label>
												<Select name="posting_frequency">
													<SelectTrigger className="w-full h-11 border-gray-300 bg-white/80 focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 hover:bg-white hover:shadow-md rounded-lg">
														<SelectValue placeholder="Select a posting frequency" />
													</SelectTrigger>
													<SelectContent className="rounded-lg border-gray-200 shadow-xl">
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
															3 posts/day (Coming
															Soon)
														</SelectItem>
														<SelectItem
															value="4 posts/day"
															disabled
														>
															4 posts/day (Coming
															Soon)
														</SelectItem>
														<SelectItem
															value="5 posts/day"
															disabled
														>
															5 posts/day (Coming
															Soon)
														</SelectItem>
														<SelectItem
															value="6 posts/day"
															disabled
														>
															6 posts/day (Coming
															Soon)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2.5">
												<Label
													htmlFor="duration"
													className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2"
												>
													<span className="text-green-600">
														⏱️
													</span>
													Duration{' '}
													<span className="text-red-500">
														*
													</span>
												</Label>
												<Select name="duration">
													<SelectTrigger className="w-full h-11 border-gray-300 bg-white/80 focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 hover:bg-white hover:shadow-md rounded-lg">
														<SelectValue placeholder="Select a duration" />
													</SelectTrigger>
													<SelectContent className="rounded-lg border-gray-200 shadow-xl">
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
															3 weeks (Coming
															Soon)
														</SelectItem>
														<SelectItem
															value="4 weeks"
															disabled
														>
															4 weeks (Coming
															Soon)
														</SelectItem>
														<SelectItem
															value="5 weeks"
															disabled
														>
															5 weeks (Coming
															Soon)
														</SelectItem>
														<SelectItem
															value="6 weeks"
															disabled
														>
															6 weeks (Coming
															Soon)
														</SelectItem>
														<SelectItem
															value="7 weeks"
															disabled
														>
															7 weeks (Coming
															Soon)
														</SelectItem>
														<SelectItem
															value="8 weeks"
															disabled
														>
															8 weeks (Coming
															Soon)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2.5">
												<Label
													htmlFor="device"
													className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2"
												>
													<span className="text-green-600">
														📱
													</span>
													Device{' '}
													<span className="text-red-500">
														*
													</span>
												</Label>
												<Select
													name="device"
													value={selectedDevice}
													onValueChange={
														setSelectedDevice
													}
												>
													<SelectTrigger className="w-full h-11 border-gray-300 bg-white/80 focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 hover:bg-white hover:shadow-md rounded-lg">
														<SelectValue placeholder="Select a device" />
													</SelectTrigger>
													<SelectContent className="rounded-lg border-gray-200 shadow-xl">
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
											<div className="space-y-2.5 mt-4">
												<Label
													htmlFor={
														selectedDevice.startsWith(
															'iPhone',
														)
															? 'iphone_device_name'
															: selectedDevice ===
															  'Android'
															? 'android_device_name'
															: 'other_device_name'
													}
													className="text-sm sm:text-base font-semibold text-gray-800 flex items-center gap-2"
												>
													<span className="text-green-600">
														🔧
													</span>
													{selectedDevice.startsWith(
														'iPhone',
													)
														? 'iPhone Device Name'
														: selectedDevice ===
														  'Android'
														? 'Android Device Name'
														: 'Device Name'}{' '}
													<span className="text-red-500">
														*
													</span>
												</Label>
												<Input
													id={
														selectedDevice.startsWith(
															'iPhone',
														)
															? 'iphone_device_name'
															: selectedDevice ===
															  'Android'
															? 'android_device_name'
															: 'other_device_name'
													}
													name={
														selectedDevice.startsWith(
															'iPhone',
														)
															? 'iphone_device_name'
															: selectedDevice ===
															  'Android'
															? 'android_device_name'
															: 'other_device_name'
													}
													placeholder={
														selectedDevice.startsWith(
															'iPhone',
														)
															? `e.g., ${selectedDevice}`
															: selectedDevice ===
															  'Android'
															? 'e.g., Samsung Galaxy S24'
															: 'e.g., iPad Pro, Windows Phone'
													}
													required={
														selectedDevice.startsWith(
															'iPhone',
														) ||
														selectedDevice ===
															'Android' ||
														selectedDevice ===
															'Other'
													}
													className="text-sm h-11 border-gray-300 bg-white/80 focus:bg-white focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
												/>
											</div>
										)}
									</div>
								</div>
							</div>

							<div
								ref={(el) => {
									sectionRefs.current[2] = el;
								}}
								className="space-y-4 sm:space-y-5 relative"
							>
								<div className="relative">
									<div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-pink-100/30 to-rose-100/50 rounded-2xl blur-xl opacity-60"></div>
									<div className="relative bg-gradient-to-br from-purple-50/80 via-white to-pink-50/40 rounded-2xl p-5 sm:p-6 border border-purple-100/50 shadow-sm">
										<Label
											htmlFor="tone"
											className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent flex items-center gap-2"
										>
											<span className="text-2xl">🎨</span>
											Tone & Style{' '}
											<span className="text-sm font-normal text-gray-600">
												(Select up to 2)
											</span>
											<span className="text-gray-500 text-sm font-normal">
												(Optional)
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
													className="w-full h-11 justify-between text-left font-normal border-gray-300 bg-white/80 focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 hover:bg-white hover:shadow-md rounded-lg"
												>
													<span className="truncate">
														{selectedTones.length ===
														0
															? 'Select tone & style'
															: selectedTones.length ===
															  1
															? selectedTones[0]
															: `${selectedTones.length} selected`}
													</span>
													<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent
												className="w-[var(--radix-popover-trigger-width)] p-0 rounded-lg border-gray-200 shadow-xl"
												align="start"
											>
												<div className="max-h-[300px] overflow-y-auto p-3">
													<div className="space-y-1.5">
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
																className="flex items-center gap-3 cursor-pointer hover:bg-green-50/50 p-2.5 rounded-lg transition-all duration-200 hover:shadow-sm border border-transparent hover:border-green-100"
															>
																<Checkbox
																	checked={selectedTones.includes(
																		tone,
																	)}
																	onCheckedChange={(
																		checked,
																	) => {
																		if (
																			checked
																		) {
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
																					(
																						t,
																					) =>
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
																<span className="text-sm flex-1 text-gray-700">
																	{tone}
																</span>
															</label>
														))}
														<label className="flex items-center gap-3 cursor-pointer hover:bg-green-50/50 p-2.5 rounded-lg transition-all duration-200 hover:shadow-sm border border-transparent hover:border-green-100">
															<Checkbox
																checked={selectedTones.includes(
																	'Other',
																)}
																onCheckedChange={(
																	checked,
																) => {
																	if (
																		checked
																	) {
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
																				(
																					t,
																				) =>
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
															<span className="text-sm text-gray-700">
																Other
															</span>
														</label>
													</div>
													{selectedTones.length >
														0 && (
														<div className="border-t border-gray-200 p-3 mt-3 bg-gray-50/50 rounded-lg">
															<div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2.5 font-medium">
																<span>
																	{
																		selectedTones.length
																	}{' '}
																	of 2
																	selected
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
															<div className="flex flex-wrap gap-2">
																{selectedTones.map(
																	(tone) => (
																		<Badge
																			key={
																				tone
																			}
																			variant="secondary"
																			className="text-xs px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
																		>
																			{
																				tone
																			}
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
																				className="ml-1.5 hover:text-red-500 transition-colors"
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
											<div className="text-sm text-gray-600 mt-3 font-medium">
												{selectedTones.length} of 2
												selected
											</div>
										)}
										{selectedTones.includes('Other') && (
											<div className="space-y-2.5 mt-4">
												<Label
													htmlFor="other_tone"
													className="text-sm sm:text-base font-semibold text-gray-800"
												>
													Custom Tone & Style{' '}
													<span className="text-red-500">
														*
													</span>
												</Label>
												<Input
													id="other_tone"
													name="other_tone"
													placeholder="e.g., Friendly, motivational, and slightly humorous"
													required={selectedTones.includes(
														'Other',
													)}
													className="text-sm h-11 border-gray-300 bg-white/80 focus:bg-white focus:border-green-500 focus:ring-green-500/20 focus:ring-4 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
												/>
											</div>
										)}
									</div>
								</div>
							</div>
							{/* Hidden inputs for form submission */}
							{selectedTones.map((tone, index) => (
								<input
									key={index}
									type="hidden"
									name={`tone_${index}`}
									value={tone}
								/>
							))}

							<Separator className="my-8 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

							{/* Actions */}
							<div className="flex flex-col sm:flex-row gap-4 pt-4">
								<Button
									type="submit"
									disabled={isLoading}
									className="relative rounded-full px-8 py-4 text-base font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-green-500 hover:via-green-600 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 overflow-hidden group flex-1 sm:flex-none w-full sm:w-auto min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
								>
									{/* Animated shine effect */}
									<span
										aria-hidden
										className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none"
									/>
									<span className="relative flex items-center justify-center gap-2">
										{isLoading ? (
											<>
												<Spinner className="w-4 h-4" />
												Generating...
											</>
										) : (
											<>
												<span>Generate Storyline</span>
												<span className="text-lg">
													🚀
												</span>
											</>
										)}
									</span>
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={handleReset}
									className="rounded-full px-6 py-4 text-base font-semibold border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all duration-300 flex-1 sm:flex-none w-full sm:w-auto min-h-[52px] hover:shadow-md transform hover:scale-105"
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
								<p className="text-gray-700 text-base sm:text-lg font-medium mb-4">
									Your personalized{' '}
									<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-green-200/50 text-green-700 font-semibold shadow-sm">
										{selectedPlatformInfo?.name}
									</span>{' '}
									content strategy is ready
								</p>
								{/* Warning Bubble */}
								{!hasDownloadedPlan && parsedResult && (
									<div className="mb-4 flex justify-center">
										<div className="relative animate-pulse">
											<div className="absolute inset-0 bg-orange-200 rounded-full blur-lg opacity-40 animate-ping"></div>
											<div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-300 rounded-xl px-4 py-2.5 shadow-md backdrop-blur-sm max-w-sm">
												<div className="flex items-start gap-2">
													<AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5 animate-bounce" />
													<div className="flex-1">
														<p className="text-xs font-semibold text-orange-900 mb-0.5">
															⚠️ Important
														</p>
														<p className="text-xs text-orange-800 leading-relaxed">
															Please do not close
															or reload this page
															before downloading
															your plan.
															<span className="font-semibold">
																{' '}
																You will lose
																your generated
																output
															</span>{' '}
															if you do.
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
								{/* Download Button */}
								<div className="flex flex-wrap items-center justify-center gap-3">
									<Button
										ref={downloadButtonRef}
										onClick={async () => {
											try {
												const response = await fetch(
													'/api/download',
													{
														method: 'POST',
														headers: {
															'Content-Type':
																'application/json',
														},
														body: JSON.stringify({
															data: parsedResult,
															format: 'pdf',
														}),
													},
												);
												if (response.ok) {
													const blob =
														await response.blob();
													const url =
														window.URL.createObjectURL(
															blob,
														);
													const a =
														document.createElement(
															'a',
														);
													a.href = url;
													a.download = `sheeploop-strategy-${
														new Date()
															.toISOString()
															.split('T')[0]
													}.pdf`;
													document.body.appendChild(
														a,
													);
													a.click();
													window.URL.revokeObjectURL(
														url,
													);
													document.body.removeChild(
														a,
													);
													// Mark as downloaded to hide warning
													setHasDownloadedPlan(true);
												}
											} catch (error) {
												console.error(
													'Error downloading PDF:',
													error,
												);
											}
										}}
										variant="outline"
										className="bg-white/90 hover:bg-white border-green-300 text-green-700 hover:text-green-800 font-semibold shadow-sm hover:shadow-md transition-all"
									>
										<Download className="w-4 h-4 mr-2" />
										Download Plan
									</Button>
								</div>
							</div>
						</div>

						{/* Results Tabs */}
						{(parsedResult.community_market_fit ||
							parsedResult.ifc_profile ||
							(parsedResult.personas &&
								parsedResult.personas.length > 0)) && (
							<Tabs
								defaultValue={
									parsedResult.personas &&
									parsedResult.personas.length > 0
										? 'personas'
										: parsedResult.ifc_profile
										? 'follower-profile'
										: 'market-fit'
								}
								className="w-full"
							>
								<TabsList className="grid w-full grid-cols-3 h-auto p-1.5 gap-2 bg-gray-100/50 rounded-xl border border-gray-200 mb-6">
									{parsedResult.personas &&
										parsedResult.personas.length > 0 && (
											<TabsTrigger
												value="personas"
												className="text-xs sm:text-sm py-2.5 min-h-[44px] font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:via-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
											>
												Personas
											</TabsTrigger>
										)}
									{parsedResult.ifc_profile && (
										<TabsTrigger
											value="follower-profile"
											className="text-xs sm:text-sm py-2.5 min-h-[44px] font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:via-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
										>
											Follower Profile
										</TabsTrigger>
									)}
									{parsedResult.community_market_fit && (
										<TabsTrigger
											value="market-fit"
											className="text-xs sm:text-sm py-2.5 min-h-[44px] font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:via-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
										>
											Market Fit
										</TabsTrigger>
									)}
								</TabsList>

								{parsedResult.personas &&
									parsedResult.personas.length > 0 && (
										<TabsContent
											value="personas"
											className="mt-6"
										>
											<PersonasSection
												personas={parsedResult.personas}
												selectedPlatformInfo={
													selectedPlatformInfo
												}
											/>
										</TabsContent>
									)}

								{parsedResult.ifc_profile && (
									<TabsContent
										value="follower-profile"
										className="mt-6"
									>
										<div
											ref={(el) => {
												cardRefs.current[2] = el;
											}}
										>
											<IdealFollowerProfile
												data={parsedResult.ifc_profile}
											/>
										</div>
									</TabsContent>
								)}

								{parsedResult.community_market_fit && (
									<TabsContent
										value="market-fit"
										className="mt-6"
									>
										<div
											ref={(el) => {
												cardRefs.current[1] = el;
											}}
										>
											<CommunityMarketFitAssessment
												data={
													parsedResult.community_market_fit
												}
											/>
										</div>
									</TabsContent>
								)}
							</Tabs>
						)}
					</div>
				)}
			</div>
		</>
	);
}
