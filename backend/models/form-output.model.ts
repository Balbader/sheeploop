import { eq } from 'drizzle-orm';
import { db } from '@/drizzle';
import { formOutputTable } from '@/drizzle/schema/form-output';
import { error } from '@/lib/print-helpers';

export const FormOutputModel = {
	create: async (output: typeof formOutputTable.$inferInsert) => {
		const result = await db
			.insert(formOutputTable)
			.values(output)
			.returning();
		return result[0];
	},
	findById: async (id: string) => {
		const result = await db
			.select()
			.from(formOutputTable)
			.where(eq(formOutputTable.id, id));
		return result[0] || null;
	},
	findByUserId: async (userId: string) => {
		const result = await db
			.select()
			.from(formOutputTable)
			.where(eq(formOutputTable.user_id, userId));
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
		output: Partial<typeof formOutputTable.$inferInsert>,
	) => {
		const result = await db
			.update(formOutputTable)
			.set({ ...output, updated_at: new Date() })
			.where(eq(formOutputTable.id, id))
			.returning();
		return result[0] || null;
	},
};
