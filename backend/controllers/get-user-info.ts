import * as service from '@/backend/services';
import { NextRequest, NextResponse } from 'next/server';
import { error } from '@/lib/print-helpers';

export async function GET(request: NextRequest) {
	try {
		const user = await service.users.getUserInfo();
		return NextResponse.json(user);
	} catch (err) {
		error('Error getting user info', err);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
