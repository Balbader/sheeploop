import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { message, log, error } from '@/lib/print-helpers';

/**
 * =========================================
 * 1. INPUT SCHEMA
 * =========================================
 * Data the user/founder must provide to generate a plan.
 */

export const CommunityFitInputSchema = z.object({
	idea: z
		.string()
		.describe(
			"Short description of the product / project / message we're trying to build community around.",
		),
	vision: z
		.string()
		.describe(
			'Long-term goal of the brand or movement. Why does this idea deserve a community?',
		),
	target_platforms: z
		.array(z.enum(['TikTok', 'Instagram', 'Both']))
		.describe('Where content will be published.')
		.nonempty(),
	duration: z
		.string()
		.describe(
			"Length of the campaign (e.g. '1 week', '1 month', '3 months'). Used to shape pacing.",
		),
	tone: z
		.string()
		.describe(
			"Voice and personality of the content. Example: 'friendly and rebellious', 'calm and expert', 'chaotic and funny'.",
		),
	core_audience_guess: z
		.string()
		.describe(
			"Founder's guess at who the content is for. Example: 'early-stage AI founders', 'burned-out solo creators', 'indie hackers who hate corporate'.",
		),
	constraints: z
		.string()
		.describe(
			"Practical limitations. Example: 'solo creator, only an iPhone and CapCut, can film talking head and screen recordings only, no fancy b-roll'.",
		)
		.optional(),
	inspirations_or_competitors: z
		.array(z.string())
		.describe(
			'Accounts / creators / brands doing something similar or aspirational. This is useful for tone + format benchmarking.',
		)
		.default([]),

	// Optional: immediate growth KPI
	primary_growth_goal: z
		.string()
		.describe(
			"What is the #1 metric that matters in this campaign? (e.g. 'follower growth', 'email waitlist signups', 'beta testers for launch', 'discord joins').",
		)
		.optional(),
});

/**
 * =========================================
 * 2. OUTPUT SCHEMA
 * =========================================
 * This is the structured JSON response you'll get from the agent.
 * You can persist it, render it, or feed it to a scheduler.
 */

