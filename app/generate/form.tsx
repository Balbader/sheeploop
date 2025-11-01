'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getCommunityFitStoryline } from './action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle2, Circle } from 'lucide-react';

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

const GENERATION_STEPS = [
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
		label: 'Crafting TikTok scripts',
		description: 'Writing viral-ready content scripts',
	},
	{
		id: 7,
		label: 'Finalizing strategy',
		description: 'Compiling your complete plan',
	},
];

export function Form() {
	const [result, setResult] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const sheepContainerRef = useRef<HTMLDivElement>(null);
	const animationRefs = useRef<any[]>([]);
	const messageTimersRef = useRef<NodeJS.Timeout[]>([]);

	// Simulate progress through steps during loading
	useEffect(() => {
		if (!isLoading) {
			setCurrentStep(0);
			return;
		}

		const stepInterval = setInterval(() => {
			setCurrentStep((prev) => {
				if (prev < GENERATION_STEPS.length) {
					return prev + 1;
				}
				return prev;
			});
		}, 2000); // Move to next step every 2 seconds

		return () => clearInterval(stepInterval);
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
					sheepWrapper.className = 'absolute pointer-events-none';
					sheepWrapper.style.left = `${Math.random() * 100}%`;
					sheepWrapper.style.top = '-100px';

					// Speech bubble - responsive sizing
					const bubble = document.createElement('div');
					bubble.className =
						'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 shadow-lg border border-gray-200 whitespace-nowrap max-w-[140px] sm:max-w-none';
					bubble.style.minWidth = '100px';
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

				// Animate each sheep falling
				sheepArray.forEach((sheep, index) => {
					const startDelay = index * 0.4;
					const fallDuration = 7 + Math.random() * 5;
					const startXPercent = Math.random() * 100;
					const horizontalDrift = (Math.random() - 0.5) * 60;

					// Set initial position
					gsap.set(sheep, {
						x: `${startXPercent}%`,
						y: -100,
						rotation: 0,
					});

					// Fall animation
					const fallAnim = gsap.to(sheep, {
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

					// Gentle rotation animation
					const rotateAnim = gsap.to(sheep, {
						rotation: `+=${(Math.random() - 0.5) * 45}`,
						duration: 2 + Math.random() * 2,
						repeat: -1,
						yoyo: true,
						ease: 'sine.inOut',
						delay: startDelay,
					});

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

	const defaultData = {
		idea: 'A community of early-stage AI founders who are struggling to get traction on social media.',
		vision: 'Help early-stage AI founders get traction on social media.',
		target_platforms: 'TikTok',
		duration: '1 week',
		tone: 'Friendly, motivational, and slightly humorous',
		core_audience_guess: 'burned-out solo creators',
		constraints:
			'Solo creator, only an iPhone and CapCut, can film talking head and screen recordings only, no fancy b-roll',
		inspirations_or_competitors: 'Alex Hormozi, Dee Kay, Ali Abdaal',
		primary_growth_goal: 'Follower growth + waitlist signups',
	};

	const handleReset = () => {
		setResult(null);
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
					className="fixed inset-0 overflow-hidden pointer-events-none"
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
								{/* Background progress bar */}
								<div className="h-2 sm:h-3 w-full bg-gray-100 rounded-full overflow-hidden">
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
									defaultValue={defaultData.idea}
									className="min-h-20 sm:min-h-24 text-sm"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="vision"
									className="text-xs sm:text-sm"
								>
									Vision *
								</Label>
								<Textarea
									id="vision"
									name="vision"
									placeholder="What's your vision for this project?"
									required
									defaultValue={defaultData.vision}
									className="min-h-20 sm:min-h-24 text-sm"
								/>
							</div>
						</div>

						<Separator />

						{/* Platform & Timeline */}
						<div className="space-y-3 sm:space-y-4">
							<h2 className="text-xs sm:text-sm font-semibold tracking-tight">
								Platform & Timeline
							</h2>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
								<div className="space-y-2">
									<Label htmlFor="target_platforms">
										Target Platforms *
									</Label>
									<Input
										id="target_platforms"
										name="target_platforms"
										placeholder="e.g., TikTok, Instagram, or Both"
										required
										defaultValue={
											defaultData.target_platforms
										}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="duration">Duration *</Label>
									<Input
										id="duration"
										name="duration"
										placeholder="e.g., 1 week, 30 days"
										required
										defaultValue={defaultData.duration}
									/>
								</div>
							</div>
						</div>

						<Separator />

						{/* Content Strategy */}
						<div className="space-y-3 sm:space-y-4">
							<h2 className="text-xs sm:text-sm font-semibold tracking-tight">
								Content Strategy
							</h2>

							<div className="space-y-2">
								<Label
									htmlFor="tone"
									className="text-xs sm:text-sm"
								>
									Tone & Style *
								</Label>
								<Input
									id="tone"
									name="tone"
									placeholder="e.g., Friendly, motivational, and slightly humorous"
									required
									defaultValue={defaultData.tone}
									className="text-sm"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="core_audience_guess"
									className="text-xs sm:text-sm"
								>
									Target Audience *
								</Label>
								<Input
									id="core_audience_guess"
									name="core_audience_guess"
									placeholder="Who is your ideal audience?"
									required
									defaultValue={
										defaultData.core_audience_guess
									}
									className="text-sm"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="inspirations_or_competitors"
									className="text-xs sm:text-sm"
								>
									Inspirations or Competitors *
								</Label>
								<Input
									id="inspirations_or_competitors"
									name="inspirations_or_competitors"
									placeholder="Comma-separated list (e.g., Alex Hormozi, Dee Kay, Ali Abdaal)"
									required
									defaultValue={
										defaultData.inspirations_or_competitors
									}
									className="text-sm"
								/>
								<p className="text-xs text-gray-500">
									Separate multiple names with commas
								</p>
							</div>
						</div>

						<Separator />

						{/* Goals & Constraints */}
						<div className="space-y-3 sm:space-y-4">
							<h2 className="text-xs sm:text-sm font-semibold tracking-tight">
								Goals & Constraints
							</h2>

							<div className="space-y-2">
								<Label
									htmlFor="primary_growth_goal"
									className="text-xs sm:text-sm"
								>
									Primary Growth Goal *
								</Label>
								<Input
									id="primary_growth_goal"
									name="primary_growth_goal"
									placeholder="e.g., Follower growth + waitlist signups"
									required
									defaultValue={
										defaultData.primary_growth_goal
									}
									className="text-sm"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="constraints"
									className="text-xs sm:text-sm"
								>
									Constraints
								</Label>
								<Textarea
									id="constraints"
									name="constraints"
									placeholder="Any limitations or constraints? (optional)"
									defaultValue={defaultData.constraints}
									className="min-h-20 sm:min-h-24 text-sm"
								/>
								<p className="text-xs text-gray-500">
									Equipment, resources, or creative
									limitations
								</p>
							</div>
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
