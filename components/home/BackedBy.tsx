import Image from 'next/image';
import { Card } from '../ui/card';

export default function BackedBy() {
	return (
		<section className="py-8 md:py-12  flex items-center justify-center">
			<div className="max-w-screen-xl mx-auto px-6">
				<h2 className="text-sm md:text-lg font-semibold tracking-tight text-center mb-6">
					Backed by
				</h2>
				<div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
					<Card className="p-3 bg-black flex items-center justify-center ">
						<Image
							src="/ai-lab.svg"
							alt="AI Lab"
							width={100}
							height={50}
							className="h-4 w-auto"
						/>
					</Card>
					<Card className="p-3 flex items-center justify-center">
						<div className="flex items-center justify-center gap-4">
							<Image
								src="/station-f-logo.jpeg"
								alt="Station F"
								width={100}
								height={50}
								className="h-4 w-auto"
							/>
							<Image
								src="/stationf.svg"
								alt="Station F"
								width={100}
								height={50}
								className="h-4 w-auto"
							/>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
