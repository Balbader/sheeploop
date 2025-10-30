'use server';

import { runCommunityFitStoryline } from '@/mastra/agents/community-fit-storyline.agent';

export async function getCommunityFitStoryline(formData: FormData) {
	function normalizePlatform(
		p: string,
	): 'TikTok' | 'Instagram' | 'Both' | null {
		switch (p.trim().toLowerCase()) {
			case 'tiktok':
				return 'TikTok';
			case 'instagram':
				return 'Instagram';
			case 'both':
				return 'Both';
			default:
				return null;
		}
	}

	const rawPlatforms = formData.get('target_platforms')?.toString() ?? '';
	const parsedPlatforms = rawPlatforms
		.split(',')
		.map((s) => s.trim())
		.filter((s) => s.length > 0)
		.map(normalizePlatform)
		.filter((p): p is 'TikTok' | 'Instagram' | 'Both' => p !== null);

	const result = await runCommunityFitStoryline({
		idea: formData.get('idea')?.toString() ?? '',
		vision: formData.get('vision')?.toString() ?? '',
		target_platforms: parsedPlatforms,
		duration: formData.get('duration')?.toString() ?? '',
		tone: formData.get('tone')?.toString() ?? '',
		core_audience_guess:
			formData.get('core_audience_guess')?.toString() ?? '',
		constraints: formData.get('constraints')?.toString(),
		inspirations_or_competitors: (
			formData.get('inspirations_or_competitors')?.toString() ?? ''
		)
			.split(',')
			.map((s) => s.trim())
			.filter((s) => s.length > 0),
		primary_growth_goal:
			formData.get('primary_growth_goal')?.toString() ?? '',
	});
	return JSON.stringify(result, null, 2);
}
