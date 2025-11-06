import { NextRequest, NextResponse } from 'next/server';
import { UsersService } from '@/backend/services/users.service';

export async function POST(req: NextRequest) {
	try {
		const { username, email } = await req.json();

		const result = await UsersService.getUserInfo(username, email);

		if (!result || !result.success) {
			return NextResponse.json(
				{
					success: false,
					message: 'User not found. Please enter valid credentials or create an account.'
				},
				{ status: 404 },
			);
		}

		return NextResponse.json(result, { status: 200 });
	} catch (err: any) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		const isNotFound = message?.toLowerCase().includes('not found');

		return NextResponse.json(
			{
				success: false,
				message: isNotFound
					? 'User not found. Please enter valid credentials or create an account.'
					: message
			},
			{ status: isNotFound ? 404 : 500 },
		);
	}
}
