import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => {
			return crypto.randomUUID();
		}),
	username: text('username', { length: 255 }).notNull().unique(),
	first_name: text('first_name', { length: 255 }).notNull(),
	last_name: text('last_name', { length: 255 }).notNull(),
	email: text('email', { length: 255 }).notNull().unique(),
	location: text('location', { length: 255 }).notNull(),
	created_at: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => {
			return new Date();
		}),
});
