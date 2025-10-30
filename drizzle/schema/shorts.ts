import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

export const shorts = sqliteTable('shorts_plans', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => usersTable.id),
	script: text('script').notNull(),
	script_length: integer('script_length').notNull(),
	script_format: text('script_format').notNull(),
	script_strategy: text('script_strategy').notNull(),
	script_topics: text('script_topics', { mode: 'json' }).notNull(),
	script_created_at: integer('script_created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => {
			return new Date();
		}),
	script_updated_at: integer('script_updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => {
			return new Date();
		}),
});
