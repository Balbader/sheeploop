import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '@/backend/models/users.model';

export async function GET(req: NextRequest) {
	try {
		const users = await UserModel.findAll();

		// Transform the data to match the expected format
		// created_at needs to be a number timestamp
		// location is mapped to country to match the schema
		const transformedUsers = users.map((user) => ({
			id: user.id,
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			country: user.location, // Map location to country for schema compatibility
			login_count: user.login_count,
			created_at:
				user.created_at instanceof Date
					? user.created_at.getTime()
					: typeof user.created_at === 'number'
					? user.created_at
					: new Date(user.created_at).getTime(),
		}));

		return NextResponse.json(transformedUsers, { status: 200 });
	} catch (err: any) {
		const message = err instanceof Error ? err.message : 'Unknown error';

		return NextResponse.json(
			{
				success: false,
				message: `Error fetching users: ${message}`,
			},
			{ status: 500 },
		);
	}
}
