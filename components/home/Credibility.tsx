'use client';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import FormSelectionTabs from '../user-validation-form/FormSelectionTabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import MaintenanceOngoing from '../maintenance-ongoing/MaintenanceOngoing';

export default function Credibility() {
	return (
		<section className="py-16 md:py-24">
			<div className="max-w-screen-xl mx-auto px-6">
				<div className="rounded-2xl border border-gray-200 bg-slate-50 p-6 md:p-10">
					<h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-center">
						Built for{' '}
						<span className="text-green-500 font-bold">
							Authenticity
						</span>
						.
					</h2>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
						<Card className="p-5">
							<p className="text-gray-700">
								Powered by deep market analysis, not guesswork.
							</p>
						</Card>
						<Card className="p-5">
							<p className="text-gray-700">
								Inspired by playbooks from top content creators.
							</p>
						</Card>
						<Card className="p-5">
							<p className="text-gray-700">
								Early users saw 3x faster community growth in
								TikTok in 30 days.
							</p>
						</Card>
					</div>

					<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
						<Card className="md:col-span-2 p-6">
							<div className="flex items-start gap-3">
								<Avatar>
									<AvatarFallback>BA</AvatarFallback>
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
					</div>
					<div className="mt-10 flex items-center justify-center">
						<Dialog>
							<DialogTrigger asChild>
								<Button className="rounded-full px-5 py-3 text-sm hover:font-bold hover:bg-green-500 hover:text-white">
									Try it now!
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogTitle className="sr-only">
									Sign up or log in to SheepLoop
								</DialogTitle>
								{/* <FormSelectionTabs /> // TODO: add form selection tabs later */}
								<MaintenanceOngoing />
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>
		</section>
	);
}
