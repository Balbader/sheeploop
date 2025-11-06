import { NextRequest, NextResponse } from 'next/server';
import { UsersService } from '@/backend/services/users.service';

export async function POST(req: NextRequest) {
	try {
		const { username, email } = await req.json();

		const result = await UsersService.getUserInfo(username, email);

		return NextResponse.json(
			result ?? { success: false, message: 'User not found' },
			{ status: result?.success ? 200 : 404 },
		);
	} catch (err: any) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		return NextResponse.json(
			{ success: false, message },
			{
				status: message?.toLowerCase().includes('not found')
					? 404
					: 500,
			},
		);
	}
}
