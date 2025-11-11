'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface CommunityMarketFitData {
	score: {
		alignment?: number;
		virality?: number;
		engagement?: number;
		differentiation?: number;
	};
	summary?: string[];
}

interface CommunityMarketFitAssessmentProps {
	data: CommunityMarketFitData;
}

const getScoreColor = (score: number) => {
	if (score >= 8) return 'bg-green-500';
	if (score >= 6) return 'bg-yellow-500';
	return 'bg-orange-500';
};

export function CommunityMarketFitAssessment({
	data,
}: CommunityMarketFitAssessmentProps) {
	const [insightsExpanded, setInsightsExpanded] = useState(true);

	return (
		<Card className="w-full p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-green-100/50 border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50/50 shadow-lg">
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
					{Object.entries(data.score || {}).map(([key, value]) => (
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
											(value as number) * 10
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
				{data.summary && (
					<div className="space-y-2 mt-6 pt-6 border-t-2 border-gray-100">
						<button
							type="button"
							onClick={() =>
								setInsightsExpanded(!insightsExpanded)
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
								{data.summary.map(
									(item: string, idx: number) => (
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
	);
}
