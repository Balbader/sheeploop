import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

/**
 * Schema for storing individual script entries from GenerateMarketingStrategyForm output.
 * Each script matches the structure from personas[].scripts[]:
 * { title, duration, script, cta, day_of_week, preferred_time }
 */
export const shortsScriptsTable = sqliteTable('shorts_scripts', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => usersTable.id),
	go_to_market_plan_id: text('go_to_market_plan_id'), // Reference to the go-to-market plan (using text to avoid circular dependency)
	persona_id: text('persona_id'), // Which persona this script belongs to (using text to avoid circular dependency)

	// Script fields matching the output structure
	title: text('title').notNull(), // Internal label for the short
	duration: text('duration').notNull(), // Approx length, ex: "20s", "30s"
	script: text('script').notNull(), // Full spoken flow with hard hook in first ~2s
	cta: text('cta').notNull(), // Call to action matching persona's psychology
	day_of_week: text('day_of_week').notNull(), // Day to post, e.g., "Monday", "Tuesday"
	preferred_time: text('preferred_time').notNull(), // Platform-specific optimal posting time, e.g., "9:00 AM", "6:00 PM"

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
