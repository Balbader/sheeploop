'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useRef } from 'react';
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

	const sheepContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		let cleanup: (() => void) | null = null;
		(async () => {
			try {
				const { gsap } = await import('gsap');
				if (!sheepContainerRef.current) return;
				const container = sheepContainerRef.current;
				const numSheep = 10;
				const anims: any[] = [];
				const sheepElems: HTMLDivElement[] = [];

				for (let i = 0; i < numSheep; i++) {
					const sheep = document.createElement('div');
					sheep.className = 'absolute pointer-events-none';
					sheep.style.left = `${Math.random() * 100}%`;
					sheep.style.top = `-100px`;

					const img = document.createElement('img');
					img.src = '/sheep-2.png';
					img.alt = 'Sheep';
					img.className =
						'w-10 h-10 sm:w-12 sm:h-12 object-contain opacity-90';

					sheep.appendChild(img);
					container.appendChild(sheep);
					sheepElems.push(sheep);

					const startDelay = i * 0.35;
					const fallDuration = 10 + Math.random() * 6;
					const startXPercent = Math.random() * 100;
					const horizontalDrift = (Math.random() - 0.5) * 80;

					gsap.set(sheep, {
						x: `${startXPercent}%`,
						y: -120,
						rotation: 0,
					});

					const fallAnim = gsap.to(sheep, {
						y: window.innerHeight + 200,
						x: `${
							startXPercent +
							(horizontalDrift / window.innerWidth) * 100
						}%`,
						rotation: (Math.random() - 0.5) * 30,
						duration: fallDuration,
						ease: 'none',
						delay: startDelay,
						repeat: -1,
						onRepeat: () => {
							const newX = Math.random() * 100;
							gsap.set(sheep, {
								x: `${newX}%`,
								y: -120,
								rotation: 0,
							});
							fallAnim.vars.x = `${
								newX +
								(horizontalDrift / window.innerWidth) * 100
							}%` as any;
						},
					});

					const rotateAnim = gsap.to(sheep, {
						rotation: `+=${(Math.random() - 0.5) * 35}`,
						duration: 2 + Math.random() * 2,
						repeat: -1,
						yoyo: true,
						ease: 'sine.inOut',
						delay: startDelay,
					});

					anims.push(fallAnim, rotateAnim);
				}

				cleanup = () => {
					anims.forEach((a) => a?.kill?.());
					sheepElems.forEach((el) => el.remove());
				};
			} catch (_) {}
		})();
		return () => {
			if (cleanup) cleanup();
		};
	}, []);

	return (
		<>
			<div className="flex justify-center items-center mb-4 gap-2 text-green-600">
				<span className="animate-bounce">🐑</span>
				<h2 className="text-2xl font-bold">Welcome Back!</h2>
				<span className="animate-bounce">🐑</span>
			</div>
			<div className="l relative z-10 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-4 sm:p-5 shadow-sm">
				<div
					ref={sheepContainerRef}
					className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
				/>
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
									message:
										'Please enter a valid email address',
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
		</>
	);
}