export const CommunityFitOutputSchema = z.object({
	community_market_fit: z.object({
		score: z.enum(['High', 'Medium', 'Low']),
		justification: z
			.string()
			.describe(
				"Why this idea has (or doesn't have) strong community-market fit potential. Based on cultural resonance, urgency, identity, and story energy.",
			),
	}),

	ifc_profile: z.object({
		persona: z
			.string()
			.describe(
				"Short label for the ideal follower community. Example: 'The Burned-Out Builder', 'The Scrappy Founder', 'The Quiet Killer Designer'.",
			),
		demographics: z
			.string()
			.describe(
				'Age range, work/life situation, income or stage, where they spend time online.',
			),
		psychographics: z
			.string()
			.describe(
				"Deep emotional drivers: fears, ambitions, frustrations, identity they're trying to claim.",
			),
		content_behavior: z
			.string()
			.describe(
				"How and why they consume short-form content. Binge at night? Save 'advice' reels? Hate cringe? Love raw confessionals?",
			),
		why_they_follow: z
			.string()
			.describe(
				"The core promise they expect if they hit 'Follow'. What outcome do they want from you?",
			),
		why_they_share: z
			.string()
			.describe(
				'The emotional/social payoff they get by reposting, tagging friends, stitching, etc.',
			),
	}),

	storyline: z.object({
		main_theme: z
			.string()
			.describe(
				'The overarching theme of the narrative. This is the spine of the brand story.',
			),
		summary: z
			.string()
			.describe(
				"Short pitch of the story we are telling over and over. This is the 'what you're part of if you follow us'.",
			),
		acts: z.object({
			hook: z
				.string()
				.describe(
					"Act I: Origin / spark. The 'why this matters now' moment. Should punch emotionally.",
				),
			conflict: z
				.string()
				.describe(
					"Act II: The pain, struggle, or war we're fighting together. This is where tension lives.",
				),
			resolution: z
				.string()
				.describe(
					"Act III: The promise / vision / transformation. Where we're going as a movement or tribe.",
				),
		}),
		content_arcs: z
			.array(
				z
					.string()
					.describe(
						'Recurring mini-arcs / angles we can revisit to keep story fresh without breaking the core theme.',
					),
			)
			.describe(
				'3-5 arcs to serialize. These arcs become episodic content categories.',
			),
	}),

	growth_strategy: z.object({
		content_pillars: z
			.array(
				z
					.string()
					.describe(
						"Each pillar is a repeatable type of video theme: e.g. 'daily struggle', 'before/after progress log', 'myth-busting', 'teaching a trick', 'calling out an enemy'.",
					),
			)
			.describe(
				'The machine. The lanes you post in. Each pillar maps to an emotion.',
			),
		momentum_drivers: z
			.array(
				z
					.string()
					.describe(
						'Hooks, recurring formats, challenges, cliffhangers, confessionals, POV rants, etc. that create retention + bingeability.',
					),
			)
			.describe(
				'How we keep energy high and get repeat watch / rewatch.',
			),
		engagement_loops: z
			.array(
				z
					.string()
					.describe(
						"Audience participation patterns: duets, stitches, 'comment X if', 'I’ll roast your setup', weekly rituals, etc.",
					),
			)
			.describe('How we turn passive viewers into vocal community.'),
		frequency: z
			.string()
			.describe(
				"Posting rhythm sized to the duration. Example: '4 posts/week for 4 weeks' or '2 posts/day for 7 days'.",
			),
		goal: z
			.string()
			.describe(
				'The growth KPI we’re optimizing toward (followers, waitlist, discord joins, etc.).',
			),
	}),

	shorts_campaign: z
		.array(
			z.object({
				title: z
					.string()
					.describe('Internal label for the concept of the short.'),
				goal: z
					.string()
					.describe(
						'What this short is trying to do: hook new people, build trust, convert them into followers, get comments, etc.',
					),
				platform: z
					.enum(['TikTok', 'Instagram', 'Both'])
					.describe('Where this short should live.'),
				script: z.object({
					hook: z
						.string()
						.describe(
							'The first ~2 seconds. It must freeze scroll. Use tension, call-out, or high-relatability moment.',
						),
					story: z
						.string()
						.describe(
							"10–15 second body. Must feel like you're exposing truth, solving pain, or letting them into something 'for insiders only'.",
						),
					cta: z
						.string()
						.describe(
							'Payoff + ask. Follow, comment, stitch, join movement, etc. CTA must feel like an invitation, not an ad.',
						),
				}),
			}),
		)
		.describe(
			'A scheduled list of short-form video ideas/scripts aligned to the storyline and IFC. Length and volume match campaign duration.',
		),

	summary_insight: z
		.string()
		.describe(
			'Blunt truth. How strong is this opportunity, and what absolutely must be true for the growth plan to work.',
		),
});

/**
 * =========================================
 * 3. SYSTEM PROMPT / CORE REASONING
 * =========================================
 */

