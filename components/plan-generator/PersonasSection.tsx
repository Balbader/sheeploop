'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Persona {
	name?: string;
	segment?: string;
	description?: string;
	key_motivation?: string;
	core_pain_point?: string;
	storyline?: {
		title?: string;
		theme?: string;
		arc?: {
			hook?: string;
			transformation?: string;
			outcome?: string;
		};
		core_message?: string;
	};
	growth_strategy?: {
		objective?: string;
		content_pillars?: string[];
	};
	scripts?: Array<{
		title?: string;
		duration?: string;
		script?: string;
		cta?: string;
	}>;
}

interface PlatformInfo {
	name: string;
	icon: any;
}

interface PersonasSectionProps {
	personas: Persona[];
	selectedPlatformInfo?: PlatformInfo;
}

export function PersonasSection({
	personas,
	selectedPlatformInfo,
}: PersonasSectionProps) {
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

	return (
		<div className="w-full space-y-6 sm:space-y-8">
			<Tabs defaultValue="persona-0" className="w-full">
				<div className="mb-4 pb-4 border-b-2 border-green-200/50 bg-white rounded-xl p-4 sm:p-6 shadow-sm">
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
							<span className="text-xl">🎯</span>
						</div>
						<h2 className="text-lg sm:text-xl font-bold text-gray-900">
							Personas & Strategies
						</h2>
					</div>
					<TabsList className="flex flex-wrap justify-center w-full h-auto p-1.5 gap-2 overflow-x-auto bg-gray-100/50 rounded-xl border border-gray-200">
						{personas.map((persona: any, idx: number) => (
							<TabsTrigger
								key={idx}
								value={`persona-${idx}`}
								className="text-[10px] sm:text-xs md:text-sm py-2.5 min-h-[44px] font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:via-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
							>
								<span className="truncate">
									Persona {idx + 1}
								</span>
							</TabsTrigger>
						))}
					</TabsList>
				</div>
				{personas.map((persona: any, idx: number) => (
					<TabsContent
						key={idx}
						value={`persona-${idx}`}
						className="mt-6 sm:mt-8 space-y-6"
					>
						<Card className="w-full p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-purple-100/50 border-2 border-gray-100 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 shadow-lg">
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
														strokeWidth={2}
														d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
													/>
												</svg>
											</div>
											<CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
												{persona.name ||
													`Persona ${idx + 1}`}
											</CardTitle>
										</div>
										{persona.segment && (
											<Badge
												variant="secondary"
												className="mt-2 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200/50"
											>
												{persona.segment}
											</Badge>
										)}
									</div>
								</div>
							</CardHeader>
							<CardContent className="p-0 space-y-6">
								{persona.description && (
									<div className="rounded-2xl border-2 border-purple-200/50 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-rose-50/30 p-6 sm:p-8 shadow-lg">
										<button
											type="button"
											onClick={() => {
												const personaKey = `persona-${idx}`;
												setPersonaSectionsExpanded(
													(prev) => ({
														...prev,
														[personaKey]: {
															...prev[personaKey],
															description: !(
																prev[personaKey]
																	?.description ??
																true
															),
														},
													}),
												);
											}}
											className="flex items-center justify-between w-full text-left group"
										>
											<div className="flex items-center gap-3">
												<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-md">
													<span className="text-2xl">
														📝
													</span>
												</div>
												<h3 className="font-bold text-lg sm:text-xl text-gray-900">
													Description
												</h3>
											</div>
											{personaSectionsExpanded[
												`persona-${idx}`
											]?.description ?? true ? (
												<ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
											) : (
												<ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
											)}
										</button>
										{(personaSectionsExpanded[
											`persona-${idx}`
										]?.description ??
											true) && (
											<div className="mt-4 pt-4 border-t-2 border-purple-200/30">
												<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-100/50 shadow-sm">
													<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
														{persona.description}
													</p>
												</div>
											</div>
										)}
									</div>
								)}

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									{persona.key_motivation && (
										<div className="rounded-2xl border-2 border-amber-200/50 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/30 p-6 sm:p-8 shadow-lg">
											<button
												type="button"
												onClick={() => {
													const personaKey = `persona-${idx}`;
													setPersonaSectionsExpanded(
														(prev) => ({
															...prev,
															[personaKey]: {
																...prev[
																	personaKey
																],
																keyMotivation:
																	!(
																		prev[
																			personaKey
																		]
																			?.keyMotivation ??
																		true
																	),
															},
														}),
													);
												}}
												className="flex items-center justify-between w-full text-left group"
											>
												<div className="flex items-center gap-3">
													<div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
														<span className="text-2xl">
															💪
														</span>
													</div>
													<h3 className="font-bold text-base sm:text-lg text-gray-900">
														Key Motivation
													</h3>
												</div>
												{personaSectionsExpanded[
													`persona-${idx}`
												]?.keyMotivation ?? true ? (
													<ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
												) : (
													<ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
												)}
											</button>
											{(personaSectionsExpanded[
												`persona-${idx}`
											]?.keyMotivation ??
												true) && (
												<div className="mt-4 pt-4 border-t-2 border-amber-200/30">
													<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-100/50 shadow-sm">
														<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
															{
																persona.key_motivation
															}
														</p>
													</div>
												</div>
											)}
										</div>
									)}
									{persona.core_pain_point && (
										<div className="rounded-2xl border-2 border-red-200/50 bg-gradient-to-br from-red-50/50 via-rose-50/30 to-pink-50/30 p-6 sm:p-8 shadow-lg">
											<button
												type="button"
												onClick={() => {
													const personaKey = `persona-${idx}`;
													setPersonaSectionsExpanded(
														(prev) => ({
															...prev,
															[personaKey]: {
																...prev[
																	personaKey
																],
																corePainPoint:
																	!(
																		prev[
																			personaKey
																		]
																			?.corePainPoint ??
																		true
																	),
															},
														}),
													);
												}}
												className="flex items-center justify-between w-full text-left group"
											>
												<div className="flex items-center gap-3">
													<div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-md">
														<span className="text-2xl">
															💔
														</span>
													</div>
													<h3 className="font-bold text-base sm:text-lg text-gray-900">
														Core Pain Point
													</h3>
												</div>
												{personaSectionsExpanded[
													`persona-${idx}`
												]?.corePainPoint ?? true ? (
													<ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
												) : (
													<ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
												)}
											</button>
											{(personaSectionsExpanded[
												`persona-${idx}`
											]?.corePainPoint ??
												true) && (
												<div className="mt-4 pt-4 border-t-2 border-red-200/30">
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
									)}
								</div>

								{persona.storyline && (
									<div className="rounded-2xl border-2 border-indigo-200/50 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/30 p-6 sm:p-8 space-y-6 shadow-lg">
										<button
											type="button"
											onClick={() => {
												const personaKey = `persona-${idx}`;
												setPersonaSectionsExpanded(
													(prev) => ({
														...prev,
														[personaKey]: {
															...prev[personaKey],
															storyline: !(
																prev[personaKey]
																	?.storyline ??
																true
															),
														},
													}),
												);
											}}
											className="flex items-center justify-between w-full text-left group"
										>
											<div className="flex items-center gap-3">
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
														{persona.storyline
															.title ||
															'Untitled'}
													</p>
												</div>
											</div>
											{personaSectionsExpanded[
												`persona-${idx}`
											]?.storyline ?? true ? (
												<ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
											) : (
												<ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
											)}
										</button>
										{(personaSectionsExpanded[
											`persona-${idx}`
										]?.storyline ??
											true) && (
											<div className="mt-4 pt-4 border-t-2 border-indigo-200/30 space-y-6">
												{persona.storyline.theme && (
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

												{persona.storyline.arc && (
													<div className="space-y-4">
														<h4 className="font-bold text-base sm:text-lg text-gray-900 mb-4 flex items-center gap-2">
															<span>📖</span>
															Story Arc
														</h4>
														<div className="space-y-4">
															{persona.storyline
																.arc.hook && (
																<div className="relative pl-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50/50 to-cyan-50/30 p-4 rounded-r-xl">
																	<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center">
																		<span className="text-xs font-bold text-white">
																			I
																		</span>
																	</div>
																	<h5 className="font-bold text-sm sm:text-base text-blue-900 mb-2">
																		Act I -
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
															{persona.storyline
																.arc
																.transformation && (
																<div className="relative pl-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50/50 to-pink-50/30 p-4 rounded-r-xl">
																	<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-purple-500 border-4 border-white shadow-md flex items-center justify-center">
																		<span className="text-xs font-bold text-white">
																			II
																		</span>
																	</div>
																	<h5 className="font-bold text-sm sm:text-base text-purple-900 mb-2">
																		Act II -
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
															{persona.storyline
																.arc
																.outcome && (
																<div className="relative pl-6 border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50/50 to-teal-50/30 p-4 rounded-r-xl">
																	<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-md flex items-center justify-center">
																		<span className="text-xs font-bold text-white">
																			III
																		</span>
																	</div>
																	<h5 className="font-bold text-sm sm:text-base text-emerald-900 mb-2">
																		Act III
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

												{persona.storyline
													.core_message && (
													<div className="pt-5 mt-5 border-t-2 border-indigo-200/50">
														<div className="p-5 rounded-xl bg-gradient-to-br from-indigo-100/50 to-purple-100/30 border-2 border-indigo-200/50 shadow-sm">
															<div className="flex items-center gap-2 mb-3">
																<span className="text-xl">
																	💬
																</span>
																<h4 className="font-bold text-sm sm:text-base text-gray-900">
																	Core Message
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
									</div>
								)}

								{persona.growth_strategy && (
									<div className="rounded-2xl border-2 border-teal-200/50 bg-gradient-to-br from-teal-50/50 via-cyan-50/30 to-blue-50/30 p-6 sm:p-8 space-y-6 shadow-lg">
										<button
											type="button"
											onClick={() => {
												const personaKey = `persona-${idx}`;
												setPersonaSectionsExpanded(
													(prev) => ({
														...prev,
														[personaKey]: {
															...prev[personaKey],
															growthStrategy: !(
																prev[personaKey]
																	?.growthStrategy ??
																true
															),
														},
													}),
												);
											}}
											className="flex items-center justify-between w-full text-left group"
										>
											<div className="flex items-center gap-3">
												<div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md">
													<span className="text-2xl">
														📈
													</span>
												</div>
												<h3 className="font-bold text-lg sm:text-xl text-gray-900">
													Growth Strategy
												</h3>
											</div>
											{personaSectionsExpanded[
												`persona-${idx}`
											]?.growthStrategy ?? true ? (
												<ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
											) : (
												<ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
											)}
										</button>
										{(personaSectionsExpanded[
											`persona-${idx}`
										]?.growthStrategy ??
											true) && (
											<div className="mt-4 pt-4 border-t-2 border-teal-200/30 space-y-6">
												{persona.growth_strategy
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

												{persona.growth_strategy
													.content_pillars &&
													persona.growth_strategy
														.content_pillars
														.length > 0 && (
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
									</div>
								)}

								{persona.scripts &&
									persona.scripts.length > 0 && (
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
															width={24}
															height={24}
															className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
														/>
													</div>
												)}
												<h3 className="font-bold text-lg sm:text-xl text-gray-900">
													{selectedPlatformInfo?.name}{' '}
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
															key={sIdx}
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
																		Call to
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
				))}
			</Tabs>
		</div>
	);
}
