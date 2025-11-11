import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

export const personasTable = sqliteTable('personas', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => usersTable.id),
	plan_id: text('plan_id'), // Reference to go-to-market plan (using text to avoid circular dependency)
	persona_name: text('persona_name').notNull(),
	description: text('description').notNull(),
	key_motivation: text('key_motivation').notNull(),
	core_pain_point: text('core_pain_point').notNull(),
	platform_behavior: text('platform_behavior').notNull(),
	preferred_tone_style: text('preferred_tone_style').notNull(),
	storyline: text('storyline', { mode: 'json' }).notNull(),
	growth_strategy: text('growth_strategy', { mode: 'json' }).notNull(),
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
