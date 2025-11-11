import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

/**
 * Schema for storing the output from GenerateMarketingStrategyForm.
 * The output matches CommunityFitOutputSchema structure:
 * {
 *   community_market_fit: {
 *     score: { alignment, virality, engagement, differentiation },
 *     summary: string[]
 *   },
 *   ifc_profile: {
 *     demographics, psychographics, pain_points, triggers, community_behaviors
 *   },
 *   personas: [
 *     {
 *       name, segment, description, key_motivation, core_pain_point,
 *       platform_behavior, preferred_tone_style,
 *       storyline: { title, theme, arc: { hook, transformation, outcome }, emotional_driver, core_message },
 *       growth_strategy: { objective, posting_frequency, content_pillars[], engagement_tactics[], kpis[] },
 *       scripts: [{ title, duration, script, cta, day_of_week, preferred_time }]
 *     }
 *   ]
 * }
 */
export const formOutputTable = sqliteTable('form_output', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => usersTable.id),
	// Complete JSON output from GenerateMarketingStrategyForm matching CommunityFitOutputSchema
	form_output: text('form_output', { mode: 'json' }).notNull(),
	created_at: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => {
			return new Date();
		}),
	updated_at: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => {
			return new Date();
		}),
});
