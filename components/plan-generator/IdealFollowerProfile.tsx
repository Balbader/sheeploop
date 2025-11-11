'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface IFPProfileData {
	demographics?: string;
	psychographics?: string;
	pain_points?: string;
	triggers?: string;
	community_behaviors?: string;
}

interface IdealFollowerProfileProps {
	data: IFPProfileData;
}

export function IdealFollowerProfile({ data }: IdealFollowerProfileProps) {
	const [expanded, setExpanded] = useState(true);

	return (
		<Card className="w-full p-6 sm:p-8 transition-all hover:shadow-2xl hover:shadow-blue-100/50 border-2 border-gray-100 bg-gradient-to-br from-white to-blue-50/30 shadow-lg">
			<CardHeader className="p-0 pb-6">
				<button
					type="button"
					onClick={() => setExpanded(!expanded)}
					className="flex items-center justify-between w-full text-left group"
				>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
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
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
						<CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
							Ideal Follower Profile (IFP)
						</CardTitle>
					</div>
					{expanded ? (
						<ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
					) : (
						<ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
					)}
				</button>
			</CardHeader>
			{expanded && (
				<CardContent className="p-0 space-y-5">
					{[
						{
							label: 'Demographics',
							value: data.demographics,
							icon: '👥',
						},
						{
							label: 'Psychographics',
							value: data.psychographics,
							icon: '🧠',
						},
						{
							label: 'Pain Points',
							value: data.pain_points,
							icon: '💔',
						},
						{
							label: 'Triggers',
							value: data.triggers,
							icon: '⚡',
						},
						{
							label: 'Community Behaviors',
							value: data.community_behaviors,
							icon: '🤝',
						},
					].map((section) => (
						<div
							key={section.label}
							className="p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100/50 hover:border-blue-200 transition-colors"
						>
							<div className="flex items-center gap-2 mb-2.5">
								<span className="text-lg">{section.icon}</span>
								<h3 className="font-bold text-sm sm:text-base text-gray-900">
									{section.label}
								</h3>
							</div>
							<p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words pl-7">
								{section.value || 'Not provided'}
							</p>
						</div>
					))}
				</CardContent>
			)}
		</Card>
	);
}
