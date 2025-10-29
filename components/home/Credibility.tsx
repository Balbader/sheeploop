'use client';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
export default function Credibility() {
	return (
		<section className="py-16 md:py-24">
			<div className="max-w-screen-xl mx-auto px-6">
				<div className="rounded-2xl border border-gray-200 bg-slate-50 p-6 md:p-10">
					<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-center">
						Built for serious founders and creators.
					</h2>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
						<Card className="p-5">
							<p className="text-gray-700">
								Powered by deep market analysis, not guesswork.
							</p>
						</Card>
						<Card className="p-5">
							<p className="text-gray-700">
								Inspired by playbooks from top creator-led
								brands.
							</p>
						</Card>
						<Card className="p-5">
							<p className="text-gray-700">
								Early users saw 3x faster engagement in 30 days.
							</p>
						</Card>
					</div>

					<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
						<Card className="md:col-span-2 p-6">
							<div className="flex items-start gap-3">
								<Avatar>
									<AvatarFallback>TL</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm text-gray-500">
										Testimonial
									</p>
									<blockquote className="mt-1 text-gray-800 leading-relaxed">
										“Before SheepLoop, we posted randomly.
										Now we have a storyline and schedule
										that actually builds momentum.”
									</blockquote>
								</div>
							</div>
						</Card>
						<Card className="p-6">
							<p className="text-sm text-gray-500">As seen in</p>
							<div className="mt-3 grid grid-cols-3 gap-3">
								<div className="h-10 rounded bg-gray-100" />
								<div className="h-10 rounded bg-gray-100" />
								<div className="h-10 rounded bg-gray-100" />
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
