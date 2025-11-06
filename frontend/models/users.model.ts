import { apiClient } from '@/lib/api-client';

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
	const res = await apiClient.post('users/get-info', {
		json: {
			username,
			email,
		},
	});
	return res.json<GetUserInfoResponse>();
};
