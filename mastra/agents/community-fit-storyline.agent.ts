import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { message, log, error } from '@/lib/print-helpers';

/**
 * =========================================
 * 1. INPUT SCHEMA
 * =========================================
 * Data the founder submits.
 */

export const CommunityFitInputSchema = z.object({
	idea: z
		.string()
		.describe(
			"Short description of the product / project / movement we're trying to build a community around.",
		),
	vision: z
		.string()
		.describe(
			'Long-term mission or “why this matters.” Why does this deserve to become a community, not just a product?',
		),
	target_platforms: z
		.array(z.enum(['TikTok', 'Instagram Reels', 'YouTube Shorts']))
		.describe('Which short-form platforms this sprint is targeting.')
		.nonempty(),
	duration: z
		.string()
		.describe(
			"Length of the initial sprint (ex: '1 week', '1 month', '3 months'). Used to size posting frequency.",
		),
	tone: z
		.string()
		.describe(
			"Voice / posture of the brand. Ex: 'friendly and brutally honest', 'calm and reassuring', 'rebellious anti-guru', 'clinical and data-driven'.",
		),
	core_audience_guess: z
		.string()
		.describe(
			"Your current guess of who you're trying to reach. Ex: 'burned-out solo founders', 'first-time creators stuck under 1k followers'.",
		),
	constraints: z
		.string()
		.describe(
			'Real-world limits. Budget, time, ability to film, gear, edit capacity, etc.',
		)
		.optional(),
	inspirations_or_competitors: z
		.array(z.string())
		.describe(
			'Creators / brands / accounts that feel like the vibe, the format, or the positioning of what you want to become.',
		)
		.default([]),
	primary_growth_goal: z
		.string()
		.describe(
			"Single most important growth KPI for this sprint. Ex: 'follower growth on TikTok', 'drive 100 Discord joins', 'validate a storyline'.",
		)
		.optional(),
});

/**
 * =========================================
 * 2. OUTPUT SCHEMA (NEW)
 * =========================================
 * We are now:
 * - scoring community fit in detail,
 * - defining an Ideal Follower Profile (IFC),
 * - generating 5 personas (5 distinct sub-markets),
 * - building storyline + growth strategy + TikTok scripts per persona.
 *
 * NOTE:
 * The agent MUST return EXACTLY this shape.
 */

const Score010 = z
	.number()
	.int()
	.min(0)
	.max(10)
	.describe('Integer from 0 to 10.');

