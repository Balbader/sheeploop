'use server';

/**
 * Server actions for generating downloadable files (PDF, CSV, TXT)
 */

import { formatAsText, formatAsCSV, ExportData } from '@/lib/export-formatters';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generate PDF from export data
 */
export async function generatePDF(data: ExportData): Promise<Uint8Array> {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const margin = 20;
	let yPos = margin;

	// Helper to add a new page if needed
	const checkPageBreak = (requiredHeight: number) => {
		if (yPos + requiredHeight > pageHeight - margin) {
			doc.addPage();
			yPos = margin;
		}
	};

	// Title
	doc.setFontSize(20);
	doc.setFont('helvetica', 'bold');
	doc.text('SHEEPLOOP - CONTENT STRATEGY REPORT', pageWidth / 2, yPos, {
		align: 'center',
	});
	yPos += 10;

	doc.setFontSize(10);
	doc.setFont('helvetica', 'normal');
	doc.text(
		`Generated on: ${new Date().toLocaleString()}`,
		pageWidth / 2,
		yPos,
		{
			align: 'center',
		},
	);
	yPos += 15;

	// Community Market Fit
	if (data.community_market_fit) {
		checkPageBreak(30);
		doc.setFontSize(16);
		doc.setFont('helvetica', 'bold');
		doc.text('COMMUNITY MARKET FIT ASSESSMENT', margin, yPos);
		yPos += 10;

		if (data.community_market_fit.score) {
			checkPageBreak(30);
			const scores = [
				['Metric', 'Score'],
				[
					'Alignment',
					`${data.community_market_fit.score.alignment ?? 'N/A'}/10`,
				],
				[
					'Virality',
					`${data.community_market_fit.score.virality ?? 'N/A'}/10`,
				],
				[
					'Engagement',
					`${data.community_market_fit.score.engagement ?? 'N/A'}/10`,
				],
				[
					'Differentiation',
					`${
						data.community_market_fit.score.differentiation ?? 'N/A'
					}/10`,
				],
			];

			autoTable(doc, {
				startY: yPos,
				head: [scores[0]],
				body: scores.slice(1),
				theme: 'striped',
				headStyles: { fillColor: [34, 197, 94] },
				margin: { left: margin, right: margin },
			});
			yPos = (doc as any).lastAutoTable.finalY + 10;
		}

		if (
			data.community_market_fit.summary &&
			data.community_market_fit.summary.length > 0
		) {
			checkPageBreak(30);
			doc.setFontSize(12);
			doc.setFont('helvetica', 'bold');
			doc.text('Summary:', margin, yPos);
			yPos += 8;

			doc.setFontSize(10);
			doc.setFont('helvetica', 'normal');
			data.community_market_fit.summary.forEach((item) => {
				checkPageBreak(10);
				const lines = doc.splitTextToSize(
					`• ${item}`,
					pageWidth - 2 * margin,
				);
				doc.text(lines, margin + 5, yPos);
				yPos += lines.length * 5 + 2;
			});
			yPos += 5;
		}
	}

	// IFC Profile
	if (data.ifc_profile) {
		checkPageBreak(30);
		doc.addPage();
		yPos = margin;

		doc.setFontSize(16);
		doc.setFont('helvetica', 'bold');
		doc.text('IDEAL FOLLOWER PROFILE (IFC)', margin, yPos);
		yPos += 10;

		// Helper function to normalize items to array
		const normalizeToArray = (
			items: string | string[] | undefined,
		): string[] => {
			if (!items) return [];
			if (Array.isArray(items)) return items;
			if (typeof items === 'string') {
				// If it's a string, try to split by newlines, or return as single item array
				const lines = items
					.split('\n')
					.filter((line) => line.trim().length > 0);
				return lines.length > 0 ? lines : [items];
			}
			return [];
		};

		const sections = [
			{
				title: 'Demographics',
				items: normalizeToArray(data.ifc_profile.demographics),
			},
			{
				title: 'Psychographics',
				items: normalizeToArray(data.ifc_profile.psychographics),
			},
			{
				title: 'Pain Points',
				items: normalizeToArray(data.ifc_profile.pain_points),
			},
			{
				title: 'Triggers',
				items: normalizeToArray(data.ifc_profile.triggers),
			},
			{
				title: 'Community Behaviors',
				items: normalizeToArray(data.ifc_profile.community_behaviors),
			},
		];

		sections.forEach((section) => {
			if (
				section.items &&
				Array.isArray(section.items) &&
				section.items.length > 0
			) {
				checkPageBreak(30);
				doc.setFontSize(12);
				doc.setFont('helvetica', 'bold');
				doc.text(`${section.title}:`, margin, yPos);
				yPos += 8;

				doc.setFontSize(10);
				doc.setFont('helvetica', 'normal');
				section.items.forEach((item) => {
					checkPageBreak(10);
					const itemText =
						typeof item === 'string' ? item : String(item);
					const lines = doc.splitTextToSize(
						`• ${itemText}`,
						pageWidth - 2 * margin,
					);
					doc.text(lines, margin + 5, yPos);
					yPos += lines.length * 5 + 2;
				});
				yPos += 5;
			}
		});
	}

	// Personas
	if (data.personas && data.personas.length > 0) {
		data.personas.forEach((persona, personaIndex) => {
			checkPageBreak(30);
			doc.addPage();
			yPos = margin;

			doc.setFontSize(16);
			doc.setFont('helvetica', 'bold');
			doc.text(
				`PERSONA ${personaIndex + 1}: ${persona.name ?? 'Unnamed'}`,
				margin,
				yPos,
			);
			yPos += 10;

			// Basic Info
			const basicInfo: string[][] = [];
			if (persona.segment) {
				basicInfo.push(['Segment', persona.segment]);
			}
			if (persona.key_motivation) {
				basicInfo.push(['Key Motivation', persona.key_motivation]);
			}
			if (persona.core_pain_point) {
				basicInfo.push(['Core Pain Point', persona.core_pain_point]);
			}
			if (persona.platform_behavior) {
				basicInfo.push([
					'Platform Behavior',
					persona.platform_behavior,
				]);
			}
			if (persona.preferred_tone_style) {
				basicInfo.push([
					'Preferred Tone & Style',
					persona.preferred_tone_style,
				]);
			}

			if (basicInfo.length > 0) {
				checkPageBreak(30);
				autoTable(doc, {
					startY: yPos,
					head: [['Field', 'Value']],
					body: basicInfo,
					theme: 'striped',
					headStyles: { fillColor: [34, 197, 94] },
					margin: { left: margin, right: margin },
				});
				yPos = (doc as any).lastAutoTable.finalY + 10;
			}

			if (persona.description) {
				checkPageBreak(20);
				doc.setFontSize(12);
				doc.setFont('helvetica', 'bold');
				doc.text('Description:', margin, yPos);
				yPos += 8;

				doc.setFontSize(10);
				doc.setFont('helvetica', 'normal');
				const descLines = doc.splitTextToSize(
					persona.description,
					pageWidth - 2 * margin,
				);
				doc.text(descLines, margin, yPos);
				yPos += descLines.length * 5 + 5;
			}

			// Storyline
			if (persona.storyline) {
				checkPageBreak(30);
				doc.setFontSize(12);
				doc.setFont('helvetica', 'bold');
				doc.text('Storyline:', margin, yPos);
				yPos += 8;

				doc.setFontSize(10);
				doc.setFont('helvetica', 'normal');
				const storylineInfo: string[][] = [];
				if (persona.storyline.title) {
					storylineInfo.push(['Title', persona.storyline.title]);
				}
				if (persona.storyline.theme) {
					storylineInfo.push(['Theme', persona.storyline.theme]);
				}
				if (persona.storyline.arc?.hook) {
					storylineInfo.push([
						'Arc - Hook',
						persona.storyline.arc.hook,
					]);
				}
				if (persona.storyline.arc?.transformation) {
					storylineInfo.push([
						'Arc - Transformation',
						persona.storyline.arc.transformation,
					]);
				}
				if (persona.storyline.arc?.outcome) {
					storylineInfo.push([
						'Arc - Outcome',
						persona.storyline.arc.outcome,
					]);
				}
				if (persona.storyline.emotional_driver) {
					storylineInfo.push([
						'Emotional Driver',
						persona.storyline.emotional_driver,
					]);
				}
				if (persona.storyline.core_message) {
					storylineInfo.push([
						'Core Message',
						persona.storyline.core_message,
					]);
				}

				if (storylineInfo.length > 0) {
					autoTable(doc, {
						startY: yPos,
						head: [['Field', 'Value']],
						body: storylineInfo,
						theme: 'striped',
						headStyles: { fillColor: [34, 197, 94] },
						margin: { left: margin, right: margin },
					});
					yPos = (doc as any).lastAutoTable.finalY + 10;
				}
			}

			// Growth Strategy
			if (persona.growth_strategy) {
				checkPageBreak(30);
				doc.setFontSize(12);
				doc.setFont('helvetica', 'bold');
				doc.text('Growth Strategy:', margin, yPos);
				yPos += 8;

				doc.setFontSize(10);
				doc.setFont('helvetica', 'normal');
				const growthInfo: string[][] = [];
				if (persona.growth_strategy.objective) {
					growthInfo.push([
						'Objective',
						persona.growth_strategy.objective,
					]);
				}
				if (persona.growth_strategy.posting_frequency) {
					growthInfo.push([
						'Posting Frequency',
						persona.growth_strategy.posting_frequency,
					]);
				}

				if (growthInfo.length > 0) {
					autoTable(doc, {
						startY: yPos,
						head: [['Field', 'Value']],
						body: growthInfo,
						theme: 'striped',
						headStyles: { fillColor: [34, 197, 94] },
						margin: { left: margin, right: margin },
					});
					yPos = (doc as any).lastAutoTable.finalY + 10;
				}

				if (
					persona.growth_strategy.content_pillars &&
					persona.growth_strategy.content_pillars.length > 0
				) {
					checkPageBreak(20);
					doc.setFontSize(10);
					doc.setFont('helvetica', 'bold');
					doc.text('Content Pillars:', margin, yPos);
					yPos += 8;
					doc.setFont('helvetica', 'normal');
					persona.growth_strategy.content_pillars.forEach(
						(pillar) => {
							checkPageBreak(10);
							const lines = doc.splitTextToSize(
								`• ${pillar}`,
								pageWidth - 2 * margin,
							);
							doc.text(lines, margin + 5, yPos);
							yPos += lines.length * 5 + 2;
						},
					);
					yPos += 5;
				}

				if (
					persona.growth_strategy.engagement_tactics &&
					persona.growth_strategy.engagement_tactics.length > 0
				) {
					checkPageBreak(20);
					doc.setFontSize(10);
					doc.setFont('helvetica', 'bold');
					doc.text('Engagement Tactics:', margin, yPos);
					yPos += 8;
					doc.setFont('helvetica', 'normal');
					persona.growth_strategy.engagement_tactics.forEach(
						(tactic) => {
							checkPageBreak(10);
							const lines = doc.splitTextToSize(
								`• ${tactic}`,
								pageWidth - 2 * margin,
							);
							doc.text(lines, margin + 5, yPos);
							yPos += lines.length * 5 + 2;
						},
					);
					yPos += 5;
				}

				if (
					persona.growth_strategy.kpis &&
					persona.growth_strategy.kpis.length > 0
				) {
					checkPageBreak(20);
					doc.setFontSize(10);
					doc.setFont('helvetica', 'bold');
					doc.text('KPIs:', margin, yPos);
					yPos += 8;
					doc.setFont('helvetica', 'normal');
					persona.growth_strategy.kpis.forEach((kpi) => {
						checkPageBreak(10);
						const lines = doc.splitTextToSize(
							`• ${kpi}`,
							pageWidth - 2 * margin,
						);
						doc.text(lines, margin + 5, yPos);
						yPos += lines.length * 5 + 2;
					});
					yPos += 5;
				}
			}

			// Scripts
			if (persona.scripts && persona.scripts.length > 0) {
				persona.scripts.forEach((script, scriptIndex) => {
					checkPageBreak(40);
					doc.addPage();
					yPos = margin;

					doc.setFontSize(14);
					doc.setFont('helvetica', 'bold');
					doc.text(
						`Script ${scriptIndex + 1}: ${
							script.title ?? 'Untitled'
						}`,
						margin,
						yPos,
					);
					yPos += 10;

					doc.setFontSize(10);
					doc.setFont('helvetica', 'normal');
					const scriptInfo: string[][] = [];
					if (script.duration) {
						scriptInfo.push(['Duration', script.duration]);
					}
					if (script.day_of_week) {
						scriptInfo.push(['Day of Week', script.day_of_week]);
					}
					if (script.preferred_time) {
						scriptInfo.push([
							'Preferred Time',
							script.preferred_time,
						]);
					}
					if (script.cta) {
						scriptInfo.push(['CTA', script.cta]);
					}

					if (scriptInfo.length > 0) {
						autoTable(doc, {
							startY: yPos,
							head: [['Field', 'Value']],
							body: scriptInfo,
							theme: 'striped',
							headStyles: { fillColor: [34, 197, 94] },
							margin: { left: margin, right: margin },
						});
						yPos = (doc as any).lastAutoTable.finalY + 10;
					}

					if (script.script) {
						checkPageBreak(20);
						doc.setFontSize(10);
						doc.setFont('helvetica', 'bold');
						doc.text('Script Content:', margin, yPos);
						yPos += 8;
						doc.setFont('helvetica', 'normal');
						const scriptLines = doc.splitTextToSize(
							script.script,
							pageWidth - 2 * margin,
						);
						doc.text(scriptLines, margin, yPos);
						yPos += scriptLines.length * 5 + 5;
					}
				});
			}
		});
	}

	// Convert to Uint8Array
	const pdfOutput = doc.output('arraybuffer');
	return new Uint8Array(pdfOutput);
}

/**
 * Generate CSV from export data
 */
export async function generateCSV(data: ExportData): Promise<string> {
	return formatAsCSV(data);
}

/**
 * Generate TXT from export data
 */
export async function generateTXT(data: ExportData): Promise<string> {
	return formatAsText(data);
}
