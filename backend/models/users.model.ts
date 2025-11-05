import { eq } from 'drizzle-orm';
import { db } from '@/drizzle';
import { usersTable } from '@/drizzle/schema/users';

export const UserModel = {
	create: async (user: typeof usersTable.$inferInsert) => {
		const result = await db.insert(usersTable).values(user).returning();
		return result[0];
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
};