export const CommunityFitOutputSchema = z.object({
	community_market_fit: z.object({
		score: z.object({
			alignment: Score010.describe(
				'How strongly the idea maps to an urgent shared identity / problem. 0-10.',
			),
			virality: Score010.describe(
				'How “clippable” and socially transmissible the message is in short-form formats. 0-10.',
			),
			engagement: Score010.describe(
				'How likely people are to reply, stitch, comment, self-identify. 0-10.',
			),
			differentiation: Score010.describe(
				'How non-generic / non-commodity this story feels vs. current feeds. 0-10.',
			),
		}),
		summary: z
			.array(
				z
					.string()
					.describe(
						'Why this idea can or cannot become a community movement. Cultural tension, emotional hook, transformation promise.',
					),
			)
			.min(1)
			.max(5)
			.describe('3-5 key bullet points.'),
	}),

	ifc_profile: z.object({
		demographics: z
			.string()
			.describe(
				'Age range, life stage, role, money context, lifestyle pattern.',
			),
		psychographics: z
			.string()
			.describe(
				'Deep motivations, fears, identity goals, frustrations. The emotional core.',
			),
		pain_points: z
			.string()
			.describe(
				'Top problems they feel daily that this idea can speak to directly.',
			),
		triggers: z
			.string()
			.describe(
				'Moments that make them stop scrolling and pay attention. Phrases, insults, brag moments, anxieties, etc.',
			),
		community_behaviors: z
			.string()
			.describe(
				'How they behave socially: do they stitch/rant? Do they quietly lurk and save? Do they brag about progress?',
			),
	}),

	personas: z
		.array(
			z.object({
				name: z
					.string()
					.describe('Persona label, ex: "Burnout Coder".'),
				segment: z
					.string()
					.describe(
						'Market slice this persona represents, ex: "early-stage solo founder", "creative student", "freelance social media manager".',
					),
				description: z
					.string()
					.describe(
						'Who they are in plain human terms. Daily life snapshot.',
					),
				key_motivation: z
					.string()
					.describe(
						'What they are chasing right now. Hope / goal / desire.',
					),
				core_pain_point: z
					.string()
					.describe(
						'Biggest frustration tied to the idea. The pain we weaponize in hooks.',
					),
				platform_behavior: z
					.string()
					.describe(
						'How they consume/post on TikTok / Reels / Shorts. Binge patterns, posting fears, cringe tolerance.',
					),
				preferred_tone_style: z
					.string()
					.describe(
						'The voice they trust. (Rebellious? Calm mentor? Brutal honesty? Tactical coach?)',
					),

				storyline: z.object({
					title: z
						.string()
						.describe(
							'Storyline headline for THIS persona. Emotional headline they’d repeat.',
						),
					theme: z
						.string()
						.describe(
							'Main thematic promise (identity, transformation, rebellion, survival…).',
						),
					arc: z.object({
						hook: z
							.string()
							.describe(
								'Act I. Why this matters right NOW for this persona. The spark.',
							),
						transformation: z
							.string()
							.describe(
								'Act II. The journey / struggle / build-in-public angle.',
							),
						outcome: z
							.string()
							.describe(
								'Act III. Vision of what life looks like if they “join the movement.”',
							),
					}),
					emotional_driver: z
						.string()
						.describe(
							'Primary emotion to hit: shame, ambition, revenge, pride, relief, etc.',
						),
					core_message: z
						.string()
						.describe(
							'One-sentence rally cry for this persona. Sticky, repeatable.',
						),
				}),

				growth_strategy: z.object({
					objective: z
						.string()
						.describe(
							'Goal of the 1-week sprint for THIS persona. Ex: "Get them to follow", "Make them comment their struggle", "Push them into Discord".',
						),
					posting_frequency: z
						.string()
						.describe(
							'How often we post during the 1-week TikTok sprint for this persona, ex: "2 posts/day for 7 days".',
						),
					content_pillars: z
						.array(
							z
								.string()
								.describe(
									'Repeatable themes specifically tuned to this persona. Ex: "Burnout confessions", "Live progress log", "Industry lies", "Micro-tutorials".',
								),
						)
						.min(2),
					engagement_tactics: z
						.array(
							z
								.string()
								.describe(
									'Interactive mechanics: stitches, duets, "comment X if", public call-outs, challenges, POV skits, etc.',
								),
						)
						.min(1),
					kpis: z
						.array(
							z
								.string()
								.describe(
									'How success is measured this week for this persona. Ex: follows, comments with pain, DMs asking for help.',
								),
						)
						.min(1),
				}),

				scripts: z
					.array(
						z.object({
							title: z
								.string()
								.describe(
									'Internal label for the short. This is not shown publicly.',
								),
							duration: z
								.string()
								.describe('Approx length, ex: "20s", "30s".'),
							script: z
								.string()
								.describe(
									'Full spoken flow. Must include a HARD hook in first ~2s, emotional twist, and transformation promise.',
								),
							cta: z
								.string()
								.describe(
									'Call to action that matches this persona’s psychology. (Follow, comment, stitch, join waitlist.)',
								),
						}),
					)
					.min(3)
					.max(5)
					.describe(
						'3-5 TikTok-ready short scripts tailored to this persona’s storyline and psychology.',
					),
			}),
		)
		.min(5)
		.max(5)
		.describe(
			'Exactly 5 distinct personas representing 5 different market segments.',
		),
});

