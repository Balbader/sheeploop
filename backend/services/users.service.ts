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
};
