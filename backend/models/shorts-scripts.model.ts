import { eq } from 'drizzle-orm';
import { db } from '@/drizzle';
import { shortsScriptsTable } from '@/drizzle/schema/shorts';
import { error } from '@/lib/print-helpers';

export const ShortsScriptsModel = {
	create: async (script: typeof shortsScriptsTable.$inferInsert) => {
		const result = await db
			.insert(shortsScriptsTable)
			.values(script)
			.returning();
		return result[0];
	},
	createMany: async (scripts: (typeof shortsScriptsTable.$inferInsert)[]) => {
		if (scripts.length === 0) return [];
		const result = await db
			.insert(shortsScriptsTable)
			.values(scripts)
			.returning();
		return result;
	},
	findById: async (id: string) => {
		const result = await db
			.select()
			.from(shortsScriptsTable)
			.where(eq(shortsScriptsTable.id, id));
		return result[0] || null;
	},
	findByPlanId: async (planId: string) => {
		const result = await db
			.select()
			.from(shortsScriptsTable)
			.where(eq(shortsScriptsTable.go_to_market_plan_id, planId));
		return result;
	},
	findByPersonaId: async (personaId: string) => {
		const result = await db
			.select()
			.from(shortsScriptsTable)
			.where(eq(shortsScriptsTable.persona_id, personaId));
		return result;
	},
	findByUserId: async (userId: string) => {
		const result = await db
			.select()
			.from(shortsScriptsTable)
			.where(eq(shortsScriptsTable.user_id, userId));
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
		script: Partial<typeof shortsScriptsTable.$inferInsert>,
	) => {
		const result = await db
			.update(shortsScriptsTable)
			.set({ ...script, updated_at: new Date() })
			.where(eq(shortsScriptsTable.id, id))
			.returning();
		return result[0] || null;
	},
};
