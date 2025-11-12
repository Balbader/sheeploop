'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, PlayCircle, CheckCircle2, AlertCircle } from 'lucide-react';

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

// Helper function to parse duration and calculate timestamps
function parseDuration(duration?: string): number | null {
	if (!duration) return null;
	// Extract seconds from formats like "15s", "1m 30s", "2m", etc.
	const match = duration.match(/(?:(\d+)m)?\s*(?:(\d+)s)?/);
	if (!match) return null;
	const minutes = parseInt(match[1] || '0', 10);
	const seconds = parseInt(match[2] || '0', 10);
	return minutes * 60 + seconds;
}

// Helper function to format time
function formatTime(seconds: number): string {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	if (mins > 0) {
		return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
	}
	return `${secs}s`;
}

// Helper function to split script into logical sections and add timestamps
function enhanceScriptWithTimestamps(
	script: string,
	duration: number | null,
): Array<{ time: string; text: string; type: 'hook' | 'body' | 'transition' }> {
	const lines = script.split('\n').filter((line) => line.trim());
	const sections: Array<{
		time: string;
		text: string;
		type: 'hook' | 'body' | 'transition';
	}> = [];

	if (lines.length === 0) return sections;

	// Estimate time per line (rough estimate: 2-3 seconds per line for speaking)
	const avgTimePerLine = duration ? duration / lines.length : 3;
	let currentTime = 0;

	lines.forEach((line, index) => {
		const lineTime = Math.round(avgTimePerLine * (index + 1));
		const timeStr = formatTime(lineTime);

		// Determine section type based on content
		let type: 'hook' | 'body' | 'transition' = 'body';
		const lowerLine = line.toLowerCase();
		if (
			index === 0 ||
			lowerLine.includes('hook') ||
			lowerLine.includes('start') ||
			lowerLine.includes('first')
		) {
			type = 'hook';
		} else if (
			lowerLine.includes('but') ||
			lowerLine.includes('however') ||
			lowerLine.includes('now') ||
			lowerLine.includes('so')
		) {
			type = 'transition';
		}

		sections.push({
			time: timeStr,
			text: line.trim(),
			type,
		});
	});

	return sections;
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

			{/* Instructions Card */}
			<Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
				<div className="flex items-start gap-3">
					<AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
					<div className="flex-1">
						<h4 className="font-semibold text-sm text-blue-900 mb-2">
							📋 How to Use These Scripts
						</h4>
						<ul className="text-xs sm:text-sm text-blue-800 space-y-1.5 list-disc list-inside">
							<li>Read through the script before recording</li>
							<li>Use the timestamps to pace your delivery</li>
							<li>
								Practice the hook (first few seconds) to grab
								attention
							</li>
							<li>Speak naturally and adjust timing as needed</li>
							<li>Include the CTA at the end for best results</li>
						</ul>
					</div>
				</div>
			</Card>

			<div className="space-y-4">
				{scripts.map((script: Script, sIdx: number) => {
					const durationSeconds = parseDuration(script.duration);
					const enhancedSections = script.script
						? enhanceScriptWithTimestamps(
								script.script,
								durationSeconds,
						  )
						: [];

					return (
						<Card
							key={sIdx}
							className="p-6 border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50/50 transition-all hover:shadow-xl hover:border-green-300 hover:-translate-y-1 shadow-md"
						>
							{/* Header Section */}
							<div className="flex items-start justify-between mb-5">
								<div className="flex-1">
									<h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3">
										{script.title || `Script ${sIdx + 1}`}
									</h4>
									<div className="flex items-center gap-2 flex-wrap">
										{(script.day_of_week ||
											script.preferred_time) && (
											<>
												{script.day_of_week && (
													<Badge
														variant="outline"
														className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 border-blue-200"
													>
														📅 {script.day_of_week}
													</Badge>
												)}
												{script.preferred_time && (
													<Badge
														variant="outline"
														className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 border-purple-200"
													>
														⏰{' '}
														{script.preferred_time}
													</Badge>
												)}
											</>
										)}
										{script.duration && (
											<Badge
												variant="outline"
												className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border-amber-200"
											>
												<Clock className="w-3 h-3 mr-1 inline" />
												{script.duration}
											</Badge>
										)}
									</div>
								</div>
							</div>

							{/* Script Content with Timestamps */}
							{script.script && (
								<div className="mb-5">
									<div className="mb-3 flex items-center gap-2">
										<PlayCircle className="w-4 h-4 text-green-600" />
										<span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
											Script Content
										</span>
									</div>
									<div className="space-y-3">
										{enhancedSections.length > 0 ? (
											enhancedSections.map(
												(section, idx) => (
													<div
														key={idx}
														className={`p-4 rounded-lg border-l-4 ${
															section.type ===
															'hook'
																? 'bg-orange-50/50 border-orange-400'
																: section.type ===
																  'transition'
																? 'bg-yellow-50/50 border-yellow-400'
																: 'bg-gray-50/50 border-gray-300'
														}`}
													>
														<div className="flex items-start gap-3">
															<div className="flex-shrink-0">
																<Badge
																	variant="outline"
																	className={`text-xs font-mono font-bold px-2 py-0.5 ${
																		section.type ===
																		'hook'
																			? 'bg-orange-100 text-orange-700 border-orange-300'
																			: section.type ===
																			  'transition'
																			? 'bg-yellow-100 text-yellow-700 border-yellow-300'
																			: 'bg-gray-100 text-gray-700 border-gray-300'
																	}`}
																>
																	{
																		section.time
																	}
																</Badge>
															</div>
															<div className="flex-1">
																{section.type ===
																	'hook' && (
																	<div className="mb-1">
																		<Badge
																			variant="outline"
																			className="text-[10px] font-semibold px-1.5 py-0.5 bg-orange-100 text-orange-700 border-orange-300"
																		>
																			HOOK
																		</Badge>
																	</div>
																)}
																<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
																	{
																		section.text
																	}
																</p>
															</div>
														</div>
													</div>
												),
											)
										) : (
											<div className="p-4 rounded-lg bg-gray-50/50 border border-gray-100">
												<p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
													{script.script}
												</p>
											</div>
										)}
									</div>
								</div>
							)}

							{/* CTA Section */}
							{script.cta && (
								<div className="pt-5 border-t-2 border-gray-200">
									<div className="mb-3 flex items-center gap-2">
										<CheckCircle2 className="w-4 h-4 text-green-600" />
										<span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
											Call to Action
										</span>
									</div>
									<div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-4 rounded-lg border-2 border-green-200/50">
										<p className="text-sm sm:text-base text-gray-900 font-semibold leading-relaxed">
											{script.cta}
										</p>
									</div>
									<div className="mt-3 p-3 bg-green-50/50 rounded-lg border border-green-200/50">
										<p className="text-xs text-green-800 leading-relaxed">
											💡 <strong>Tip:</strong> Say this
											CTA clearly and with enthusiasm.
											This is where you convert viewers
											into followers or customers!
										</p>
									</div>
								</div>
							)}
						</Card>
					);
				})}
			</div>
		</div>
	);
}
