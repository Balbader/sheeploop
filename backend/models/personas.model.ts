import { eq } from 'drizzle-orm';
import { db } from '@/drizzle';
import { personasTable } from '@/drizzle/schema/personas';
import { error } from '@/lib/print-helpers';

export const PersonasModel = {
	create: async (persona: typeof personasTable.$inferInsert) => {
		const result = await db
			.insert(personasTable)
			.values(persona)
			.returning();
		return result[0];
	},
	findById: async (id: string) => {
		const result = await db
			.select()
			.from(personasTable)
			.where(eq(personasTable.id, id));
		return result[0] || null;
	},
	findByPlanId: async (planId: string) => {
		const result = await db
			.select()
			.from(personasTable)
			.where(eq(personasTable.plan_id, planId));
		return result;
	},
	findByUserId: async (userId: string) => {
		const result = await db
			.select()
			.from(personasTable)
			.where(eq(personasTable.user_id, userId));
		return result.sort((a, b) => {
			const aTime =
				a.created_at instanceof Date
					? a.created_at.getTime()
					: a.created_at;
			const bTime =
				b.created_at instanceof Date
					? b.created_at.getTime()
					: b.created_at;
			return bTime - aTime; // Most recent first
		});
	},
	update: async (
		id: string,
		persona: Partial<typeof personasTable.$inferInsert>,
	) => {
		const result = await db
			.update(personasTable)
			.set({ ...persona, updated_at: new Date() })
			.where(eq(personasTable.id, id))
			.returning();
		return result[0] || null;
	},
};
