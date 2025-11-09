'use client';

import Video from 'next-video';

// Mux video URL - extracted from JSON to avoid build-time processing
// This avoids the Turbopack timeout issue by not importing the video file
const MUX_PLAYBACK_ID = '02wxzYJW3ITNi4tg02r3DZ00HmpAi8HqqAsWK02K91DooNs';
const MUX_HLS_URL = `https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`;
const MUX_POSTER = `https://image.mux.com/${MUX_PLAYBACK_ID}/thumbnail.webp`;

export default function VideoSection() {
	return (
		<section className="py-16 md:py-24 flex items-center justify-center bg-slate-50/50">
			<div className="max-w-screen-xl mx-auto px-6">
				<Video src={MUX_HLS_URL} poster={MUX_POSTER} playsInline />
			</div>
		</section>
	);
}
