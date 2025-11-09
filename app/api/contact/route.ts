import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const contactFormSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	subject: z.string().min(3, 'Subject must be at least 3 characters'),
	message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validate the request body
		const validatedData = contactFormSchema.parse(body);

		// Get Resend API key from environment
		const resendApiKey = process.env.RESEND_API_KEY;

		if (!resendApiKey) {
			console.error('RESEND_API_KEY is not set');
			return NextResponse.json(
				{
					success: false,
					message:
						'Email service is not configured. Please contact support directly.',
				},
				{ status: 500 },
			);
		}

		const resend = new Resend(resendApiKey);

		// Send email to contact@sheeploop.com
		const { data, error } = await resend.emails.send({
			from: 'Sheeploop Contact Form <onboarding@resend.dev>', // You'll need to verify your domain with Resend
			to: 'contact@sheeploop.com',
			replyTo: validatedData.email,
			subject: `Contact Form: ${validatedData.subject}`,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${validatedData.name}</p>
				<p><strong>Email:</strong> ${validatedData.email}</p>
				<p><strong>Subject:</strong> ${validatedData.subject}</p>
				<h3>Message:</h3>
				<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
			`,
			text: `
New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}

Message:
${validatedData.message}
			`,
		});

		if (error) {
			console.error('Resend error:', error);
			return NextResponse.json(
				{
					success: false,
					message: 'Failed to send email. Please try again later.',
				},
				{ status: 500 },
			);
		}

		return NextResponse.json({
			success: true,
			message: 'Message sent successfully!',
			data,
		});
	} catch (err) {
		if (err instanceof z.ZodError) {
			return NextResponse.json(
				{
					success: false,
					message: 'Invalid form data',
					errors: err.issues,
				},
				{ status: 400 },
			);
		}

		console.error('Error processing contact form:', err);
		const errorMessage =
			err instanceof Error ? err.message : 'An unexpected error occurred';

		return NextResponse.json(
			{
				success: false,
				message: errorMessage,
			},
			{ status: 500 },
		);
	}
}
