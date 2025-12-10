'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from '../ui/hover-card';
import { Alert, AlertDescription } from '../ui/alert';
import { Info, AlertCircle } from 'lucide-react';
import { error, message, log } from '@/lib/print-helpers';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/frontend/models/users.model';

type Inputs = {
	username: string;
	email: string;
};

export default function LoginForm() {
	const router = useRouter();
	const [loginError, setLoginError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm<Inputs>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setLoginError(null);
		setIsLoading(true);

		try {
			const response = await getUserInfo(data.username, data.email);
			if (response.success && response.user?.username) {
				message(
					'User found with username: ' +
						response.user.username +
						' and email: ' +
						response.user.email,
				);
				// Redirect to generate page with username
				router.push(
					`/generate/${encodeURIComponent(response.user.username)}`,
				);
			} else {
				setLoginError(
					response.message ||
						'User not found. Please enter valid credentials or create an account.',
				);
				error(response.message, response);
				setIsLoading(false);
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: 'An error occurred. Please try again.';
			setLoginError(errorMessage);
			error('Login error', err);
			setIsLoading(false);
		}
	};

	return (
		<div className="relative z-10 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-4 sm:p-5 shadow-sm max-h-[calc(100vh-200px)] overflow-y-auto overscroll-contain scroll-smooth">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="relative z-10 space-y-4 sm:space-y-6"
			>
				{/* Error Alert */}
				{loginError && (
					<Alert variant="destructive" className="mb-4">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{loginError}</AlertDescription>
					</Alert>
				)}

				{/* Username Field */}
				<div className="space-y-2 w-full sm:w-1/2">
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
							type="submit"
							onClick={handleSubmit(onSubmit)}
							disabled={
								!(watch('username') && watch('email')) ||
								!isValid ||
								isLoading
							}
							className="rounded-full px-5 py-3 text-sm hover:font-bold hover:bg-green-500 hover:text-white"
						>
							{isLoading ? 'Loading...' : 'Log In'}
						</Button>
					</HoverCard>
				</div>
			</form>
		</div>
	);
}
