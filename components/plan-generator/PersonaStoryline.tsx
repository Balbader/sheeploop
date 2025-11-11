'use client';

interface PersonaStorylineProps {
	storyline: {
		title?: string;
		theme?: string;
		arc?: {
			hook?: string;
			transformation?: string;
			outcome?: string;
		};
		core_message?: string;
	};
}

export function PersonaStoryline({ storyline }: PersonaStorylineProps) {
	return (
		<div className="rounded-2xl border-2 border-indigo-200/50 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/30 p-6 sm:p-8 space-y-6 shadow-lg">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
					<span className="text-2xl">🎬</span>
				</div>
				<div>
					<h3 className="font-bold text-lg sm:text-xl text-gray-900">
						Storyline
					</h3>
					{storyline.title && (
						<p className="text-sm sm:text-base font-semibold text-indigo-700 mt-0.5">
							{storyline.title}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-6">
				{storyline.theme && (
					<div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-indigo-100/50 shadow-sm">
						<div className="flex items-center gap-2 mb-2.5">
							<span className="text-lg">🎨</span>
							<h4 className="font-bold text-sm sm:text-base text-gray-900">
								Theme
							</h4>
						</div>
						<p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-6">
							{storyline.theme}
						</p>
					</div>
				)}

				{storyline.arc && (
					<div className="space-y-4">
						<h4 className="font-bold text-base sm:text-lg text-gray-900 mb-4 flex items-center gap-2">
							<span>📖</span>
							Story Arc
						</h4>
						<div className="space-y-4">
							{storyline.arc.hook && (
								<div className="relative pl-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50/50 to-cyan-50/30 p-4 rounded-r-xl">
									<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center">
										<span className="text-xs font-bold text-white">
											I
										</span>
									</div>
									<h5 className="font-bold text-sm sm:text-base text-blue-900 mb-2">
										Act I - Hook
									</h5>
									<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
										{storyline.arc.hook}
									</p>
								</div>
							)}
							{storyline.arc.transformation && (
								<div className="relative pl-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50/50 to-pink-50/30 p-4 rounded-r-xl">
									<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-purple-500 border-4 border-white shadow-md flex items-center justify-center">
										<span className="text-xs font-bold text-white">
											II
										</span>
									</div>
									<h5 className="font-bold text-sm sm:text-base text-purple-900 mb-2">
										Act II - Transformation
									</h5>
									<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
										{storyline.arc.transformation}
									</p>
								</div>
							)}
							{storyline.arc.outcome && (
								<div className="relative pl-6 border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50/50 to-teal-50/30 p-4 rounded-r-xl">
									<div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-md flex items-center justify-center">
										<span className="text-xs font-bold text-white">
											III
										</span>
									</div>
									<h5 className="font-bold text-sm sm:text-base text-emerald-900 mb-2">
										Act III - Outcome
									</h5>
									<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
										{storyline.arc.outcome}
									</p>
								</div>
							)}
						</div>
					</div>
				)}

				{storyline.core_message && (
					<div className="pt-5 mt-5 border-t-2 border-indigo-200/50">
						<div className="p-5 rounded-xl bg-gradient-to-br from-indigo-100/50 to-purple-100/30 border-2 border-indigo-200/50 shadow-sm">
							<div className="flex items-center gap-2 mb-3">
								<span className="text-xl">💬</span>
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
										{storyline.core_message}
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
		</div>
	);
}
