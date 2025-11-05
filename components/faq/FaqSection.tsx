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

interface FAQItem {
	q: string;
	a: string;
}

export default function FaqSection() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	const faqs = useMemo<FAQItem[]>(
		() => [
			{
				q: 'What is Sheeploop?',
				a: 'Sheeploop helps you generate, validate, and iterate on short-form content to accelerate your go-to-market with AI-assisted workflows.',
			},
			{
				q: 'How does the generator work?',
				a: 'Provide your context, brand tone, and goals. We craft storylines and variations, then you refine and export. Everything stays editable and transparent.',
			},
			{
				q: 'Is there a free plan?',
				a: 'Yes. You can try core features on the free tier and upgrade when you need more seats, usage, or collaboration features.',
			},
			{
				q: 'Can my team collaborate?',
				a: 'Teams can share prompts, templates, and results, and keep a single source of truth for approved content.',
			},
			{
				q: 'Do you support scheduling or publishing?',
				a: 'We export to common formats and integrate with schedulers. Direct publishing to more platforms is coming soon.',
			},
			{
				q: 'What about data privacy and security?',
				a: 'We do not sell your data. Project data is stored securely and access-controlled. See our Privacy Policy for details.',
			},
			{
				q: 'Can I customize the tone and brand voice?',
				a: 'Yes. Define tone, do/don’ts, and key messages. Save presets to keep your brand consistent across outputs.',
			},
			{
				q: 'Does Sheeploop work with my existing tools?',
				a: 'We support exports to common formats and work with popular schedulers. Deeper integrations are on our roadmap.',
			},
			{
				q: 'Is the output unique?',
				a: 'We generate content based on your inputs and constraints. You can iterate and edit to ensure it matches your voice and goals.',
			},
			{
				q: 'How is pricing structured?',
				a: 'Pricing is usage-based with team features available on higher tiers. Start free and upgrade as you grow.',
			},
			{
				q: 'Can I cancel anytime?',
				a: 'Yes. You can cancel at any time. Your plan remains active until the end of the billing period.',
			},
			{
				q: 'Is it accessible?',
				a: 'We follow accessible UI patterns. Generated content is yours to adapt for accessibility best practices across channels.',
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
			<div className="mx-auto w-full max-w-3xl px-4">
				<ScrollArea className="h-[480px] md:h-[560px]">
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

				<p className="mt-8 text-center text-sm text-gray-600">
					Still have questions?{' '}
					<span className="font-medium text-gray-900">
						Contact us
					</span>{' '}
					and we’ll help you get sorted.
				</p>
			</div>
		</section>
	);
}