const SYSTEM_PROMPT = `
You are the "Community-Market Fit & Growth Storyline Strategist Agent" for SheepLoop.

Your mission:
1. Assess if the user's idea can become a *movement* with a loyal following (community-market fit).
2. Define the IFC (Ideal Follower Community) that will actually care, engage, defend, and share.
3. Craft a master STORYLINE that becomes the emotional spine of the brand.
4. Convert that storyline into a concrete, scheduled short-form video campaign built for TikTok/Instagram.
5. Optimize the content for momentum, watch time, emotional stickiness, and follower growth.

You are NOT making generic 'social media tips'.
You are building a narrative machine that can scale.

---------------------------------
PART A. COMMUNITY-MARKET FIT
---------------------------------
- Ask yourself: does this idea naturally create identity, tension, and transformation?
- Strong community-market fit means:
  - The idea speaks to a shared pain/frustration that people already talk about publicly.
  - The idea offers a path to transformation that people want to publicly attach themselves to.
  - The message can turn followers into insiders of a 'movement.'

Rate community-market fit as High / Medium / Low and justify with culture, urgency, and shareability.

---------------------------------
PART B. IFC (Ideal Follower Community)
---------------------------------
Define ONE core IFC that will:
- emotionally resonate with the storyline,
- convert quickly to followers,
- and help spread the message.

Describe:
- Demographics (age, role, money situation, lifestyle pattern).
- Psychographics (what keeps them up at night, what they're chasing, what they hate).
- Content behavior (what they binge, when, why they stop scrolling).
- Why they follow.
- Why they share (status? relatability? rebellion? hope?).

IMPORTANT:
Do NOT describe an abstract 'everyone'. Be very specific and a little raw.

---------------------------------
PART C. STORYLINE
---------------------------------
Design the main storyline. This is the recurring myth we will tell.
It MUST follow a 3-act arc:

Act I: HOOK (Origin / spark / "why this matters NOW")
Act II: CONFLICT (Struggle / the enemy / the emotional cost of doing nothing)
Act III: RESOLUTION (The shared vision / what happens if you join us)

Also produce 3-5 "content_arcs":
- These are mini-serial angles we can repeat and evolve.
  Examples:
   - "Day X of fixing my burnout loop"
   - "The lies the industry tells you"
   - "Behind-the-scenes of building [thing] in public"
   - "Students vs. gatekeepers"

Each arc should be both emotionally resonant and reusable.

---------------------------------
PART D. GROWTH STRATEGY
---------------------------------
Based on the IFC and storyline:
- Define content pillars (repeatable themes that map back to pain, desire, or transformation).
- Define momentum drivers (the formats that produce retention and viral loops: cliffhangers, confessions, challenges, call-out rants, POVs, stitches, duets).
- Define engagement loops: how the audience participates and self-identifies.
- Define frequency for the provided campaign duration.
- Define the single most important growth KPI.

---------------------------------
PART E. SHORTS CAMPAIGN
---------------------------------
Now generate a structured short-form campaign.
For each short:
- Provide title (internal).
- Provide the goal.
- State which platform(s) it's for.
- Write a script with:
  - hook (first ~2 seconds, MUST grab)
  - story (10-15 seconds, MUST feel raw, specific, and tied to the main storyline tension)
  - cta (must feel like joining a movement, not 'buy my product')

The number of shorts you output should match the realistic pacing implied by "duration".
Example:
- If duration = "1 week", assume ~7-10 total shorts.
- If duration = "1 month", assume ~16-20 shorts.
- If duration = "3 months", assume ~36-45 shorts.

---------------------------------
PART F. TONE REQUIREMENTS
---------------------------------
- All language, positioning, and narrative cadence must respect the user's requested "tone".
- If tone is rebellious: call out the enemy.
- If tone is calming: reduce anxiety and promise safety.
- If tone is clinical/expert: promise clarity and control.
- Match platform culture: TikTok tolerates raw jump-cut confessionals; Instagram may prefer more aesthetic, aspirational framing.

---------------------------------
PART G. OUTPUT FORMAT
---------------------------------
You MUST return a JSON object that strictly matches CommunityFitOutputSchema.
No extra top-level keys.
No markdown.
No commentary.

REMINDER:
Everything you output MUST be rooted in the IFC and storyline you defined.
If something doesn't logically connect, do not include it.
`;

/**
 * =========================================
 * 4. AGENT DEFINITION
 * =========================================
 */

export const communityFitStorylineAgent = new Agent({
	name: 'community-fit-storyline-agent',
	description:
		'Evaluates community-market fit, defines IFC, crafts a storyline, and generates a story-driven short-form content campaign for TikTok/Instagram.',
	instructions: SYSTEM_PROMPT,
	model: 'anthropic/claude-haiku-4-5-20251001',

	tools: {}, // placeholder for future: analytics, trend scraping, etc.
});

/**
 * =========================================
 * 5. RUNTIME HELPER
 * =========================================
 * This is what you'll call in your route / server action / workflow.
 *
 * Example usage:
 *
 * const plan = await runCommunityFitStoryline({
 *   idea: "AI coach that helps creators stay consistent with daily content ideas",
 *   vision: "Help creators escape burnout by making consistency effortless",
 *   target_platforms: ["TikTok", "Instagram"],
 *   duration: "1 month",
 *   tone: "Friendly, insightful, a little rebellious against fake hustle gurus",
 *   core_audience_guess: "Ambitious solo creators who can't stay consistent",
 *   constraints: "Solo creator, iPhone only, CapCut edits, no studio",
 *   inspirations_or_competitors: ["Alex Hormozi", "Dee Kay", "Ali Abdaal"],
 *   primary_growth_goal: "Follower growth + waitlist signups"
 * })
 *
 * console.log(plan.storyline.main_theme)
 * console.log(plan.shorts_campaign[0].script.hook)
 */

