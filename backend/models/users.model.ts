import { eq, sql } from 'drizzle-orm';
import { db } from '@/drizzle';
import { usersTable } from '@/drizzle/schema/users';
import { error } from '@/lib/print-helpers';

export const UserModel = {
	create: async (user: typeof usersTable.$inferInsert) => {
		const result = await db.insert(usersTable).values(user).returning();
		return result[0];
	},
	findByUsername: async (username: string) => {
		if (!username) {
			error('Username is required', username);
			return null;
		}
		const result = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, username));
		return result[0] || null;
	},
	findByEmail: async (email: string) => {
		const result = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email));
		return result[0] || null;
	},
	findById: async (id: string) => {
		const result = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, id));
		return result[0] || null;
	},
	incrementLoginCount: async (userId: string) => {
		const result = await db
			.update(usersTable)
			.set({ login_count: sql`login_count + 1` })
			.where(eq(usersTable.id, userId))
			.returning();
		return result[0] || null;
	},
};
