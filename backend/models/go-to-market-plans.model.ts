import { eq } from 'drizzle-orm';
import { db } from '@/drizzle';
import { goToMarketPlansTable } from '@/drizzle/schema/go-to-market-plans';
import { error } from '@/lib/print-helpers';

export const GoToMarketPlansModel = {
	create: async (plan: typeof goToMarketPlansTable.$inferInsert) => {
		const result = await db
			.insert(goToMarketPlansTable)
			.values(plan)
			.returning();
		return result[0];
	},
	findById: async (id: string) => {
		const result = await db
			.select()
			.from(goToMarketPlansTable)
			.where(eq(goToMarketPlansTable.id, id));
		return result[0] || null;
	},
	findByUserId: async (userId: string) => {
		const result = await db
			.select()
			.from(goToMarketPlansTable)
			.where(eq(goToMarketPlansTable.user_id, userId));
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
		plan: Partial<typeof goToMarketPlansTable.$inferInsert>,
	) => {
		const result = await db
			.update(goToMarketPlansTable)
			.set({ ...plan, updated_at: new Date() })
			.where(eq(goToMarketPlansTable.id, id))
			.returning();
		return result[0] || null;
	},
};
