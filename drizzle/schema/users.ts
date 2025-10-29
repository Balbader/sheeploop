import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => {
			return crypto.randomUUID();
		}),
	first_name: text('first_name', { length: 255 }).notNull(),
	last_name: text('last_name', { length: 255 }).notNull(),
	email: text('email', { length: 255 }).notNull().unique(),
	created_at: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => {
			return new Date();
		}),
});
