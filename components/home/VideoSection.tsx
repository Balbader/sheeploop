import Video from 'next-video';
import SheepLoopVideo from '@/videos/sheeploop-v1.mp4';

export default function VideoSection() {
	return (
		<section className="py-16 md:py-24 flex items-center justify-center">
			<div className="max-w-screen-xl mx-auto px-6 border-2 border-green-500 rounded-lg overflow-hidden">
				<Video src={SheepLoopVideo} playsInline />
			</div>
		</section>
	);
}
