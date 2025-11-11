import { eq } from 'drizzle-orm';
import { db } from '@/drizzle';
import { ifcProfileTable } from '@/drizzle/schema/ifc-profile';
import { error } from '@/lib/print-helpers';

export const IfcProfileModel = {
	create: async (profile: typeof ifcProfileTable.$inferInsert) => {
		const result = await db
			.insert(ifcProfileTable)
			.values(profile)
			.returning();
		return result[0];
	},
	findById: async (id: string) => {
		const result = await db
			.select()
			.from(ifcProfileTable)
			.where(eq(ifcProfileTable.id, id));
		return result[0] || null;
	},
	findByPlanId: async (planId: string) => {
		const result = await db
			.select()
			.from(ifcProfileTable)
			.where(eq(ifcProfileTable.go_to_market_plan_id, planId));
		return result[0] || null;
	},
	findByUserId: async (userId: string) => {
		const result = await db
			.select()
			.from(ifcProfileTable)
			.where(eq(ifcProfileTable.user_id, userId));
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
		profile: Partial<typeof ifcProfileTable.$inferInsert>,
	) => {
		const result = await db
			.update(ifcProfileTable)
			.set({ ...profile, updated_at: new Date() })
			.where(eq(ifcProfileTable.id, id))
			.returning();
		return result[0] || null;
	},
};
