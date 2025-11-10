'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';
import Link from 'next/link';

interface FAQItem {
	q: string;
	a: string;
}

export default function HomeFaqSection() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	const faqs = useMemo<FAQItem[]>(
		() => [
			{
				q: 'What is Sheeploop?',
				a: 'Sheeploop helps you generate, validate, and iterate on short-form content to accelerate your go-to-market with AI-assisted workflows.',
			},
			{
				q: 'How does the generator work?',
				a: 'Provide your context, brand tone, and goals. We craft storylines and variations. All you have to do is follow the plan and post your shorts daily.',
			},
			{
				q: 'Is it free to use?',
				a: 'Yes. You can try it for free. No credit card required.',
			},
			{
				q: 'Is the output unique?',
				a: 'We generate content based on your inputs and constraints. We make sure it is unique and fits your brand voice and goals.',
			},
			{
				q: 'Are you planning to add video generation?',
				a: 'Yes. We are planning to add video generation in the future. We will let you know when it is ready.',
			},
			{
				q: 'Do you support scheduling or publishing?',
				a: 'The generated posting plan includes guidelines to when to post your shorts daily. Direct publishing to platforms is coming soon.',
			},
		],
		[],
	);

	useEffect(() => {
		if (!containerRef.current) return;
		const ctx = gsap.context(() => {
			gsap.from('[data-faq=heading]', {
				y: 16,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out',
			});
			gsap.from('[data-faq=item]', {
				opacity: 0,
				y: 12,
				stagger: 0.08,
				duration: 0.5,
				ease: 'power2.out',
				delay: 0.1,
			});
		}, containerRef);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className="w-full py-16 md:py-24 bg-white">
			<div className="mx-auto w-full max-w-3xl px-4 relative z-10">
				<div className="mx-auto max-w-3xl text-center relative z-10">
					<div className="mb-8 text-center">
						<h2
							data-faq="heading"
							className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
						>
							Frequently asked questions
						</h2>
						<p className="mt-3 text-sm text-gray-600 md:text-base">
							Everything you need to know about using Sheeploop
							for content workflows.
						</p>
					</div>
				</div>
				<ScrollArea className="h-[320px] md:h-[360px]">
					<Accordion
						type="single"
						collapsible
						className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white relative z-10"
					>
						{faqs.map((item, idx) => (
							<AccordionItem
								key={idx}
								value={`item-${idx}`}
								data-faq="item"
								className="px-4"
							>
								<AccordionTrigger className="py-4 text-left text-gray-900 hover:no-underline">
									{item.q}
								</AccordionTrigger>
								<AccordionContent className="pb-4 text-sm leading-6 text-gray-700">
									{item.a}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</ScrollArea>

				{/* <div className="mt-8 text-center"> // TODO: add faq link later
					<Link href="/faq">
						<Button className="rounded-full px-5 py-3 text-sm hover:font-bold hover:bg-green-500 hover:text-white">
							See all questions
						</Button>
					</Link>
				</div> */}
			</div>
		</section>
	);
}
