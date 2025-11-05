'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacySection {
	title: string;
	content: string;
}

export default function PrivacySection() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	const privacySections: PrivacySection[] = [
		{
			title: '1. Introduction',
			content: `Welcome to Sheeploop. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our AI-powered content generation platform.`,
		},
		{
			title: '2. Information We Collect',
			content: `We collect information that you provide directly to us, including:
• Account information (name, email address, password)
• Content you create, including prompts, templates, and generated content
• Usage data and preferences
• Payment information (processed securely through third-party payment processors)
• Communications with our support team

We also automatically collect certain information when you use our service, such as IP address, browser type, device information, and usage patterns.`,
		},
		{
			title: '3. How We Use Your Information',
			content: `We use the information we collect to:
• Provide, maintain, and improve our services
• Process your transactions and manage your account
• Communicate with you about your account and our services
• Send you technical notices and support messages
• Respond to your comments and questions
• Monitor and analyze usage patterns to improve our AI models
• Detect, prevent, and address technical issues
• Protect the rights and safety of our users and third parties`,
		},
		{
			title: '4. Data Storage and Security',
			content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely using industry-standard encryption and access controls. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
		},
		{
			title: '5. Data Sharing and Disclosure',
			content: `We do not sell your personal data. We may share your information only in the following circumstances:
• With your consent
• With service providers who assist us in operating our platform (under strict confidentiality agreements)
• To comply with legal obligations or respond to lawful requests
• To protect our rights, privacy, safety, or property
• In connection with a merger, acquisition, or sale of assets (with notice to users)

We may share aggregated, anonymized data that cannot be used to identify you.`,
		},
		{
			title: '6. AI and Content Generation',
			content: `When you use our AI content generation features:
• Your prompts and inputs are processed by our AI systems to generate content
• We may use your content to improve our AI models and services
• You retain ownership of the content you create
• Generated content is based on your inputs and is not derived from other users' data
• We do not use your content to train models that would generate similar content for other users`,
		},
		{
			title: '7. Your Rights and Choices',
			content: `You have the right to:
• Access your personal data
• Correct inaccurate or incomplete data
• Request deletion of your data
• Object to or restrict certain processing activities
• Data portability (receive a copy of your data)
• Withdraw consent where processing is based on consent
• Opt-out of marketing communications

To exercise these rights, please contact us using the information provided below.`,
		},
		{
			title: '8. Cookies and Tracking Technologies',
			content: `We use cookies and similar tracking technologies to collect and store information about your preferences and usage patterns. You can control cookies through your browser settings, but disabling cookies may limit your ability to use certain features of our service.`,
		},
		{
			title: '9. Third-Party Services',
			content: `Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.`,
		},
		{
			title: '10. Data Retention',
			content: `We retain your personal data for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When you delete your account, we will delete or anonymize your personal data, except where we are required to retain it for legal or legitimate business purposes.`,
		},
		{
			title: "11. Children's Privacy",
			content: `Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.`,
		},
		{
			title: '12. International Data Transfers',
			content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate measures to ensure your data is protected in accordance with this privacy policy.`,
		},
		{
			title: '13. Changes to This Privacy Policy',
			content: `We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our service after changes become effective constitutes acceptance of the updated policy.`,
		},
		{
			title: '14. Contact Us',
			content: `If you have questions or concerns about this privacy policy or our data practices, please contact us at:
Email: privacy@sheeploop.com
We will respond to your inquiry within a reasonable timeframe.`,
		},
	];

	useEffect(() => {
		if (!containerRef.current) return;
		const ctx = gsap.context(() => {
			gsap.from('[data-privacy=heading]', {
				y: 16,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out',
			});
			gsap.from('[data-privacy=section]', {
				opacity: 0,
				y: 12,
				stagger: 0.06,
				duration: 0.5,
				ease: 'power2.out',
				delay: 0.1,
			});
		}, containerRef);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className="w-full py-16 md:py-24 bg-white">
			<div className="mx-auto w-full max-w-4xl px-4 relative z-10">
				<div className="mx-auto max-w-4xl text-center relative z-10 mb-12">
					<div className="mb-8 text-center">
						<h2
							data-privacy="heading"
							className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
						>
							Privacy Policy
						</h2>
						<p className="mt-3 text-sm text-gray-600 md:text-base">
							Last Updated:{' '}
							{new Date().toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
					</div>
				</div>
				<ScrollArea className="h-[600px] md:h-[700px]">
					<div className="space-y-8 pr-4">
						{privacySections.map((section, idx) => (
							<div
								key={idx}
								data-privacy="section"
								className="bg-white rounded-lg border border-gray-200 p-6"
							>
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									{section.title}
								</h3>
								<div className="text-sm leading-7 text-gray-700 whitespace-pre-line">
									{section.content}
								</div>
							</div>
						))}
					</div>
				</ScrollArea>

				<p className="mt-8 text-center text-sm text-gray-600">
					Questions about our privacy practices?{' '}
					<span className="font-medium text-gray-900">
						Contact us
					</span>{' '}
					and we'll be happy to help.
				</p>
			</div>
		</section>
	);
}
