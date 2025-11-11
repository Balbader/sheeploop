'use client';

interface PersonaKeyMotivationProps {
	keyMotivation: string;
}

export function PersonaKeyMotivation({
	keyMotivation,
}: PersonaKeyMotivationProps) {
	return (
		<div className="rounded-2xl border-2 border-amber-200/50 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/30 p-6 sm:p-8 shadow-lg">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-md">
					<span className="text-2xl">💪</span>
				</div>
				<h3 className="font-bold text-base sm:text-lg text-gray-900">
					Key Motivation
				</h3>
			</div>
			<div className="mt-4 pt-4 border-t-2 border-amber-200/30">
				<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-amber-100/50 shadow-sm">
					<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
						{keyMotivation}
					</p>
				</div>
			</div>
		</div>
	);
}
