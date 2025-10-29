import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="py-10 border-t border-gray-200 bg-white">
			<div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<Image
						src="/sheep.png"
						alt="SheepLoop logo"
						width={24}
						height={24}
						className="rounded"
					/>
					<div className="flex flex-col">
						<span className="text-sm font-medium">SheepLoop</span>
						<span className="text-xs text-gray-500">
							Simply follow the path.
						</span>
					</div>
				</div>
				<nav className="text-xs text-gray-500 flex items-center gap-4">
					<a href="#" className="hover:text-gray-700">
						Privacy
					</a>
					<a href="#" className="hover:text-gray-700">
						Terms
					</a>
					<a href="#" className="hover:text-gray-700">
						Contact
					</a>
				</nav>
			</div>
		</footer>
	);
}
