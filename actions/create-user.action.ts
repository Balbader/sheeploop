import { usersTable } from '@/drizzle/schema/users';
import { apiClient } from '@/lib/api-client';
import { error, message } from '@/lib/print-helpers';
import { HTTPError } from 'ky';

export async function createUserAction(user: typeof usersTable.$inferInsert) {
	try {
		message(`Creating user... ${user.username}`);
		const response = await apiClient
			.post('/users/create', {
				json: user,
			})
			.json<{ success: boolean; message: string; user?: any }>();

		if (!response.success) {
			return {
				success: false,
				message: response.message || 'Error creating user',
				error: response,
			};
		}

		return {
			success: true,
			message: response.message || 'User created successfully',
			user: response.user,
		};
	} catch (err) {
		error('Error creating user', err);

		// Handle HTTP errors from ky
		if (err instanceof HTTPError) {
			try {
				const errorResponse = await err.response.json();
				return {
					success: false,
					message: errorResponse.message || 'Error creating user',
					error: errorResponse,
				};
			} catch {
				return {
					success: false,
					message: err.message || 'Error creating user',
					error: err,
				};
			}
		}

		return {
			success: false,
			message: err instanceof Error ? err.message : 'Error creating user',
			error: err,
		};
	}
}
