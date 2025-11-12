import Image from 'next/image';
import Link from 'next/link';

export function AdminHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between gap-4">
				<Link
					href="/"
					className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
				>
					<Image
						src="/sheep.png"
						alt="SheepLoop logo"
						width={32}
						height={32}
						className="rounded sm:w-9 sm:h-9"
					/>
					<span className="text-sm sm:text-base font-semibold">
						Sheep<span className="text-green-600">Loop</span>
					</span>
				</Link>

				<div className="flex items-center gap-3 sm:gap-4">
					<h1 className="text-sm sm:text-base font-medium text-muted-foreground hidden sm:block">
						Admin Dashboard
					</h1>
					<div className="h-4 w-px bg-border hidden sm:block" />
					<div className="flex items-center gap-2">
						{/* Additional header actions can be added here */}
					</div>
				</div>
			</div>
		</header>
	);
}
