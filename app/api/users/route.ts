import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '@/backend/models/users.model';

export async function GET(req: NextRequest) {
	try {
		const users = await UserModel.findAll();

		// Transform the data to match the expected format
		// created_at needs to be a number timestamp
		const transformedUsers = users.map((user) => {
			// Calculate age from date_of_birth
			const dateOfBirth =
				user.date_of_birth instanceof Date
					? user.date_of_birth
					: typeof user.date_of_birth === 'number'
					? new Date(user.date_of_birth)
					: new Date(user.date_of_birth);
			const today = new Date();
			let age = today.getFullYear() - dateOfBirth.getFullYear();
			const monthDiff = today.getMonth() - dateOfBirth.getMonth();
			if (
				monthDiff < 0 ||
				(monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
			) {
				age--;
			}

			return {
				id: user.id,
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				country: user.country,
				age: age,
				gender: user.gender,
				login_count: user.login_count,
				created_at:
					user.created_at instanceof Date
						? user.created_at.getTime()
						: typeof user.created_at === 'number'
						? user.created_at
						: new Date(user.created_at).getTime(),
			};
		});

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
