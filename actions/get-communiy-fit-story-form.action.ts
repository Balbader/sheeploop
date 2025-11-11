'use server';

/**
 * Server action that processes form data to generate a community fit storyline.
 * This action extracts user input from a form (including idea, objective, target platforms,
 * duration, tone, posting frequency, and number of personas) and passes it to the
 * community fit storyline agent for processing. The result is saved to the database
 * and returned as a formatted JSON string.
 */

import { runCommunityFitStoryline } from '@/mastra/agents/community-fit-storyline.agent';
import { UserModel } from '@/backend/models/users.model';
import { GoToMarketPlansModel } from '@/backend/models/go-to-market-plans.model';
import { FormOutputModel } from '@/backend/models/form-output.model';
import { error, log } from '@/lib/print-helpers';

export async function getCommunityFitStoryline(
	formData: FormData,
	username?: string,
) {
	try {
		// Get user_id from username
		let userId: string | undefined;
		if (username) {
			const user = await UserModel.findByUsername(username);
			if (!user) {
				error('User not found', username);
				throw new Error('User not found');
			}
			userId = user.id;
		}

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

		// Extract device information
		const device = formData.get('device')?.toString();
		const deviceName =
			formData.get('iphone_device_name')?.toString() ||
			formData.get('android_device_name')?.toString() ||
			formData.get('other_device_name')?.toString();

		// Prepare input data
		const inputData = {
			idea: formData.get('idea')?.toString() ?? '',
			vision: vision,
			target_platforms: target_platforms,
			duration: formData.get('duration')?.toString() ?? '',
			posting_frequency:
				formData.get('posting_frequency')?.toString() ?? '',
			tone: tone,
			core_audience_guess: '',
			constraints: undefined,
			inspirations_or_competitors: [],
			primary_growth_goal: undefined,
			number_of_personas:
				formData.get('number_of_personas')?.toString() ?? '2',
		};

		// Generate the output
		const result = await runCommunityFitStoryline(inputData);

		// Save to database if user_id is available
		if (userId) {
			try {
				// Generate IDs
				const planId = crypto.randomUUID();
				const outputId = crypto.randomUUID();

				// Save the output first
				await FormOutputModel.create({
					id: outputId,
					user_id: userId,
					form_output: result as any, // The result matches CommunityFitOutputSchema
				});

				// Save the input plan
				await GoToMarketPlansModel.create({
					id: planId,
					user_id: userId,
					idea: inputData.idea,
					vision: inputData.vision,
					target_platforms: JSON.stringify(
						inputData.target_platforms,
					),
					duration: inputData.duration,
					posting_frequency: inputData.posting_frequency,
					tone: inputData.tone,
					number_of_personas: inputData.number_of_personas,
					device: device || undefined,
					device_name: deviceName || undefined,
					output_id: outputId,
				});

				log('Saved plan and output to database', {
					planId,
					outputId,
					userId,
				});
			} catch (dbError) {
				error('Error saving to database', dbError);
				// Continue even if database save fails - still return the result
			}
		}

		return JSON.stringify(result, null, 2);
	} catch (err) {
		error('Error in getCommunityFitStoryline', err);
		throw err;
	}
}
