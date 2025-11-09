import Video from 'next-video';
import SheepLoopVideo from '@/videos/sheeploop-v1.mp4';

export default function VideoSection() {
	return (
		<section className="py-16 md:py-24">
			<div className="max-w-screen-xl mx-auto px-6">
				<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-center">
					See it in action
				</h2>
				<Video src={SheepLoopVideo} autoplay loop muted playsInline />
			</div>
		</section>
	);
}
