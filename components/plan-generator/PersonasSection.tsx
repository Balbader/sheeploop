'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonaDescription } from './PersonaDescription';
import { PersonaKeyMotivation } from './PersonaKeyMotivation';
import { PersonaCorePainPoint } from './PersonaCorePainPoint';
import { PersonaStoryline } from './PersonaStoryline';
import { PersonaGrowthStrategy } from './PersonaGrowthStrategy';
import { PersonaScripts } from './PersonaScripts';

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
	// Get available sections for the first persona to determine which tabs to show
	const getAvailableSections = (persona: Persona) => {
		const sections: string[] = [];
		// Scripts should be first
		if (persona.scripts && persona.scripts.length > 0)
			sections.push('scripts');
		if (persona.description) sections.push('description');
		if (persona.key_motivation) sections.push('key-motivation');
		if (persona.core_pain_point) sections.push('core-pain-point');
		if (persona.storyline) sections.push('storyline');
		if (persona.growth_strategy) sections.push('growth-strategy');
		return sections;
	};

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
				{personas.map((persona: any, idx: number) => {
					const availableSections = getAvailableSections(persona);
					const defaultSection =
						availableSections[0] || 'description';

					return (
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
								<CardContent className="p-0">
									<Tabs
										defaultValue={defaultSection}
										className="w-full"
									>
										<TabsList className="flex flex-wrap justify-start w-full h-auto p-1.5 gap-2 overflow-x-auto bg-gray-100/50 rounded-xl border border-gray-200 mb-6">
											{persona.scripts &&
												persona.scripts.length > 0 && (
													<TabsTrigger
														value="scripts"
														className="text-xs sm:text-sm py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
													>
														📝 Scripts
													</TabsTrigger>
												)}
											{persona.description && (
												<TabsTrigger
													value="description"
													className="text-xs sm:text-sm py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
												>
													📝 Description
												</TabsTrigger>
											)}
											{persona.key_motivation && (
												<TabsTrigger
													value="key-motivation"
													className="text-xs sm:text-sm py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
												>
													💪 Motivation
												</TabsTrigger>
											)}
											{persona.core_pain_point && (
												<TabsTrigger
													value="core-pain-point"
													className="text-xs sm:text-sm py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
												>
													💔 Pain Point
												</TabsTrigger>
											)}
											{persona.storyline && (
												<TabsTrigger
													value="storyline"
													className="text-xs sm:text-sm py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
												>
													🎬 Storyline
												</TabsTrigger>
											)}
											{persona.growth_strategy && (
												<TabsTrigger
													value="growth-strategy"
													className="text-xs sm:text-sm py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-lg"
												>
													📈 Growth
												</TabsTrigger>
											)}
										</TabsList>

										{persona.scripts &&
											persona.scripts.length > 0 && (
												<TabsContent
													value="scripts"
													className="mt-0"
												>
													<PersonaScripts
														scripts={
															persona.scripts
														}
														selectedPlatformInfo={
															selectedPlatformInfo
														}
													/>
												</TabsContent>
											)}

										{persona.description && (
											<TabsContent
												value="description"
												className="mt-0"
											>
												<PersonaDescription
													description={
														persona.description
													}
												/>
											</TabsContent>
										)}

										{persona.key_motivation && (
											<TabsContent
												value="key-motivation"
												className="mt-0"
											>
												<PersonaKeyMotivation
													keyMotivation={
														persona.key_motivation
													}
												/>
											</TabsContent>
										)}

										{persona.core_pain_point && (
											<TabsContent
												value="core-pain-point"
												className="mt-0"
											>
												<PersonaCorePainPoint
													corePainPoint={
														persona.core_pain_point
													}
												/>
											</TabsContent>
										)}

										{persona.storyline && (
											<TabsContent
												value="storyline"
												className="mt-0"
											>
												<PersonaStoryline
													storyline={
														persona.storyline
													}
												/>
											</TabsContent>
										)}

										{persona.growth_strategy && (
											<TabsContent
												value="growth-strategy"
												className="mt-0"
											>
												<PersonaGrowthStrategy
													growthStrategy={
														persona.growth_strategy
													}
												/>
											</TabsContent>
										)}
									</Tabs>
								</CardContent>
							</Card>
						</TabsContent>
					);
				})}
			</Tabs>
		</div>
	);
}
