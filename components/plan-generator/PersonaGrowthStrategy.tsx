'use client';

import { Badge } from '@/components/ui/badge';

interface PersonaGrowthStrategyProps {
	growthStrategy: {
		objective?: string;
		content_pillars?: string[];
	};
}

export function PersonaGrowthStrategy({
	growthStrategy,
}: PersonaGrowthStrategyProps) {
	return (
		<div className="rounded-2xl border-2 border-teal-200/50 bg-gradient-to-br from-teal-50/50 via-cyan-50/30 to-blue-50/30 p-6 sm:p-8 space-y-6 shadow-lg">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md">
					<span className="text-2xl">📈</span>
				</div>
				<h3 className="font-bold text-lg sm:text-xl text-gray-900">
					Growth Strategy
				</h3>
			</div>

			<div className="space-y-6">
				{growthStrategy.objective && (
					<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-teal-100/50 shadow-sm">
						<div className="flex items-center gap-2 mb-3">
							<span className="text-lg">🎯</span>
							<h4 className="font-bold text-sm sm:text-base text-gray-900">
								Objective
							</h4>
						</div>
						<p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-6">
							{growthStrategy.objective}
						</p>
					</div>
				)}

				{growthStrategy.content_pillars &&
					growthStrategy.content_pillars.length > 0 && (
						<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-teal-100/50 shadow-sm">
							<div className="flex items-center gap-2 mb-4">
								<span className="text-lg">🏛️</span>
								<h4 className="font-bold text-sm sm:text-base text-gray-900">
									Content Pillars
								</h4>
							</div>
							<div className="flex flex-wrap gap-3 pl-6">
								{growthStrategy.content_pillars.map(
									(pillar: string, pIdx: number) => (
										<Badge
											key={pIdx}
											variant="outline"
											className="text-xs sm:text-sm px-4 py-2 font-semibold bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border-2 border-teal-200/50 hover:border-teal-300 hover:shadow-md transition-all break-words"
										>
											{pillar}
										</Badge>
									),
								)}
							</div>
						</div>
					)}
			</div>
		</div>
	);
}
