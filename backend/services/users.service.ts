import * as Model from '@/backend/models/users.model';
import { type usersTable } from '@/drizzle/schema/users';
import { message, error, log } from '@/lib/print-helpers';

export const UsersService = {
	create: async (user: typeof usersTable.$inferInsert) => {
		if (
			!user.email ||
			!user.username ||
			!user.first_name ||
			!user.last_name
		) {
			error('Missing required fields', user);
			throw new Error('Missing required fields');
		}

		const existingUser = await Model.UserModel.findByEmail(user.email);
		if (existingUser) {
			error('User with this email already exists', user);
			throw new Error('User with this email already exists');
		}
		const userData = {
			...user,
			email: user.email.toLowerCase(),
		};

		message('Creating user...');
		const newUser = await Model.UserModel.create(userData);
		log('User created', newUser);
		return newUser;
	},
	getUserInfo: async (username?: string, email?: string) => {
		try {
			let userName: typeof usersTable.$inferSelect | null = null;
			let userEmail: typeof usersTable.$inferSelect | null = null;
			if (username) {
				userName = await Model.UserModel.findByUsername(username);
				if (!userName) {
					error('User not found', username);
					throw new Error(
						'User not found with username: ' + username,
					);
				}
			}
			if (email) {
				userEmail = await Model.UserModel.findByEmail(email);
				if (!userEmail) {
					error('User not found', email);
					throw new Error('User not found with email: ' + email);
				}
			}
			if (userName && userEmail) {
				return {
					success: true,
					message:
						'User found with username: ' +
						username +
						' and email: ' +
						email,
					user: {
						username: userName.username,
						email: userEmail.email,
					},
				};
			}
		} catch (err) {
			error('Error getting user info', err);
			throw new Error('Error getting user info');
		}
	},
};
