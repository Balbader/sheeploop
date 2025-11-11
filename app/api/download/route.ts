import { NextRequest, NextResponse } from 'next/server';
import {
	generatePDF,
	generateCSV,
	generateTXT,
} from '@/actions/download-export.action';

export async function POST(request: NextRequest) {
	try {
		const { data, format } = await request.json();

		if (!data) {
			return NextResponse.json(
				{ error: 'No data provided' },
				{ status: 400 },
			);
		}

		if (!format || !['pdf', 'csv', 'txt'].includes(format)) {
			return NextResponse.json(
				{ error: 'Invalid format. Must be pdf, csv, or txt' },
				{ status: 400 },
			);
		}

		let fileContent: Uint8Array | string;
		let contentType: string;
		let filename: string;

		switch (format) {
			case 'pdf': {
				fileContent = await generatePDF(data);
				contentType = 'application/pdf';
				filename = `sheeploop-strategy-${
					new Date().toISOString().split('T')[0]
				}.pdf`;
				break;
			}
			case 'csv': {
				fileContent = await generateCSV(data);
				contentType = 'text/csv';
				filename = `sheeploop-strategy-${
					new Date().toISOString().split('T')[0]
				}.csv`;
				break;
			}
			case 'txt': {
				fileContent = await generateTXT(data);
				contentType = 'text/plain';
				filename = `sheeploop-strategy-${
					new Date().toISOString().split('T')[0]
				}.txt`;
				break;
			}
			default:
				return NextResponse.json(
					{ error: 'Invalid format' },
					{ status: 400 },
				);
		}

		// Create response with appropriate headers
		const response = new NextResponse(
			typeof fileContent === 'string'
				? fileContent
				: Buffer.from(fileContent),
			{
				status: 200,
				headers: {
					'Content-Type': contentType,
					'Content-Disposition': `attachment; filename="${filename}"`,
				},
			},
		);

		return response;
	} catch (error) {
		console.error('Error generating download:', error);
		return NextResponse.json(
			{ error: 'Failed to generate download file' },
			{ status: 500 },
		);
	}
}
