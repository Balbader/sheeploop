import { Form } from './form';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Page() {
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

			<header className="max-w-screen-xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
				<div className="flex items-center gap-3">
					<Image
						src="/sheep.png"
						alt="SheepLoop logo"
						width={32}
						height={32}
						className="rounded"
					/>
					<span className="text-base font-semibold">SheepLoop</span>
				</div>
				<div>
					<Button
						asChild
						variant="outline"
						className="rounded-full px-5 py-2.5 text-sm"
					>
						<Link href="/">Back to Home</Link>
					</Button>
				</div>
			</header>

			<div className="max-w-screen-xl mx-auto px-6 pt-6 pb-16 md:pb-24 relative z-10">
				<div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
					<h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight">
						Generate Your Community Fit Storyline
					</h1>
					<p className="mt-4 text-gray-600 leading-relaxed md:text-lg">
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