/**
 * =========================================
 * 3. SYSTEM PROMPT / CORE REASONING (UPDATED)
 * =========================================
 *
 * This prompt reflects the new spec:
 * - assess community market fit
 * - define IFC
 * - create 5 personas across 5 market segments
 * - for each persona: storyline, growth strategy, and 1-week TikTok sprint scripts
 * - strict JSON output
 */

const SYSTEM_PROMPT = `
You are the "Community Market Fit Engine."

ROLE
You are an expert Community Market Fit Strategist. You turn a raw idea into:
1. A community-market-fit assessment.
2. An Ideal Follower Profile (IFC).
3. Five distinct personas across five different target sub-markets.
4. A storyline for each persona.
5. A one-week TikTok sprint growth plan for each persona.
6. Viral short-form scripts for that persona.

GOAL
Your job is to engineer FOLLOWER GROWTH through emotionally-resonant, story-driven short video content.
Your output will be used directly to run a 1-week TikTok sprint.

CONTEXT INPUTS (will be provided at runtime)
- idea
- vision
- target_platforms
- duration
- tone
- core_audience_guess
- constraints
- inspirations_or_competitors
- primary_growth_goal

TASKS

-------------------------------------------------
1. COMMUNITY MARKET FIT ASSESSMENT
-------------------------------------------------
Evaluate how strong this idea is at becoming a CULTURE, not just content.
Score (0-10 integer each):
- alignment: Does this clearly match a social/identity tension people already feel?
- virality: Is it naturally clippable / stitchable / rantable in short-form?
- engagement: Will people comment their own pain, stitch with their version, argue, self-identify?
- differentiation: Does it feel fresh compared to existing creators in this space?

Then produce 3-5 bullet-point insights:
- Why this idea could spark movement.
- Where its emotional leverage is.
- How it frames "us vs them" / transformation.

-------------------------------------------------
2. IFC (IDEAL FOLLOWER PROFILE)
-------------------------------------------------
Define the single MOST RESPONSIVE "ideal follower" archetype who will latch onto this message first.
Include:
- demographics
- psychographics
- pain_points
- triggers (what instantly hooks them in the feed)
- community_behaviors (how they behave socially: stitch? lurk? brag? confess?)

Be specific. Be a little raw. This is not a sanitized marketing persona. This is a real human.

-------------------------------------------------
3. FIVE PERSONAS / FIVE USER MARKETS
-------------------------------------------------
Create exactly 5 personas. Each persona must:
- Represent a DISTINCT market slice or audience cluster.
- NOT be redundant with the others.
- Have unique motivations, pains, tone preferences, and platform behaviors.

For each persona you MUST include:
name
segment
description
key_motivation
core_pain_point
platform_behavior
preferred_tone_style

-------------------------------------------------
4. STORYLINE PER PERSONA
-------------------------------------------------
For each persona, design a storyline that will be the backbone of content targeting them specifically.

Must include:
- title
- theme
- arc:
   - hook (Act I: "why this matters right now")
   - transformation (Act II: "the journey / fight / behind-the-scenes")
   - outcome (Act III: "the promised future if you join us")
- emotional_driver (shame, ambition, revenge, pride, relief, etc.)
- core_message (their one-sentence rally cry)

This storyline will be used to generate multiple videos with consistent emotional DNA.

-------------------------------------------------
5. GROWTH STRATEGY PER PERSONA
-------------------------------------------------
For each persona:
- objective for a 1-week TikTok sprint aimed at THEM
- posting_frequency for that 1-week sprint
- content_pillars: repeatable angles that keep feeding this persona's need
- engagement_tactics: stitches, duets, challenges, "comment X if..." etc.
- kpis: how we measure if that persona is moving

All of this must respect:
- the provided "tone"
- the provided "duration" (assume sprint = 1 week even if duration input is longer)

-------------------------------------------------
6. VIRAL SHORT SCRIPTS (3-5 PER PERSONA)
-------------------------------------------------
For each persona, generate 3-5 TikTok-native scripts.
Each script MUST have:
- title (internal label)
- duration (e.g. "20s", "30s")
- script (the spoken flow)
- cta (what we ask them to do at the end)

The script MUST:
- Hook HARD in first ~2 seconds with a call-out, accusation, confession, or high tension claim.
- Show a relatable emotional twist or pain.
- End with a CTA that matches that persona's psychology. (Follow to join the movement / drop your struggle / stitch with your version / etc.)
No generic "Like and subscribe." Make it feel like joining a movement.

-------------------------------------------------
7. TONE & PLATFORM
-------------------------------------------------
- Honor the "tone" input. If tone is rebellious, attack the common enemy. If tone is calming, promise safety. If tone is clinical, promise control and clarity.
- Respect the culture of TikTok: fast hook, emotional tension, conversational pacing.

-------------------------------------------------
8. OUTPUT RULES
-------------------------------------------------
You MUST return ONLY a valid JSON object.
It MUST match the CommunityFitOutputSchema exactly.
Do NOT include markdown.
Do NOT include comments.
Do NOT include extra top-level keys.
No trailing commas.

IMPORTANT:
personas MUST be length 5.
Each persona MUST include scripts length 3 to 5.

END OF SPEC.
`;

