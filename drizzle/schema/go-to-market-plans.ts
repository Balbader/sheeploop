import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

export const goToMarketPlansTable = sqliteTable('go_to_market_plans', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => usersTable.id),

	// Input fields from GenerateMarketingStrategyForm
	idea: text('idea').notNull(),
	vision: text('vision').notNull(), // objective/goal
	target_platforms: text('target_platforms').notNull(), // JSON array of platforms
	duration: text('duration').notNull(), // e.g., "1 week", "2 weeks"
	posting_frequency: text('posting_frequency').notNull(), // e.g., "1 post/day", "2 posts/day"
	tone: text('tone').notNull(), // comma-separated tones or single tone
	number_of_personas: text('number_of_personas').notNull(), // "1", "2", etc.
	device: text('device'), // "iPhone 5s", "Android", "Other" (optional)
	device_name: text('device_name'), // specific device name if device is selected (optional)

	// Output from community-fit-storyline agent (stored as JSON string)
	output: text('output').notNull(), // Complete JSON output matching CommunityFitOutputSchema

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