export async function runCommunityFitStoryline(
	input: z.infer<typeof CommunityFitInputSchema>,
) {
	message('Running Community Fit Storyline Agent...');
	log('Input:', input);
	const parsed = CommunityFitInputSchema.parse(input);

	const prompt = [
		'Using the provided campaign inputs, produce the required JSON output. Return ONLY valid JSON matching CommunityFitOutputSchema. No extra keys, no comments.',
		'\nInputs:',
		JSON.stringify(parsed, null, 2),
	].join('\n');

	const result = await communityFitStorylineAgent.generate(prompt);
	log('Result:', result);
	log('Result text:', result.text);
	log('Result text length:', result.text.length);
	function extractJsonFromText(text: string): unknown {
		// Prefer fenced JSON blocks if present
		const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
		if (fenced && fenced[1]) {
			const candidate = fenced[1].trim();
			try {
				return JSON.parse(candidate);
			} catch {
				error('Error parsing JSON from text:', text);
			}
		}

		// Try direct parse
		const trimmed = text.trim();
		try {
			return JSON.parse(trimmed);
		} catch {
			error('Error parsing JSON from text:', text);
		}

		// Fallback: slice between outermost braces
		const start = trimmed.indexOf('{');
		const end = trimmed.lastIndexOf('}');
		if (start !== -1 && end !== -1 && end > start) {
			const body = trimmed.slice(start, end + 1);
			try {
				return JSON.parse(body);
			} catch {
				error('Error parsing JSON from text:', text);
			}
		}

		error('Model did not return valid JSON.', text);
		throw new Error('Model did not return valid JSON.');
	}

	const json = extractJsonFromText(result.text);

	function toStringArray(value: unknown): string[] | undefined {
		if (Array.isArray(value)) {
			return value
				.map((v) => {
					if (typeof v === 'string') return v;
					if (v && typeof v === 'object') {
						const anyObj = v as Record<string, unknown>;
						for (const key of [
							'title',
							'name',
							'label',
							'text',
							'value',
							'hook',
						]) {
							const vv = anyObj[key];
							if (typeof vv === 'string') return vv;
						}
						return JSON.stringify(v);
					}
					return String(v);
				})
				.filter((s) => s.trim().length > 0);
		}
		return undefined;
	}

	function normalizePlatformString(
		p: string,
	): 'TikTok' | 'Instagram' | 'Both' | undefined {
		switch (p.trim().toLowerCase()) {
			case 'tiktok':
				return 'TikTok';
			case 'instagram':
				return 'Instagram';
			case 'both':
				return 'Both';
			case 'tiktok/instagram':
			case 'instagram/tiktok':
			case 'tiktok & instagram':
			case 'instagram & tiktok':
			case 'all':
				return 'Both';
			default:
				return undefined;
		}
	}

	function normalizePlatform(
		p: unknown,
	): 'TikTok' | 'Instagram' | 'Both' | undefined {
		if (typeof p === 'string') return normalizePlatformString(p);
		if (Array.isArray(p)) {
			const values = p
				.map((v) => (typeof v === 'string' ? v : ''))
				.map((s) => normalizePlatformString(s))
				.filter(
					(v): v is 'TikTok' | 'Instagram' | 'Both' =>
						v !== undefined,
				);
			if (values.includes('Both')) return 'Both';
			const hasTikTok = values.includes('TikTok');
			const hasInstagram = values.includes('Instagram');
			if (hasTikTok && hasInstagram) return 'Both';
			return values[0];
		}
		return undefined;
	}

	function coerceOutput(value: unknown): unknown {
		if (!value || typeof value !== 'object') return value;
		const obj = structuredClone(value as Record<string, any>);

		// Ensure required top-level objects exist
		if (
			!obj.community_market_fit ||
			typeof obj.community_market_fit !== 'object'
		) {
			obj.community_market_fit = {
				score: 'Medium',
				justification: '',
			};
		}
		if (!obj.ifc_profile || typeof obj.ifc_profile !== 'object') {
			obj.ifc_profile = {
				persona: '',
				demographics: '',
				psychographics: '',
				content_behavior: '',
				why_they_follow: '',
				why_they_share: '',
			};
		}
		if (!obj.storyline || typeof obj.storyline !== 'object') {
			obj.storyline = {
				main_theme: '',
				summary: '',
				acts: { hook: '', conflict: '', resolution: '' },
				content_arcs: [],
			};
		}
		if (!obj.growth_strategy || typeof obj.growth_strategy !== 'object') {
			obj.growth_strategy = {
				content_pillars: [],
				momentum_drivers: [],
				engagement_loops: [],
				frequency: '',
				goal: '',
			};
		}
		if (!Array.isArray(obj.shorts_campaign)) {
			obj.shorts_campaign = [];
		}
		if (obj.summary_insight === undefined || obj.summary_insight === null) {
			obj.summary_insight = '';
		}

		// community_market_fit.score normalization
		if (
			obj.community_market_fit &&
			typeof obj.community_market_fit === 'object'
		) {
			const raw = obj.community_market_fit.score;
			if (typeof raw === 'string') {
				const t = raw.trim().toLowerCase();
				if (t.startsWith('hi')) obj.community_market_fit.score = 'High';
				else if (t.startsWith('me'))
					obj.community_market_fit.score = 'Medium';
				else if (t.startsWith('lo'))
					obj.community_market_fit.score = 'Low';
			}
		}

		// ifc_profile coercions
		if (obj.ifc_profile && typeof obj.ifc_profile === 'object') {
			const keys = [
				'persona',
				'demographics',
				'psychographics',
				'content_behavior',
				'why_they_follow',
				'why_they_share',
			] as const;
			for (const k of keys) {
				const v = obj.ifc_profile[k as keyof typeof obj.ifc_profile];
				if (Array.isArray(v)) {
					obj.ifc_profile[k] = v
						.filter(Boolean)
						.map(String)
						.join('\n');
				} else if (v && typeof v === 'object') {
					obj.ifc_profile[k] = JSON.stringify(v);
				} else if (v !== undefined && typeof v !== 'string') {
					obj.ifc_profile[k] = String(v);
				}
			}
		}

		// storyline coercions
		if (obj.storyline && typeof obj.storyline === 'object') {
			if (
				obj.storyline.main_theme &&
				typeof obj.storyline.main_theme !== 'string'
			) {
				obj.storyline.main_theme = String(obj.storyline.main_theme);
			}
			if (
				obj.storyline.summary &&
				typeof obj.storyline.summary !== 'string'
			) {
				obj.storyline.summary = String(obj.storyline.summary);
			}
			if (!obj.storyline.acts || typeof obj.storyline.acts !== 'object') {
				obj.storyline.acts = { hook: '', conflict: '', resolution: '' };
			}
			const arcs = toStringArray(obj.storyline.content_arcs);
			if (arcs) obj.storyline.content_arcs = arcs;
		}

		// growth_strategy coercions
		if (obj.growth_strategy && typeof obj.growth_strategy === 'object') {
			const pillars = toStringArray(obj.growth_strategy.content_pillars);
			if (pillars) obj.growth_strategy.content_pillars = pillars;
			const drivers = toStringArray(obj.growth_strategy.momentum_drivers);
			if (drivers) obj.growth_strategy.momentum_drivers = drivers;
			const loops = toStringArray(obj.growth_strategy.engagement_loops);
			if (loops) obj.growth_strategy.engagement_loops = loops;
			if (
				obj.growth_strategy.frequency &&
				typeof obj.growth_strategy.frequency !== 'string'
			) {
				obj.growth_strategy.frequency = String(
					obj.growth_strategy.frequency,
				);
			}
			if (
				obj.growth_strategy.goal &&
				typeof obj.growth_strategy.goal !== 'string'
			) {
				obj.growth_strategy.goal = String(obj.growth_strategy.goal);
			}
		}

		// shorts_campaign coercions
		if (Array.isArray(obj.shorts_campaign)) {
			obj.shorts_campaign = obj.shorts_campaign
				.map((item: any) => {
					if (item && typeof item === 'object') {
						// title/goal coercion
						if (
							item.title !== undefined &&
							typeof item.title !== 'string'
						) {
							item.title = String(item.title);
						}
						if (
							item.goal !== undefined &&
							typeof item.goal !== 'string'
						) {
							item.goal = String(item.goal);
						}
						// platform normalization with default to Both if unknown
						const plat = normalizePlatform(item.platform);
						item.platform = plat ?? 'Both';
						// script fields coercion
						if (!item.script || typeof item.script !== 'object') {
							item.script = { hook: '', story: '', cta: '' };
						}
						if (item.script && typeof item.script === 'object') {
							for (const key of [
								'hook',
								'story',
								'cta',
							] as const) {
								const v = item.script[key];
								if (Array.isArray(v)) {
									item.script[key] = v
										.filter(Boolean)
										.map(String)
										.join('\n');
								} else if (v && typeof v === 'object') {
									item.script[key] = JSON.stringify(v);
								} else if (
									v !== undefined &&
									typeof v !== 'string'
								) {
									item.script[key] = String(v);
								}
							}
						}
					}
					return item;
				})
				// filter out completely invalid entries
				.filter(
					(it: any) =>
						it && typeof it === 'object' && it.title && it.script,
				);
		}

		// summary_insight string coercion
		if (obj.summary_insight && typeof obj.summary_insight !== 'string') {
			obj.summary_insight = String(obj.summary_insight);
		}

		return obj;
	}

	const first = CommunityFitOutputSchema.safeParse(json);
	if (first.success) {
		log('First attempt successful:', first.success);
		log('First attempt data:', first.data);
		return first.data;
	}

	const coerced = coerceOutput(json);
	const second = CommunityFitOutputSchema.safeParse(coerced);
	if (second.success) {
		log('Second attempt successful:', second.success);
		log('Second attempt data:', second.data);
		return second.data;
	}

	// Retry once: ask model to repair JSON based on errors
	const repairPrompt = [
		'You returned JSON that did not match the required output schema. Fix it.',
		'Rules:',
		'- Return ONLY valid JSON. No markdown, no comments.',
		"- community_market_fit.score must be one of 'High' | 'Medium' | 'Low' (capitalize exactly).",
		'- All required objects must be present: ifc_profile, storyline, growth_strategy.',
		'- storyline.content_arcs, growth_strategy.content_pillars, momentum_drivers, engagement_loops must be arrays of strings.',
		"- shorts_campaign[].platform must be 'TikTok' | 'Instagram' | 'Both' (use 'Both' if for both).",
		'- All string fields must be plain strings.',
		'Validation errors:',
		JSON.stringify(second.error.issues, null, 2),
		'Previous JSON:',
		typeof coerced === 'string'
			? coerced
			: JSON.stringify(coerced, null, 2),
	].join('\n');

	const repair = await communityFitStorylineAgent.generate(repairPrompt);
	log('Repair prompt', repairPrompt);
	const repairedJson = extractJsonFromText(repair.text);
	log('Repaired JSON:', repairedJson);
	const repairedCoerced = coerceOutput(repairedJson);
	log('Repaired coerced:', repairedCoerced);
	const finalAttempt = CommunityFitOutputSchema.safeParse(repairedCoerced);
	log('Final attempt successful:', finalAttempt.success);
	log('Final attempt data:', finalAttempt.data);
	if (finalAttempt.success) {
		return finalAttempt.data;
	}

	// Still failing, surface the initial error
	throw first.error;
}

/**
 * =========================================
 * 6. FUTURE EXTENSIONS
 * =========================================
 * You can later extend this agent with:
 * - trend scraping tools (to detect rising sounds/formats in TikTok niches)
 * - analytics tools (to analyze previous engagement and auto-refine pillars)
 * - auto-scheduler tool that expands shorts_campaign into a dated calendar
 * - script-to-shotlist breakdown (A-roll/B-roll captions, text overlays)
 *
 * But the contract above is already solid for v1 of SheepLoop.
 */
