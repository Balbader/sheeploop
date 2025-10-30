'use client';

import { useState } from 'react';
import { getCommunityFitStoryline } from './action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Form() {
	const [result, setResult] = useState<string | null>(null);

	async function handleSubmit(formData: FormData) {
		const res = await getCommunityFitStoryline(formData);
		setResult(res);
	}

	const data = {
		idea: 'An AI companion that helps creators and startups design viral social media strategies by generating content storylines, post schedules, and video scripts.',
		vision: 'Empower anyone with a creative idea to grow an authentic community online by turning their passion into a movement.',
		target_platforms: 'TikTok, Instagram',
		duration: '3 months',
		tone: 'Friendly, motivational, and slightly humorous',
		core_audience_guess:
			'Aspiring creators, solo founders, small business owners, and early-stage startups who struggle with consistent social media growth.',
		constraints:
			'Limited time and budget for marketing; must be easy to use and deliver quick results; focus only on short-form video content.',
		inspirations_or_competitors:
			'Notion, Later.com, Hootsuite, and AI coaches like OpusClip and Copy.ai',
		primary_growth_goal:
			'Build a viral creator community around SheepLoop by helping users achieve their first 10K followers using AI-guided storytelling.',
	};

	const formData = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		formData.append(key, value);
	});

	return (
		<>
			<div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
				<form
					action={handleSubmit}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(new FormData(e.target as HTMLFormElement));
					}}
				>
					<Input
						name="idea"
						placeholder="Enter idea"
						required
						defaultValue={data.idea}
					/>
					<Input
						name="vision"
						placeholder="Enter vision"
						required
						defaultValue={data.vision}
					/>
					<Input
						name="target_platforms"
						placeholder="Enter target platforms (TikTok, Instagram, or Both)"
						required
						defaultValue={data.target_platforms}
					/>
					<Input
						name="duration"
						placeholder="Enter duration"
						required
						defaultValue={data.duration}
					/>
					<Input
						name="tone"
						placeholder="Enter tone"
						required
						defaultValue={data.tone}
					/>
					<Input
						name="core_audience_guess"
						placeholder="Enter core audience guess"
						required
						defaultValue={data.core_audience_guess}
					/>
					<Input
						name="constraints"
						placeholder="Enter constraints"
						required
						defaultValue={data.constraints}
					/>
					<Input
						name="inspirations_or_competitors"
						placeholder="Enter inspirations or competitors"
						required
						defaultValue={data.inspirations_or_competitors}
					/>
					<Input
						name="primary_growth_goal"
						placeholder="Enter primary growth goal"
						required
						defaultValue={data.primary_growth_goal}
					/>
					<Button type="submit">Get Community Fit Storyline</Button>
					<Button
						type="button"
						onClick={() => {
							formData.forEach((value, key) => {
								formData.delete(key);
							});
							setResult(null);
						}}
					>
						Reset
					</Button>
				</form>
				<div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
					<h2 className="text-2xl font-bold">Result</h2>
					<div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
						{result && <pre>{result}</pre>}
					</div>
				</div>
			</div>
		</>
	);
}
