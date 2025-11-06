import { Form } from './form';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { UserModel } from '@/backend/models/users.model';

export default async function Page({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username: rawUsername } = await params;
	const username = decodeURIComponent((rawUsername ?? '').trim());
	if (!username) {
		redirect('/');
	}
	const user = await UserModel.findByUsername(username);
	if (!user) {
		redirect('/');
	}
	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
			{/* Subtle animated background matching hero */}
			<div
				className="absolute inset-0 opacity-80 pointer-events-none"
				style={{
					background:
						'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.35) 0%, transparent 60%)',
				}}
			/>

			<header className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between relative z-10">
				<Link href="/">
					<div className="flex items-center gap-2 sm:gap-3">
						<Image
							src="/sheep.png"
							alt="SheepLoop logo"
							width={32}
							height={32}
							className="rounded flex-shrink-0"
						/>
						<span className="text-sm sm:text-base font-semibold">
							SheepLoop
						</span>
					</div>
				</Link>
				<div>
					<Button
						asChild
						variant="outline"
						className="rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm min-h-[44px]"
					>
						<Link href="/">Logout</Link>
					</Button>
				</div>
			</header>

			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12 sm:pb-16 md:pb-24 relative z-10">
				<div className="mx-auto max-w-3xl text-center mb-6 sm:mb-8 md:mb-12">
					<h1 className="mt-3 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight px-2">
						Generate Your Community Fit Storyline
					</h1>
					<p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2">
						Fill in the details about your idea and get a tailored
						content strategy designed to help you find your
						community on TikTok.
					</p>
				</div>
				<Form />
			</div>
		</main>
	);
}
