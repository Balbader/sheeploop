'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsSection {
	title: string;
	content: string;
}

export default function TermsSection() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	const termsSections: TermsSection[] = [
		{
			title: '1. Acceptance of Terms',
			content: `By accessing or using Sheeploop, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service. These terms apply to all visitors, users, and others who access or use the service.`,
		},
		{
			title: '2. Description of Service',
			content: `Sheeploop is an AI-powered content generation platform that provides tools and services for creating, editing, and managing content. Our services include but are not limited to:
• AI-powered content generation and editing
• Templates and content libraries
• User accounts and content management
• Subscription-based access to premium features

We reserve the right to modify, suspend, or discontinue any part of our service at any time with or without notice.`,
		},
		{
			title: '3. User Accounts and Registration',
			content: `To access certain features of our service, you must register for an account. You agree to:
• Provide accurate, current, and complete information during registration
• Maintain and update your account information to keep it accurate
• Maintain the security of your password and account
• Accept responsibility for all activities that occur under your account
• Notify us immediately of any unauthorized use of your account

You are responsible for maintaining the confidentiality of your account credentials. We are not liable for any loss or damage arising from your failure to comply with this section.`,
		},
		{
			title: '4. User Content and Ownership',
			content: `You retain all ownership rights to the content you create, upload, or submit to our service ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to:
• Use, store, and process your content to provide and improve our services
• Display your content on our platform as necessary to provide the service
• Use aggregated, anonymized data derived from your content for service improvement

You represent and warrant that you own or have the necessary rights to all User Content you submit and that your User Content does not violate any third-party rights or applicable laws.`,
		},
		{
			title: '5. Acceptable Use Policy',
			content: `You agree not to use our service to:
• Violate any applicable laws or regulations
• Infringe upon the rights of others, including intellectual property rights
• Transmit harmful, offensive, or inappropriate content
• Attempt to gain unauthorized access to our systems or other users' accounts
• Use the service for any illegal or unauthorized purpose
• Interfere with or disrupt the service or servers connected to the service
• Create content that is defamatory, libelous, or violates privacy rights
• Generate content that promotes hate speech, violence, or discrimination
• Use automated systems to access the service without permission

We reserve the right to suspend or terminate accounts that violate these terms.`,
		},
		{
			title: '6. AI-Generated Content',
			content: `Our AI-powered content generation features:
• Generate content based on your inputs and prompts
• May produce content that requires review and editing
• Are subject to limitations and may not always produce perfect results
• Should not be used as a substitute for professional advice in specialized fields

You acknowledge that:
• AI-generated content may contain errors or inaccuracies
• You are responsible for reviewing and verifying all generated content
• Generated content may be similar to content created by other users
• We do not guarantee the uniqueness, accuracy, or quality of generated content`,
		},
		{
			title: '7. Subscription and Payment Terms',
			content: `If you purchase a subscription:
• Subscription fees are billed in advance on a recurring basis
• You authorize us to charge your payment method for all fees
• Subscription fees are non-refundable except as required by law
• We reserve the right to change our pricing with 30 days' notice
• Your subscription will automatically renew unless cancelled
• You may cancel your subscription at any time through your account settings
• Cancellation takes effect at the end of your current billing period
• No refunds are provided for partial subscription periods

All fees are exclusive of applicable taxes, which you are responsible for paying.`,
		},
		{
			title: '8. Intellectual Property Rights',
			content: `The service, including its original content, features, and functionality, is owned by Sheeploop and protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. Our trademarks and trade dress may not be used without our prior written consent.

You may not:
• Copy, modify, or create derivative works of our service
• Reverse engineer, decompile, or disassemble any part of our service
• Remove any copyright or proprietary notices from our service
• Use our service to compete with us or for any commercial purpose that conflicts with our interests`,
		},
		{
			title: '9. Privacy and Data Protection',
			content: `Your use of our service is also governed by our Privacy Policy, which explains how we collect, use, and protect your information. By using our service, you consent to the collection and use of information in accordance with our Privacy Policy.

We implement security measures to protect your data, but we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account information.`,
		},
		{
			title: '10. Service Availability and Modifications',
			content: `We strive to provide reliable service but do not guarantee:
• That the service will be available at all times or free from errors
• That the service will meet your specific requirements
• Continuous, uninterrupted, or secure access to the service

We may:
• Perform maintenance that may temporarily interrupt service
• Modify or discontinue features with or without notice
• Update the service to improve functionality or fix issues
• Limit access to certain features based on subscription tier`,
		},
		{
			title: '11. Limitation of Liability',
			content: `To the maximum extent permitted by law:
• Our service is provided "as is" and "as available" without warranties of any kind
• We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose
• We are not liable for any indirect, incidental, special, or consequential damages
• Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim
• We are not responsible for any content generated by our AI systems or user-submitted content

Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some of the above may not apply to you.`,
		},
		{
			title: '12. Indemnification',
			content: `You agree to indemnify, defend, and hold harmless Sheeploop and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
• Your use or misuse of the service
• Your violation of these Terms of Service
• Your violation of any rights of another party
• Your User Content

We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims.`,
		},
		{
			title: '13. Termination',
			content: `We may terminate or suspend your account and access to the service immediately, without prior notice, for any reason, including:
• Breach of these Terms of Service
• Fraudulent or illegal activity
• Extended periods of inactivity
• Requests by law enforcement or government agencies

Upon termination:
• Your right to use the service will immediately cease
• We may delete your account and content, subject to our data retention policies
• All provisions of these terms that by their nature should survive termination will survive

You may terminate your account at any time by contacting us or using account deletion features in the service.`,
		},
		{
			title: '14. Governing Law and Dispute Resolution',
			content: `These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.

Any disputes arising from these terms or your use of the service shall be resolved through:
• Good faith negotiations
• Binding arbitration if negotiations fail (unless otherwise required by law)
• Courts of competent jurisdiction for matters not subject to arbitration

You agree to waive any right to a jury trial and to participate in class action lawsuits.`,
		},
		{
			title: '15. Changes to Terms',
			content: `We reserve the right to modify these Terms of Service at any time. We will notify you of material changes by:
• Posting the updated terms on this page
• Updating the "Last Updated" date
• Sending an email notification to registered users (for significant changes)

Your continued use of the service after changes become effective constitutes acceptance of the updated terms. If you do not agree to the changes, you must stop using the service and may terminate your account.`,
		},
		{
			title: '16. Contact Information',
			content: `If you have questions about these Terms of Service, please contact us at:
Email: legal@sheeploop.com
We will respond to your inquiry within a reasonable timeframe.`,
		},
	];

	useEffect(() => {
		if (!containerRef.current) return;
		const ctx = gsap.context(() => {
			gsap.from('[data-terms=heading]', {
				y: 16,
				opacity: 0,
				duration: 0.6,
				ease: 'power2.out',
			});
			gsap.from('[data-terms=section]', {
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
							data-terms="heading"
							className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
						>
							Terms of Service
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
						{termsSections.map((section, idx) => (
							<div
								key={idx}
								data-terms="section"
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
					Questions about our terms of service?{' '}
					<span className="font-medium text-gray-900">
						Contact us
					</span>{' '}
					and we&apos;ll be happy to help.
				</p>
			</div>
		</section>
	);
}
