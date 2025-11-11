import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

export const ifcProfileTable = sqliteTable('ifc_profile', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => usersTable.id),
	go_to_market_plan_id: text('go_to_market_plan_id'), // Reference to go-to-market plan (using text to avoid circular dependency)
	demographics: text('demographics').notNull(),
	psychographics: text('psychographics').notNull(),
	pain_points: text('pain_points').notNull(),
	triggers: text('triggers').notNull(),
	community_behaviors: text('community_behaviors').notNull(),
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
