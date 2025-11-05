'use client';

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
import Link from 'next/link';
import { Info } from 'lucide-react';

type Inputs = {
	username: string;
	email: string;
};

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm<Inputs>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		// TODO: Handle form submission
	};

	return (
		<div className="l relative z-10 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-4 sm:p-5 shadow-sm">
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
				<div className="flex justify-end pt-2">
					<HoverCard>
						<HoverCardTrigger asChild>
							<Info className="w-4 h-4" />
						</HoverCardTrigger>
						<HoverCardContent>
							<p>Please fill in all fields to continue</p>
						</HoverCardContent>
						<Button
							type="submit"
							disabled={
								!(watch('username') && watch('email')) ||
								!isValid
							}
							className="rounded-full px-6 py-3 text-sm sm:text-base min-h-[44px] w-full sm:w-auto onhover: cursor-pointer"
						>
							<Link href="/generate" className="text-white">
								Continue
							</Link>
						</Button>
					</HoverCard>
				</div>
			</form>
		</div>
	);
}
