'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlatformInfo {
	name: string;
	icon: any;
}

interface Script {
	title?: string;
	duration?: string;
	script?: string;
	cta?: string;
	day_of_week?: string;
	preferred_time?: string;
}

interface PersonaScriptsProps {
	scripts: Script[];
	selectedPlatformInfo?: PlatformInfo;
}

export function PersonaScripts({
	scripts,
	selectedPlatformInfo,
}: PersonaScriptsProps) {
	if (!scripts || scripts.length === 0) {
		return null;
	}

	return (
		<div className="space-y-5">
			<div className="flex items-center gap-3 pb-2 border-b-2 border-gray-200">
				{selectedPlatformInfo && (
					<div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
						<Image
							src={selectedPlatformInfo.icon}
							alt={selectedPlatformInfo.name}
							width={24}
							height={24}
							className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
						/>
					</div>
				)}
				<h3 className="font-bold text-lg sm:text-xl text-gray-900">
					{selectedPlatformInfo?.name} Scripts
				</h3>
			</div>
			<div className="space-y-4">
				{scripts.map((script: Script, sIdx: number) => (
					<Card
						key={sIdx}
						className="p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50/50 transition-all hover:shadow-xl hover:border-green-300 hover:-translate-y-1 shadow-md"
					>
						<div className="flex items-start justify-between mb-4">
							<div className="flex-1">
								<h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2">
									{script.title || `Script ${sIdx + 1}`}
								</h4>
								{(script.day_of_week ||
									script.preferred_time) && (
									<div className="flex items-center gap-2 flex-wrap">
										{script.day_of_week && (
											<Badge
												variant="outline"
												className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-700 border-blue-200"
											>
												📅 {script.day_of_week}
											</Badge>
										)}
										{script.preferred_time && (
											<Badge
												variant="outline"
												className="text-xs font-semibold px-2 py-1 bg-purple-50 text-purple-700 border-purple-200"
											>
												⏰ {script.preferred_time}
											</Badge>
										)}
									</div>
								)}
							</div>
							{script.duration && (
								<Badge
									variant="secondary"
									className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200/50 ml-2"
								>
									{script.duration}
								</Badge>
							)}
						</div>
						{script.script && (
							<div className="mb-5 p-4 rounded-lg bg-gray-50/50 border border-gray-100">
								<p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
									{script.script}
								</p>
							</div>
						)}
						{script.cta && (
							<div className="pt-4 border-t-2 border-gray-200">
								<span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
									Call to Action:
								</span>
								<p className="text-sm sm:text-base text-gray-900 mt-2 font-semibold bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
									{script.cta}
								</p>
							</div>
						)}
					</Card>
				))}
			</div>
		</div>
	);
}
