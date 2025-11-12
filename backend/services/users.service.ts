import * as Model from '@/backend/models/users.model';
import { type usersTable } from '@/drizzle/schema/users';
import { message, error, log } from '@/lib/print-helpers';

type UserInsertInput = Omit<typeof usersTable.$inferInsert, 'date_of_birth'> & {
	date_of_birth: Date | number | string;
};

export const UsersService = {
	create: async (user: UserInsertInput) => {
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

		// Convert date_of_birth to Date if it's a number (timestamp)
		const dateOfBirth =
			user.date_of_birth instanceof Date
				? user.date_of_birth
				: typeof user.date_of_birth === 'number'
				? new Date(user.date_of_birth)
				: new Date(user.date_of_birth as string);

		const userData = {
			...user,
			email: user.email.toLowerCase(),
			date_of_birth: dateOfBirth,
		};

		message('Creating user...');
		const newUser = await Model.UserModel.create(userData);
		// Increment login_count for signup (first login)
		if (newUser?.id) {
			await Model.UserModel.incrementLoginCount(newUser.id);
			// Fetch updated user to return with incremented login_count
			const updatedUser = await Model.UserModel.findById(newUser.id);
			log('User created', updatedUser);
			return updatedUser || newUser;
		}
		log('User created', newUser);
		return newUser;
	},
	getUserInfo: async (username?: string, email?: string) => {
		let userName: typeof usersTable.$inferSelect | null = null;
		let userEmail: typeof usersTable.$inferSelect | null = null;
		if (username) {
			userName = await Model.UserModel.findByUsername(username);
			if (!userName) {
				error('User not found', username);
				throw new Error('User not found with username: ' + username);
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
			// Verify both username and email belong to the same user
			if (userName.id !== userEmail.id) {
				error('Username and email do not match the same user', {
					username,
					email,
				});
				throw new Error(
					'Username and email do not match the same user',
				);
			}
			// Increment login_count for successful login
			if (userName.id) {
				await Model.UserModel.incrementLoginCount(userName.id);
			}
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
		return undefined;
	},
};
