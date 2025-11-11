'use client';

interface PersonaDescriptionProps {
	description: string;
}

export function PersonaDescription({ description }: PersonaDescriptionProps) {
	return (
		<div className="rounded-2xl border-2 border-purple-200/50 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-rose-50/30 p-6 sm:p-8 shadow-lg">
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-md">
					<span className="text-2xl">📝</span>
				</div>
				<h3 className="font-bold text-lg sm:text-xl text-gray-900">
					Description
				</h3>
			</div>
			<div className="mt-4 pt-4 border-t-2 border-purple-200/30">
				<div className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-100/50 shadow-sm">
					<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
}
