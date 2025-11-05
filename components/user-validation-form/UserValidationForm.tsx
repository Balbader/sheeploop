'use client';

import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { log, error, message } from '@/lib/print-helpers';
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from '../ui/hover-card';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { createUserAction } from '@/actions/create-user.action';

type Inputs = {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	location: string;
};

export default function UserValidationForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm<Inputs>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const response = await createUserAction({
			first_name: data.first_name,
			last_name: data.last_name,
			username: data.username,
			email: data.email,
			location: data.location,
		});
		if (response.success) {
			router.push('/generate');
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

				{/* Location Field */}
				<div className="space-y-2">
					<Label
						htmlFor="location"
						className="text-xs sm:text-sm font-medium"
					>
						Location *
					</Label>
					<Input
						id="location"
						placeholder="Country"
						className="w-full"
						aria-invalid={errors.location ? 'true' : 'false'}
						{...register('location', {
							required: 'Location is required',
						})}
					/>
					{errors.location && (
						<p className="text-xs text-red-600 mt-1">
							{errors.location.message}
						</p>
					)}
					<p className="text-xs text-gray-500 mt-1">
						Help us tailor content for your region
					</p>
				</div>

				<Separator />

				{/* Submit Button */}
				<div className="flex justify-end pt-2">
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
									watch('location')
								) || !isValid
							}
							className="rounded-full px-6 py-3 text-sm sm:text-base min-h-[44px] w-full sm:w-auto onhover: cursor-pointer"
						>
							<Link href="/generate" className="text-white">
								Sign Up
							</Link>
						</Button>
					</HoverCard>
				</div>
			</form>
		</div>
	);
}
