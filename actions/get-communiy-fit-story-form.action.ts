'use server';

/**
 * Server action that processes form data to generate a community fit storyline.
 * This action extracts user input from a form (including idea, objective, target platforms,
 * duration, tone, posting frequency, and number of personas) and passes it to the
 * community fit storyline agent for processing. The result is returned as a formatted JSON string.
 */

import { runCommunityFitStoryline } from '@/mastra/agents/community-fit-storyline.agent';

export async function getCommunityFitStoryline(formData: FormData) {
	// Extract objective - use other_objective if "Other" was selected
	const objective = formData.get('objective')?.toString() ?? '';
	const vision =
		objective === 'Other'
			? formData.get('other_objective')?.toString() ?? ''
			: objective;

	// Extract target platform - convert single value to array
	const targetPlatform =
		formData.get('target_platforms')?.toString() ?? 'TikTok';
	const target_platforms = [targetPlatform] as Array<
		| 'TikTok'
		| 'Instagram'
		| 'YouTube'
		| 'LinkedIn'
		| 'X (Twitter)'
		| 'Snapchat'
		| 'Facebook'
	>;

	// Extract tones - combine tone_0, tone_1, and other_tone if present
	const tone0 = formData.get('tone_0')?.toString();
	const tone1 = formData.get('tone_1')?.toString();
	const otherTone = formData.get('other_tone')?.toString() ?? '';
	const tones: string[] = [];
	if (tone0) {
		tones.push(tone0 === 'Other' ? otherTone : tone0);
	}
	if (tone1) {
		tones.push(tone1 === 'Other' ? otherTone : tone1);
	}
	const tone = tones.filter((t) => t.length > 0).join(', ') || '';

	const result = await runCommunityFitStoryline({
		idea: formData.get('idea')?.toString() ?? '',
		vision: vision,
		target_platforms: target_platforms,
		duration: formData.get('duration')?.toString() ?? '',
		posting_frequency: formData.get('posting_frequency')?.toString() ?? '',
		tone: tone,
		core_audience_guess: '',
		constraints: undefined,
		inspirations_or_competitors: [],
		primary_growth_goal: undefined,
		number_of_personas:
			formData.get('number_of_personas')?.toString() ?? '2',
	});
	return JSON.stringify(result, null, 2);
}
