import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

export const goToMarketPlansTable = sqliteTable('go_to_market_plans', {
	id: text('id').primaryKey(),
	user_id: text('user_id').references(() => usersTable.id),
	name: text('name').notNull(),
	idea: text('idea').notNull(),
	description: text('description').notNull(),
	audience: text('audience').notNull(),
	platforms: text('platforms').notNull(),
	content_strategy: text('content_strategy').notNull(),
	content_format: text('content_format').notNull(),
	content_length: integer('content_length').notNull(),
	content_frequency: integer('content_frequency').notNull(),
	content_type: text('content_type').notNull(),
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
