import { apiClient } from '@/lib/api-client';
import { HTTPError } from 'ky';

export interface GetUserInfoResponse {
	success: boolean;
	message: string;
	user?: {
		username: string;
		email: string;
	};
}

export const getUserInfo = async (
	username: string,
	email: string,
): Promise<GetUserInfoResponse> => {
	try {
		const res = await apiClient.post('users/get-info', {
			json: {
				username,
				email,
			},
		});
		return res.json<GetUserInfoResponse>();
	} catch (err) {
		// Handle HTTP errors from ky
		if (err instanceof HTTPError) {
			try {
				const errorResponse = await err.response.json();
				return {
					success: false,
					message:
						errorResponse.message ||
						'User not found. Please enter valid credentials or create an account.',
				};
			} catch {
				// If response is not JSON, return default message
				return {
					success: false,
					message:
						'User not found. Please enter valid credentials or create an account.',
				};
			}
		}
		// Handle other errors
		return {
			success: false,
			message:
				err instanceof Error
					? err.message
					: 'An error occurred. Please try again.',
		};
	}
};
