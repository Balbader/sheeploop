import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="py-10 border-t border-gray-200 bg-white">
			<div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<Image
						src="/sheep.png"
						alt="SheepLoop logo"
						width={36}
						height={36}
						className="rounded"
					/>
					<div className="flex flex-col">
						<span className="text-sm font-semibold">
							Sheep<span className="text-green-600">Loop</span>
						</span>
						<span className="text-xs text-gray-500">
							Simply follow the path.
						</span>
					</div>
				</div>
				<div className="flex flex-col items-center md:items-end gap-2">
					<nav className="text-xs text-gray-500 flex items-center gap-4">
						<Link
							href="/faq"
							className="hover:text-green-500 hover:font-bold transition-all duration-300"
						>
							FAQ
						</Link>
						<Link
							href="/privacy"
							className="hover:text-green-500 hover:font-bold transition-all duration-300"
						>
							Privacy
						</Link>
						<Link
							href="/terms"
							className="hover:text-green-500 hover:font-bold transition-all duration-300"
						>
							Terms
						</Link>
						<Link
							href="/contact"
							className="hover:text-green-500 hover:font-bold transition-all duration-300"
						>
							Contact
						</Link>
					</nav>
					<div className="text-xs text-gray-500 text-center md:text-right">
						<span>
							Copyright © 2025 SheepLoop.llc
							<br /> All rights reserved.
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
