'use client';

import { GenerateMarketingStrategyForm } from '@/components/plan-generator/GenerateMarketingStrategyForm';
import { useState } from 'react';

interface GeneratePageContentProps {
	username: string;
}

export function GeneratePageContent({ username }: GeneratePageContentProps) {
	const [hasOutput, setHasOutput] = useState(false);

	return (
		<div className="max-w-screen-xl mx-auto px-2 sm:px-6 pt-4 sm:pt-6 pb-12 sm:pb-16 md:pb-12 relative z-10">
			{!hasOutput && (
				<div className="mx-auto max-w-3xl text-center mb-4 sm:mb-4 md:mb-4">
					<h1 className="mt-3 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight px-2">
						Shorts Content Strategy
						<br />
						Plan Generator
					</h1>
					<p className="mt-2 sm:mt-2 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2">
						Fill in the details about your idea/goals/constraints
						and get a tailored content strategy designed to help you
						find and grow your community.
					</p>
				</div>
			)}
			<GenerateMarketingStrategyForm
				username={username}
				onOutputGenerated={setHasOutput}
			/>
		</div>
	);
}
