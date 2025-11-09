'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { toast } from 'sonner';
import { Send, Loader2, Mail, User, MessageSquare } from 'lucide-react';

const contactFormSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	subject: z.string().min(3, 'Subject must be at least 3 characters'),
	message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		mode: 'onChange',
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		(async () => {
			try {
				const { gsap } = await import('gsap');
				if (!containerRef.current) return;

				// Animate form entry
				const formElements =
					containerRef.current.querySelectorAll('[data-animate]');
				if (formElements.length > 0) {
					gsap.set(formElements, {
						opacity: 0,
						y: 20,
					});
					gsap.to(formElements, {
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: 'power2.out',
						stagger: 0.1,
						delay: 0.2,
					});
				}
			} catch (_) {
				// no-op if gsap not available
			}
		})();
	}, []);

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.message || 'Failed to send message');
			}

			toast.success('Message sent!', {
				description: "We'll get back to you soon.",
			});

			reset();
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Failed to send message. Please try again later.';

			toast.error('Failed to send message', {
				description: errorMessage,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card
			ref={containerRef}
			className="relative overflow-hidden border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 shadow-lg"
		>
			{/* Subtle animated background gradient */}
			<div className="absolute inset-0 opacity-30 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-blue-50" />
			</div>

			<CardHeader className="relative z-10" data-animate>
				<CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight">
					Get in touch
				</CardTitle>
				<CardDescription className="text-base mt-2">
					Have a question or feedback? We'd love to hear from you!
					Send us a message and we'll respond as soon as possible.
				</CardDescription>
			</CardHeader>

			<CardContent className="relative z-10">
				<form
					ref={formRef}
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6"
				>
					{/* Name Field */}
					<div className="space-y-2" data-animate>
						<Label
							htmlFor="name"
							className="text-sm font-medium flex items-center gap-2"
						>
							<User className="w-4 h-4 text-green-600" />
							Name *
						</Label>
						<Input
							id="name"
							placeholder="Your full name"
							className="w-full transition-all focus:ring-2 focus:ring-green-500/20"
							aria-invalid={errors.name ? 'true' : 'false'}
							{...register('name')}
						/>
						{errors.name && (
							<p className="text-xs text-red-600 mt-1 flex items-center gap-1">
								{errors.name.message}
							</p>
						)}
					</div>

					{/* Email Field */}
					<div className="space-y-2" data-animate>
						<Label
							htmlFor="email"
							className="text-sm font-medium flex items-center gap-2"
						>
							<Mail className="w-4 h-4 text-green-600" />
							Email *
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							className="w-full transition-all focus:ring-2 focus:ring-green-500/20"
							aria-invalid={errors.email ? 'true' : 'false'}
							{...register('email')}
						/>
						{errors.email && (
							<p className="text-xs text-red-600 mt-1 flex items-center gap-1">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Subject Field */}
					<div className="space-y-2" data-animate>
						<Label
							htmlFor="subject"
							className="text-sm font-medium flex items-center gap-2"
						>
							<MessageSquare className="w-4 h-4 text-green-600" />
							Subject *
						</Label>
						<Input
							id="subject"
							placeholder="What's this about?"
							className="w-full transition-all focus:ring-2 focus:ring-green-500/20"
							aria-invalid={errors.subject ? 'true' : 'false'}
							{...register('subject')}
						/>
						{errors.subject && (
							<p className="text-xs text-red-600 mt-1 flex items-center gap-1">
								{errors.subject.message}
							</p>
						)}
					</div>

					{/* Message Field */}
					<div className="space-y-2" data-animate>
						<Label
							htmlFor="message"
							className="text-sm font-medium flex items-center gap-2"
						>
							<MessageSquare className="w-4 h-4 text-green-600" />
							Message *
						</Label>
						<Textarea
							id="message"
							placeholder="Tell us what's on your mind..."
							rows={6}
							className="w-full resize-none transition-all focus:ring-2 focus:ring-green-500/20"
							aria-invalid={errors.message ? 'true' : 'false'}
							{...register('message')}
						/>
						{errors.message && (
							<p className="text-xs text-red-600 mt-1 flex items-center gap-1">
								{errors.message.message}
							</p>
						)}
						<p className="text-xs text-gray-500 mt-1">
							Minimum 10 characters required
						</p>
					</div>

					{/* Submit Button */}
					<div className="pt-2" data-animate>
						<Button
							type="submit"
							disabled={isSubmitting || !isValid}
							className="w-full rounded-full px-6 py-3 text-sm font-semibold bg-black hover:bg-gradient-to-r hover:from-green-400 hover:via-green-500 hover:to-green-600 text-white hover:font-bold shadow-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin mr-2" />
									Sending...
								</>
							) : (
								<>
									<Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
									Send Message
								</>
							)}
						</Button>
					</div>
				</form>

				{/* Additional Info */}
				<div
					className="mt-6 pt-6 border-t border-slate-200"
					data-animate
				>
					<p className="text-sm text-gray-600 text-center">
						We typically respond within 24 hours. For urgent
						matters, please reach out via email.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