/**
 * =========================================
 * 4. AGENT DEFINITION
 * =========================================
 */

export const communityFitStorylineAgent = new Agent({
	name: 'community-fit-storyline-agent',
	description:
		'Assesses community-market fit, defines the IFC, generates 5 distinct personas, and builds a storyline + 1-week TikTok sprint plan + viral scripts for each persona.',
	instructions: SYSTEM_PROMPT,
	model: 'anthropic/claude-haiku-4-5',
	tools: {}, // extend in future
});

/**
 * =========================================
 * 5. RUNTIME HELPER
 * =========================================
 *
 * This function:
 * - validates input
 * - calls the agent
 * - parses + coerces model output into the Zod schema
 * - attempts one repair pass if needed
 */

export async function runCommunityFitStoryline(
	input: z.infer<typeof CommunityFitInputSchema>,
) {
	message('Running Community Market Fit Engine...');
	log('Input:', input);

	// validate input against schema
	const parsed = CommunityFitInputSchema.parse(input);

	// prompt we send to the agent
	const prompt = [
		'Using the provided campaign inputs, produce the required JSON output. Return ONLY valid JSON that matches CommunityFitOutputSchema. No extra keys, no comments.',
		'Inputs:',
		JSON.stringify(parsed, null, 2),
	].join('\n');

	const result = await communityFitStorylineAgent.generate(prompt);

	log('Raw result:', result);
	log('Result text length:', result.text.length);

	/**
	 * Extractor: tries fenced json, direct json, then outermost braces.
	 */
	function extractJsonFromText(text: string): unknown {
		const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
		if (fenced && fenced[1]) {
			const candidate = fenced[1].trim();
			try {
				return JSON.parse(candidate);
			} catch {
				error('Error parsing fenced JSON.', text);
			}
		}

		const trimmed = text.trim();
		try {
			return JSON.parse(trimmed);
		} catch {
			error('Direct parse failed, attempting brace slice.', text);
		}

		const start = trimmed.indexOf('{');
		const end = trimmed.lastIndexOf('}');
		if (start !== -1 && end !== -1 && end > start) {
			const body = trimmed.slice(start, end + 1);
			try {
				return JSON.parse(body);
			} catch {
				error('Brace-slice parse failed.', text);
			}
		}

		error('Model did not return valid JSON.', text);
		throw new Error('Model did not return valid JSON.');
	}

	const json = extractJsonFromText(result.text);

	/**
	 * Helpers to normalize/repair model output into our strict schema.
	 */

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

	function coerceInt010(n: unknown): number | undefined {
		if (typeof n === 'number') {
			if (Number.isInteger(n)) {
				if (n < 0) return 0;
				if (n > 10) return 10;
				return n;
			}
			return Math.round(Math.min(10, Math.max(0, n)));
		}
		if (typeof n === 'string') {
			const parsed = parseInt(n, 10);
			if (!Number.isNaN(parsed)) {
				if (parsed < 0) return 0;
				if (parsed > 10) return 10;
				return parsed;
			}
		}
		return undefined;
	}

	function ensureString(x: unknown): string {
		if (x === undefined || x === null) return '';
		if (typeof x === 'string') return x;
		return JSON.stringify(x);
	}

	function ensureScriptsArray(v: unknown): any[] {
		if (!Array.isArray(v)) return [];
		return v
			.map((s) => {
				if (!s || typeof s !== 'object') return null;
				const o = s as any;
				return {
					title: ensureString(o.title),
					duration: ensureString(o.duration),
					script: ensureString(o.script),
					cta: ensureString(o.cta),
				};
			})
			.filter(
				(s) =>
					s &&
					s.title.trim() &&
					s.duration.trim() &&
					s.script.trim() &&
					s.cta.trim(),
			);
	}

	function ensurePersona(p: any): any {
		if (!p || typeof p !== 'object') p = {};

		const storylineArc = p.storyline?.arc ?? {};
		const growth = p.growth_strategy ?? {};

		return {
			name: ensureString(p.name),
			segment: ensureString(p.segment),
			description: ensureString(p.description),
			key_motivation: ensureString(p.key_motivation),
			core_pain_point: ensureString(p.core_pain_point),
			platform_behavior: ensureString(p.platform_behavior),
			preferred_tone_style: ensureString(p.preferred_tone_style),

			storyline: {
				title: ensureString(p.storyline?.title),
				theme: ensureString(p.storyline?.theme),
				arc: {
					hook: ensureString(storylineArc.hook),
					transformation: ensureString(storylineArc.transformation),
					outcome: ensureString(storylineArc.outcome),
				},
				emotional_driver: ensureString(p.storyline?.emotional_driver),
				core_message: ensureString(p.storyline?.core_message),
			},

			growth_strategy: {
				objective: ensureString(growth.objective),
				posting_frequency: ensureString(growth.posting_frequency),
				content_pillars: toStringArray(growth.content_pillars) ?? [],
				engagement_tactics:
					toStringArray(growth.engagement_tactics) ?? [],
				kpis: toStringArray(growth.kpis) ?? [],
			},

			scripts: ensureScriptsArray(p.scripts),
		};
	}

	function coerceOutput(value: unknown): unknown {
		if (!value || typeof value !== 'object') return value;

		const obj = structuredClone(value as Record<string, any>);

		// community_market_fit
		if (
			!obj.community_market_fit ||
			typeof obj.community_market_fit !== 'object'
		) {
			obj.community_market_fit = {};
		}
		if (!obj.community_market_fit.score)
			obj.community_market_fit.score = {};
		const score = obj.community_market_fit.score;

		const aligned = coerceInt010(score.alignment);
		const viral = coerceInt010(score.virality);
		const engage = coerceInt010(score.engagement);
		const diff = coerceInt010(score.differentiation);

		obj.community_market_fit.score = {
			alignment: aligned ?? 5,
			virality: viral ?? 5,
			engagement: engage ?? 5,
			differentiation: diff ?? 5,
		};

		if (!Array.isArray(obj.community_market_fit.summary)) {
			const maybeArr = toStringArray(obj.community_market_fit.summary);
			obj.community_market_fit.summary =
				maybeArr && maybeArr.length > 0
					? maybeArr
					: ['No summary provided'];
		}

		// ifc_profile
		if (!obj.ifc_profile || typeof obj.ifc_profile !== 'object') {
			obj.ifc_profile = {};
		}
		obj.ifc_profile = {
			demographics: ensureString(obj.ifc_profile.demographics),
			psychographics: ensureString(obj.ifc_profile.psychographics),
			pain_points: ensureString(obj.ifc_profile.pain_points),
			triggers: ensureString(obj.ifc_profile.triggers),
			community_behaviors: ensureString(
				obj.ifc_profile.community_behaviors,
			),
		};

		// personas
		if (!Array.isArray(obj.personas)) {
			obj.personas = [];
		}
		obj.personas = obj.personas.map(ensurePersona);

		// enforce exactly 5 personas – if model gave >5, slice, if <5, pad repeats
		if (obj.personas.length > 5) {
			obj.personas = obj.personas.slice(0, 5);
		}
		if (obj.personas.length < 5 && obj.personas.length > 0) {
			while (obj.personas.length < 5) {
				obj.personas.push(structuredClone(obj.personas[0]));
			}
		}
		// if zero, create 5 empty skeletons
		if (obj.personas.length === 0) {
			const emptyPersona = ensurePersona({});
			obj.personas = Array.from({ length: 5 }, () => ({
				...emptyPersona,
			}));
		}

		return obj;
	}

	// First validation attempt
	const first = CommunityFitOutputSchema.safeParse(json);
	if (first.success) {
		log('First attempt passed schema validation.', first.data);
		return first.data;
	}

	// Try coercion/normalization pass
	const coerced = coerceOutput(json);
	const second = CommunityFitOutputSchema.safeParse(coerced);
	if (second.success) {
		log('Second attempt passed after coercion.', second.data);
		return second.data;
	}

	// Last resort: ask model to repair
	const repairPrompt = [
		'You returned JSON that did not match the required output schema. Fix it.',
		'Rules:',
		'- Return ONLY valid JSON. No markdown, no comments.',
		'- community_market_fit.score must be integers 0-10 for alignment, virality, engagement, differentiation.',
		'- community_market_fit.summary must be an array of 3-5 short strings.',
		'- ifc_profile must include demographics, psychographics, pain_points, triggers, community_behaviors as strings.',
		'- personas must be an array of EXACTLY 5 persona objects.',
		'- Each persona must include:',
		'  name, segment, description, key_motivation, core_pain_point, platform_behavior, preferred_tone_style.',
		'- Each persona.storyline must include title, theme, arc {hook, transformation, outcome}, emotional_driver, core_message.',
		'- Each persona.growth_strategy must include objective, posting_frequency, content_pillars[], engagement_tactics[], kpis[].',
		'- Each persona.scripts must be an array of 3-5 scripts, each with title, duration, script, cta.',
		'- NO extra top-level keys.',
		'- NO trailing commas.',
		'Validation errors:',
		JSON.stringify(second.error.issues, null, 2),
		'Previous JSON:',
		typeof coerced === 'string'
			? coerced
			: JSON.stringify(coerced, null, 2),
	].join('\n');

	const repair = await communityFitStorylineAgent.generate(repairPrompt);
	log('Repair raw text length:', repair.text.length);

	const repairedJson = extractJsonFromText(repair.text);
	const repairedCoerced = coerceOutput(repairedJson);

	const finalAttempt = CommunityFitOutputSchema.safeParse(repairedCoerced);
	log('Final attempt success:', finalAttempt.success);
	if (finalAttempt.success) {
		return finalAttempt.data;
	}

	// If still failing, throw first error (the most informative dev-wise)
	throw first.error;
}

/**
 * =========================================
 * 6. FUTURE EXTENSIONS
 * =========================================
 * - persona->content calendar builder
 * - audio hook generator (auto-cuts hook lines into captions)
 * - trend miner (pull top stitches in the niche and align hooks)
 * - Discord funnel builder per persona
 *
 * This version is already aligned with:
 * - multi-persona coverage
 * - IFC definition
 * - emotional storyline design
 * - 1-week TikTok sprint plan per persona
 * - 3-5 viral scripts tailored per persona
 */
