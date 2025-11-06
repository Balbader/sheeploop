import { apiClient } from '@/lib/api-client';

export const getUserInfo = async () => {
	return  apiClient.get('/users/me');
};
