import { AnimatedSheepBackground } from '@/components/plan-generator/AnimatedSheepBackground';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { UserModel } from '@/backend/models/users.model';
import { GeneratePageContent } from './GeneratePageContent';

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
		<main className="bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
			<AnimatedSheepBackground />
			{/* Prairie background - fixed to viewport */}
			<div
				className="fixed inset-0 pointer-events-none overflow-hidden"
				style={{ zIndex: 0 }}
			>
				{/* Sky gradient */}
				<div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-100 to-green-100 opacity-70" />

				{/* Rolling hills */}
				<svg
					className="absolute bottom-0 w-full h-full opacity-70"
					viewBox="0 0 1200 600"
					preserveAspectRatio="none"
				>
					{/* Distant hills */}
					<path
						d="M0,400 Q200,350 400,380 T800,360 T1200,380 L1200,600 L0,600 Z"
						fill="rgba(21, 128, 61, 0.4)"
					/>
					{/* Middle hills */}
					<path
						d="M0,450 Q300,420 600,440 T1200,430 L1200,600 L0,600 Z"
						fill="rgba(34, 197, 94, 0.5)"
					/>
					{/* Foreground hills */}
					<path
						d="M0,500 Q400,470 800,490 T1200,480 L1200,600 L0,600 Z"
						fill="rgba(74, 222, 128, 0.6)"
					/>
				</svg>

				{/* Grass layer */}
				<div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-green-300 to-transparent opacity-80" />

				{/* Grass blades scattered */}
				<svg
					className="absolute bottom-0 w-full h-full opacity-60"
					viewBox="0 0 1200 600"
					preserveAspectRatio="none"
				>
					{/* Grass blades */}
					{Array.from({ length: 30 }).map((_, i) => {
						const x = (i * 40) % 1200;
						const y = 550 + (i % 5) * 10;
						const height = 15 + (i % 8);
						return (
							<path
								key={i}
								d={`M${x},${y} Q${x - 3},${y - height} ${x},${
									y - height * 1.2
								} T${x},${y - height}`}
								stroke="rgba(21, 128, 61, 0.7)"
								strokeWidth="2"
								fill="none"
							/>
						);
					})}
				</svg>
			</div>
			{/* Clouds in top section */}
			<div
				className="fixed top-0 left-0 w-full h-1/4 pointer-events-none overflow-hidden"
				style={{ zIndex: 0 }}
			>
				{/* Cloud 1 */}
				<svg
					className="absolute top-[10%] left-[5%] w-48 h-24 opacity-60"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M50,60 Q30,40 20,50 T10,55 Q15,45 25,48 T45,52 Q55,35 70,40 T95,38 Q105,28 120,35 T145,33 Q155,23 170,30 T195,28 Q190,38 180,40 T160,42 Q150,50 135,48 T110,50 Q100,55 85,53 T60,55 Q55,62 50,60 Z"
						fill="rgba(255, 255, 255, 0.8)"
					/>
				</svg>
				{/* Cloud 2 */}
				<svg
					className="absolute top-[15%] left-[25%] w-56 h-28 opacity-50"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M60,55 Q40,35 30,45 T20,50 Q25,40 35,43 T55,47 Q65,30 80,35 T105,33 Q115,23 130,30 T155,28 Q165,18 180,25 T200,23 Q195,33 185,35 T165,37 Q155,45 140,43 T115,45 Q105,50 90,48 T65,50 Q60,57 60,55 Z"
						fill="rgba(255, 255, 255, 0.75)"
					/>
				</svg>
				{/* Cloud 3 */}
				<svg
					className="absolute top-[8%] left-[45%] w-44 h-22 opacity-55"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M55,58 Q35,38 25,48 T15,53 Q20,43 30,46 T50,50 Q60,33 75,38 T100,36 Q110,26 125,33 T150,31 Q160,21 175,28 T195,26 Q190,36 180,38 T160,40 Q150,48 135,46 T110,48 Q100,53 85,51 T60,53 Q55,60 55,58 Z"
						fill="rgba(255, 255, 255, 0.7)"
					/>
				</svg>
				{/* Cloud 4 */}
				<svg
					className="absolute top-[12%] left-[65%] w-52 h-26 opacity-45"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M58,53 Q38,33 28,43 T18,48 Q23,38 33,41 T53,45 Q63,28 78,33 T103,31 Q113,21 128,28 T153,26 Q163,16 178,23 T198,21 Q193,31 183,33 T163,35 Q153,43 138,41 T113,43 Q103,48 88,46 T63,48 Q58,55 58,53 Z"
						fill="rgba(255, 255, 255, 0.8)"
					/>
				</svg>
				{/* Cloud 5 */}
				<svg
					className="absolute top-[6%] left-[80%] w-40 h-20 opacity-50"
					viewBox="0 0 200 100"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						d="M52,56 Q32,36 22,46 T12,51 Q17,41 27,44 T47,48 Q57,31 72,36 T97,34 Q107,24 122,31 T147,29 Q157,19 172,26 T192,24 Q187,34 177,36 T157,38 Q147,46 132,44 T107,46 Q97,51 82,49 T57,51 Q52,58 52,56 Z"
						fill="rgba(255, 255, 255, 0.7)"
					/>
				</svg>
			</div>

			<header className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between relative z-10">
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

			<GeneratePageContent />
		</main>
	);
}
