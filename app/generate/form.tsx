'use client';

import { useState } from 'react';
import { getCommunityFitStoryline } from './action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Form() {
	const [result, setResult] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(formData: FormData) {
		setIsLoading(true);
		try {
			const res = await getCommunityFitStoryline(formData);
			setResult(res);
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

	return (
		<div className="w-full space-y-6">
			<Card className="w-full p-5 transition-all hover:shadow-md">
				<form
					id="storyline-form"
					action={handleSubmit}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(new FormData(e.target as HTMLFormElement));
					}}
					className="space-y-6"
				>
					{/* Basic Information */}
					<div className="space-y-4">
						<h2 className="text-sm font-semibold tracking-tight">
							Basic Information
						</h2>

						<div className="space-y-2">
							<Label htmlFor="idea">Your Idea *</Label>
							<Textarea
								id="idea"
								name="idea"
								placeholder="Describe your idea or concept..."
								required
								defaultValue={defaultData.idea}
								className="min-h-24"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="vision">Vision *</Label>
							<Textarea
								id="vision"
								name="vision"
								placeholder="What's your vision for this project?"
								required
								defaultValue={defaultData.vision}
								className="min-h-20"
							/>
						</div>
					</div>

					<Separator />

					{/* Platform & Timeline */}
					<div className="space-y-4">
						<h2 className="text-sm font-semibold tracking-tight">
							Platform & Timeline
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="target_platforms">
									Target Platforms *
								</Label>
								<Input
									id="target_platforms"
									name="target_platforms"
									placeholder="e.g., TikTok, Instagram, or Both"
									required
									defaultValue={defaultData.target_platforms}
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
					<div className="space-y-4">
						<h2 className="text-sm font-semibold tracking-tight">
							Content Strategy
						</h2>

						<div className="space-y-2">
							<Label htmlFor="tone">Tone & Style *</Label>
							<Input
								id="tone"
								name="tone"
								placeholder="e.g., Friendly, motivational, and slightly humorous"
								required
								defaultValue={defaultData.tone}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="core_audience_guess">
								Target Audience *
							</Label>
							<Input
								id="core_audience_guess"
								name="core_audience_guess"
								placeholder="Who is your ideal audience?"
								required
								defaultValue={defaultData.core_audience_guess}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="inspirations_or_competitors">
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
							/>
							<p className="text-xs text-gray-500">
								Separate multiple names with commas
							</p>
						</div>
					</div>

					<Separator />

					{/* Goals & Constraints */}
					<div className="space-y-4">
						<h2 className="text-sm font-semibold tracking-tight">
							Goals & Constraints
						</h2>

						<div className="space-y-2">
							<Label htmlFor="primary_growth_goal">
								Primary Growth Goal *
							</Label>
							<Input
								id="primary_growth_goal"
								name="primary_growth_goal"
								placeholder="e.g., Follower growth + waitlist signups"
								required
								defaultValue={defaultData.primary_growth_goal}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="constraints">Constraints</Label>
							<Textarea
								id="constraints"
								name="constraints"
								placeholder="Any limitations or constraints? (optional)"
								defaultValue={defaultData.constraints}
								className="min-h-24"
							/>
							<p className="text-xs text-gray-500">
								Equipment, resources, or creative limitations
							</p>
						</div>
					</div>

					<Separator />

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-3 pt-2">
						<Button
							type="submit"
							disabled={isLoading}
							className="rounded-full px-6 py-3 flex-1 sm:flex-none"
						>
							{isLoading ? 'Generating...' : 'Generate Storyline'}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={handleReset}
							className="rounded-full px-6 py-3 flex-1 sm:flex-none"
						>
							Reset Form
						</Button>
					</div>
				</form>
			</Card>

			{/* Results Section */}
			{parsedResult && (
				<div className="w-full space-y-6">
					<div className="text-center mb-8">
						<h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
							Your Community Fit Storyline
						</h2>
						<p className="text-gray-600 text-sm">
							Your personalized content strategy is ready
						</p>
					</div>

					{/* Community Market Fit Scores */}
					{parsedResult.community_market_fit && (
						<Card className="w-full p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
							<CardHeader className="p-0 pb-4">
								<CardTitle className="text-sm font-semibold">
									Community Market Fit Assessment
								</CardTitle>
							</CardHeader>
							<CardContent className="p-0 space-y-6">
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{Object.entries(
										parsedResult.community_market_fit
											.score || {},
									).map(([key, value]) => (
										<div
											key={key}
											className="flex flex-col items-center p-4 rounded-lg border border-gray-200 bg-slate-50"
										>
											<div className="text-xs font-medium text-gray-600 mb-2 text-center capitalize">
												{key.replace(/_/g, ' ')}
											</div>
											<div className="relative w-16 h-16 mb-2">
												<svg
													className="transform -rotate-90 w-16 h-16"
													viewBox="0 0 36 36"
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
													<span className="text-lg font-semibold text-gray-900">
														{value as number}/10
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
								{parsedResult.community_market_fit.summary && (
									<div className="space-y-2">
										<h3 className="font-semibold text-xs text-gray-700 mb-3">
											Key Insights
										</h3>
										<ul className="space-y-2">
											{parsedResult.community_market_fit.summary.map(
												(item: string, idx: number) => (
													<li
														key={idx}
														className="flex items-start gap-3 text-xs text-gray-700 leading-relaxed"
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
						<Card className="w-full p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
							<CardHeader className="p-0 pb-4">
								<CardTitle className="text-sm font-semibold">
									Ideal Follower Profile (IFP)
								</CardTitle>
							</CardHeader>
							<CardContent className="p-0 space-y-4">
								{parsedResult.ifc_profile.demographics && (
									<div>
										<h3 className="font-semibold text-xs text-gray-700 mb-2">
											Demographics
										</h3>
										<p className="text-xs text-gray-600 leading-relaxed">
											{
												parsedResult.ifc_profile
													.demographics
											}
										</p>
									</div>
								)}
								{parsedResult.ifc_profile.psychographics && (
									<div>
										<h3 className="font-semibold text-xs text-gray-700 mb-2">
											Psychographics
										</h3>
										<p className="text-xs text-gray-600 leading-relaxed">
											{
												parsedResult.ifc_profile
													.psychographics
											}
										</p>
									</div>
								)}
								{parsedResult.ifc_profile.pain_points && (
									<div>
										<h3 className="font-semibold text-xs text-gray-700 mb-2">
											Pain Points
										</h3>
										<p className="text-xs text-gray-600 leading-relaxed">
											{
												parsedResult.ifc_profile
													.pain_points
											}
										</p>
									</div>
								)}
								{parsedResult.ifc_profile.triggers && (
									<div>
										<h3 className="font-semibold text-xs text-gray-700 mb-2">
											Triggers
										</h3>
										<p className="text-xs text-gray-600 leading-relaxed">
											{parsedResult.ifc_profile.triggers}
										</p>
									</div>
								)}
								{parsedResult.ifc_profile
									.community_behaviors && (
									<div>
										<h3 className="font-semibold text-xs text-gray-700 mb-2">
											Community Behaviors
										</h3>
										<p className="text-xs text-gray-600 leading-relaxed">
											{
												parsedResult.ifc_profile
													.community_behaviors
											}
										</p>
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* Personas */}
					{parsedResult.personas &&
						parsedResult.personas.length > 0 && (
							<div className="w-full space-y-6">
								<h2 className="text-sm font-semibold tracking-tight text-center">
									Personas & Strategies
								</h2>
								<Tabs
									defaultValue="persona-0"
									className="w-full"
								>
									<TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1">
										{parsedResult.personas.map(
											(persona: any, idx: number) => (
												<TabsTrigger
													key={idx}
													value={`persona-${idx}`}
													className="text-xs md:text-sm py-2"
												>
													Persona {idx + 1}
												</TabsTrigger>
											),
										)}
									</TabsList>
									{parsedResult.personas.map(
										(persona: any, idx: number) => (
											<TabsContent
												key={idx}
												value={`persona-${idx}`}
												className="mt-6 space-y-6"
											>
												<Card className="w-full p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
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

														<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
															<div className="rounded-lg border border-gray-200 bg-slate-50 p-5 space-y-4">
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
															<div className="space-y-4">
																<h3 className="font-semibold text-xs text-gray-900">
																	Growth
																	Strategy
																</h3>
																{persona
																	.growth_strategy
																	.objective && (
																	<div>
																		<h4 className="font-medium text-xs text-gray-700 mb-1">
																			Objective
																		</h4>
																		<p className="text-xs text-gray-600">
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
																			<h4 className="font-medium text-xs text-gray-700 mb-2">
																				Content
																				Pillars
																			</h4>
																			<div className="flex flex-wrap gap-2">
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
																							className="text-xs"
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
						<Card className="w-full p-5 bg-slate-50">
							<CardContent className="p-0">
								<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
									<pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed p-6 md:p-8 overflow-x-auto">
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
