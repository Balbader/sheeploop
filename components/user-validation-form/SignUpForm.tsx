'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { error } from '@/lib/print-helpers';
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from '../ui/hover-card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Info } from 'lucide-react';
import { createUserAction } from '@/actions/create-user.action';
import { usersTable } from '@/drizzle/schema/users';

type Inputs = {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	date_of_birth: Date;
	gender: string;
	country: string;
};

export default function SignUpForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors, isValid },
	} = useForm<Inputs>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		// Convert date_of_birth to timestamp (number)
		let dateOfBirth: number;
		if (data.date_of_birth instanceof Date) {
			dateOfBirth = data.date_of_birth.getTime();
		} else if (typeof data.date_of_birth === 'string') {
			const parsedDate = new Date(data.date_of_birth);
			if (isNaN(parsedDate.getTime())) {
				error('Invalid date of birth', data.date_of_birth);
				return;
			}
			dateOfBirth = parsedDate.getTime();
		} else if (typeof data.date_of_birth === 'number') {
			dateOfBirth = data.date_of_birth;
		} else {
			error('Invalid date of birth format', data.date_of_birth);
			return;
		}

		const userData: typeof usersTable.$inferInsert = {
			first_name: data.first_name,
			last_name: data.last_name,
			username: data.username,
			email: data.email,
			date_of_birth: dateOfBirth as any,
			gender: data.gender,
			country: data.country,
		};

		const response = await createUserAction(userData);
		if (response.success) {
			router.push(`/generate/${response.user?.username}`);
		} else {
			error(response.message, response);
		}
	};

	return (
		<div className="w-full relative z-10 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-4 sm:p-5 shadow-sm">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="relative z-10 space-y-4 sm:space-y-6"
			>
				{/* Username Field */}
				<div className="space-y-2 w-1/2">
					<Label
						htmlFor="username"
						className="text-xs sm:text-sm font-medium"
					>
						Username *
					</Label>
					<Input
						id="username"
						placeholder="Enter your username"
						className="w-full"
						aria-invalid={errors.username ? 'true' : 'false'}
						{...register('username', {
							required: 'Username is required',
						})}
					/>
					{errors.username && (
						<p className="text-xs text-red-600 mt-1">
							{errors.username.message}
						</p>
					)}
				</div>

				<Separator />

				{/* Name Fields */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label
							htmlFor="first_name"
							className="text-xs sm:text-sm font-medium"
						>
							First Name *
						</Label>
						<Input
							id="first_name"
							placeholder="Enter your first name"
							className="w-full"
							aria-invalid={errors.first_name ? 'true' : 'false'}
							{...register('first_name', {
								required: 'First name is required',
							})}
						/>
						{errors.first_name && (
							<p className="text-xs text-red-600 mt-1">
								{errors.first_name.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="last_name"
							className="text-xs sm:text-sm font-medium"
						>
							Last Name *
						</Label>
						<Input
							id="last_name"
							placeholder="Enter your last name"
							className="w-full"
							aria-invalid={errors.last_name ? 'true' : 'false'}
							{...register('last_name', {
								required: 'Last name is required',
							})}
						/>
						{errors.last_name && (
							<p className="text-xs text-red-600 mt-1">
								{errors.last_name.message}
							</p>
						)}
					</div>
				</div>

				<Separator />

				{/* Email Field */}
				<div className="space-y-2">
					<Label
						htmlFor="email"
						className="text-xs sm:text-sm font-medium"
					>
						Email Address *
					</Label>
					<Input
						id="email"
						type="email"
						placeholder="you@example.com"
						className="w-full"
						aria-invalid={errors.email ? 'true' : 'false'}
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Please enter a valid email address',
							},
						})}
					/>
					{errors.email && (
						<p className="text-xs text-red-600 mt-1">
							{errors.email.message}
						</p>
					)}
				</div>

				<Separator />

				{/* Date of Birth Field */}
				<div className="space-y-2">
					<Label
						htmlFor="date_of_birth"
						className="text-xs sm:text-sm font-medium"
					>
						Date of Birth *
					</Label>
					<Input
						id="date_of_birth"
						type="date"
						className="w-full"
						aria-invalid={errors.date_of_birth ? 'true' : 'false'}
						{...register('date_of_birth', {
							required: 'Date of birth is required',
							valueAsDate: true,
							validate: (value) => {
								if (!value) return 'Date of birth is required';
								const today = new Date();
								const age =
									today.getFullYear() - value.getFullYear();
								const monthDiff =
									today.getMonth() - value.getMonth();
								if (
									monthDiff < 0 ||
									(monthDiff === 0 &&
										today.getDate() < value.getDate())
								) {
									return age - 1 < 13
										? 'You must be at least 13 years old'
										: true;
								}
								return age < 13
									? 'You must be at least 13 years old'
									: true;
							},
						})}
					/>
					{errors.date_of_birth && (
						<p className="text-xs text-red-600 mt-1">
							{errors.date_of_birth.message}
						</p>
					)}
				</div>

				<Separator />

				{/* Gender Field */}
				<div className="space-y-2">
					<Label
						htmlFor="gender"
						className="text-xs sm:text-sm font-medium"
					>
						Gender *
					</Label>
					<Controller
						name="gender"
						control={control}
						rules={{ required: 'Gender is required' }}
						render={({ field }) => (
							<Select
								value={field.value}
								onValueChange={field.onChange}
							>
								<SelectTrigger
									id="gender"
									className="w-full"
									aria-invalid={
										errors.gender ? 'true' : 'false'
									}
								>
									<SelectValue placeholder="Select your gender" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="male">Male</SelectItem>
									<SelectItem value="female">
										Female
									</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
					{errors.gender && (
						<p className="text-xs text-red-600 mt-1">
							{errors.gender.message}
						</p>
					)}
				</div>

				<Separator />

				{/* Country Field */}
				<div className="space-y-2">
					<Label
						htmlFor="country"
						className="text-xs sm:text-sm font-medium"
					>
						Country *
					</Label>
					<Input
						id="country"
						placeholder="Enter your country"
						className="w-full"
						aria-invalid={errors.country ? 'true' : 'false'}
						{...register('country', {
							required: 'Country is required',
						})}
					/>
					{errors.country && (
						<p className="text-xs text-red-600 mt-1">
							{errors.country.message}
						</p>
					)}
					<p className="text-xs text-gray-500 mt-1">
						Help us tailor content for your region
					</p>
				</div>

				<Separator />

				{/* Submit Button */}
				<div className="flex justify-center pt-2">
					<HoverCard>
						<HoverCardTrigger asChild>
							<Info className="w-4 h-4" />
						</HoverCardTrigger>
						<HoverCardContent>
							<p>Please fill in all fields to continue</p>
						</HoverCardContent>
						<Button
							type="button"
							onClick={handleSubmit(onSubmit)}
							disabled={
								!(
									watch('username') &&
									watch('first_name') &&
									watch('last_name') &&
									watch('email') &&
									watch('date_of_birth') &&
									watch('gender') &&
									watch('country')
								) || !isValid
							}
							className="rounded-full px-5 py-3 text-sm hover:font-bold hover:bg-green-500 hover:text-white"
						>
							Sign Up
						</Button>
					</HoverCard>
				</div>
			</form>
		</div>
	);
}
