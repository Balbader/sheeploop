'use server';

/**
 * Server action that processes form data to generate a community fit storyline.
 * This action extracts user input from a form (including idea, vision, target platforms,
 * duration, tone, audience insights, constraints, inspirations, and growth goals) and
 * passes it to the community fit storyline agent for processing. The result is returned
 * as a formatted JSON string.
 */

import { runCommunityFitStoryline } from '@/mastra/agents/community-fit-storyline.agent';

export async function getCommunityFitStoryline(formData: FormData) {
	const result = await runCommunityFitStoryline({
		idea: formData.get('idea')?.toString() ?? '',
		vision: formData.get('vision')?.toString() ?? '',
		target_platforms: [
			'TikTok',
			'Instagram',
			'YouTube',
			'LinkedIn',
			'X (Twitter)',
			'Snapchat',
			'Facebook',
			'Threads',
		],
		duration: formData.get('duration')?.toString() ?? '',
		posting_frequency: formData.get('posting_frequency')?.toString() ?? '',
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
