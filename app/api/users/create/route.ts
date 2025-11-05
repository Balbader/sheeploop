import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/backend/services';
import { error } from '@/lib/print-helpers';

export async function POST(request: NextRequest) {
	const body = await request.json();
	try {
		const user = await users.create(body);
		return NextResponse.json({
			success: true,
			message: 'User created successfully',
			user,
		});
	} catch (err) {
		error('Error creating user', err);
		const errorMessage =
			err instanceof Error ? err.message : 'Error creating user';
		return NextResponse.json(
			{
				success: false,
				message: errorMessage,
				error:
					process.env.NODE_ENV === 'development'
						? String(err)
						: undefined,
			},
			{ status: 500, statusText: 'Internal Server Error' },
		);
	}
}
