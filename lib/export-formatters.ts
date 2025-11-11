/**
 * Utility functions for formatting generated output into different file formats
 */

export interface ExportData {
	community_market_fit?: {
		score?: {
			alignment?: number;
			virality?: number;
			engagement?: number;
			differentiation?: number;
		};
		summary?: string[];
	};
	ifc_profile?: {
		demographics?: string | string[];
		psychographics?: string | string[];
		pain_points?: string | string[];
		triggers?: string | string[];
		community_behaviors?: string | string[];
	};
	personas?: Array<{
		name?: string;
		segment?: string;
		description?: string;
		key_motivation?: string;
		core_pain_point?: string;
		platform_behavior?: string;
		preferred_tone_style?: string;
		storyline?: {
			title?: string;
			theme?: string;
			arc?: {
				hook?: string;
				transformation?: string;
				outcome?: string;
			};
			emotional_driver?: string;
			core_message?: string;
		};
		growth_strategy?: {
			objective?: string;
			posting_frequency?: string;
			content_pillars?: string[];
			engagement_tactics?: string[];
			kpis?: string[];
		};
		scripts?: Array<{
			title?: string;
			duration?: string;
			script?: string;
			cta?: string;
			day_of_week?: string;
			preferred_time?: string;
		}>;
	}>;
}

/**
 * Format data as plain text
 */
export function formatAsText(data: ExportData): string {
	let text = '='.repeat(80) + '\n';
	text += 'SHEEPLOOP - CONTENT STRATEGY REPORT\n';
	text += '='.repeat(80) + '\n\n';
	text += `Generated on: ${new Date().toLocaleString()}\n\n`;

	// Community Market Fit
	if (data.community_market_fit) {
		text += '\n' + '-'.repeat(80) + '\n';
		text += 'COMMUNITY MARKET FIT ASSESSMENT\n';
		text += '-'.repeat(80) + '\n\n';

		if (data.community_market_fit.score) {
			text += 'Scores:\n';
			text += `  Alignment: ${
				data.community_market_fit.score.alignment ?? 'N/A'
			}/10\n`;
			text += `  Virality: ${
				data.community_market_fit.score.virality ?? 'N/A'
			}/10\n`;
			text += `  Engagement: ${
				data.community_market_fit.score.engagement ?? 'N/A'
			}/10\n`;
			text += `  Differentiation: ${
				data.community_market_fit.score.differentiation ?? 'N/A'
			}/10\n\n`;
		}

		if (
			data.community_market_fit.summary &&
			data.community_market_fit.summary.length > 0
		) {
			text += 'Summary:\n';
			data.community_market_fit.summary.forEach((item, index) => {
				text += `  ${index + 1}. ${item}\n`;
			});
			text += '\n';
		}
	}

	// Helper function to normalize items to array
	const normalizeToArray = (
		items: string | string[] | undefined,
	): string[] => {
		if (!items) return [];
		if (Array.isArray(items)) return items;
		if (typeof items === 'string') {
			const lines = items
				.split('\n')
				.filter((line) => line.trim().length > 0);
			return lines.length > 0 ? lines : [items];
		}
		return [];
	};

	// IFC Profile
	if (data.ifc_profile) {
		text += '\n' + '-'.repeat(80) + '\n';
		text += 'IDEAL FOLLOWER PROFILE (IFC)\n';
		text += '-'.repeat(80) + '\n\n';

		const demographics = normalizeToArray(data.ifc_profile.demographics);
		if (demographics.length > 0) {
			text += 'Demographics:\n';
			demographics.forEach((item) => {
				text += `  • ${item}\n`;
			});
			text += '\n';
		}

		const psychographics = normalizeToArray(
			data.ifc_profile.psychographics,
		);
		if (psychographics.length > 0) {
			text += 'Psychographics:\n';
			psychographics.forEach((item) => {
				text += `  • ${item}\n`;
			});
			text += '\n';
		}

		const painPoints = normalizeToArray(data.ifc_profile.pain_points);
		if (painPoints.length > 0) {
			text += 'Pain Points:\n';
			painPoints.forEach((item) => {
				text += `  • ${item}\n`;
			});
			text += '\n';
		}

		const triggers = normalizeToArray(data.ifc_profile.triggers);
		if (triggers.length > 0) {
			text += 'Triggers:\n';
			triggers.forEach((item) => {
				text += `  • ${item}\n`;
			});
			text += '\n';
		}

		const communityBehaviors = normalizeToArray(
			data.ifc_profile.community_behaviors,
		);
		if (communityBehaviors.length > 0) {
			text += 'Community Behaviors:\n';
			communityBehaviors.forEach((item) => {
				text += `  • ${item}\n`;
			});
			text += '\n';
		}
	}

	// Personas
	if (data.personas && data.personas.length > 0) {
		text += '\n' + '-'.repeat(80) + '\n';
		text += 'PERSONAS\n';
		text += '-'.repeat(80) + '\n\n';

		data.personas.forEach((persona, personaIndex) => {
			text += `\n${'='.repeat(80)}\n`;
			text += `PERSONA ${personaIndex + 1}: ${
				persona.name ?? 'Unnamed'
			}\n`;
			text += '='.repeat(80) + '\n\n';

			if (persona.segment) {
				text += `Segment: ${persona.segment}\n\n`;
			}

			if (persona.description) {
				text += `Description:\n${persona.description}\n\n`;
			}

			if (persona.key_motivation) {
				text += `Key Motivation: ${persona.key_motivation}\n\n`;
			}

			if (persona.core_pain_point) {
				text += `Core Pain Point: ${persona.core_pain_point}\n\n`;
			}

			if (persona.platform_behavior) {
				text += `Platform Behavior: ${persona.platform_behavior}\n\n`;
			}

			if (persona.preferred_tone_style) {
				text += `Preferred Tone & Style: ${persona.preferred_tone_style}\n\n`;
			}

			// Storyline
			if (persona.storyline) {
				text += 'Storyline:\n';
				if (persona.storyline.title) {
					text += `  Title: ${persona.storyline.title}\n`;
				}
				if (persona.storyline.theme) {
					text += `  Theme: ${persona.storyline.theme}\n`;
				}
				if (persona.storyline.arc) {
					text += '  Arc:\n';
					if (persona.storyline.arc.hook) {
						text += `    Hook: ${persona.storyline.arc.hook}\n`;
					}
					if (persona.storyline.arc.transformation) {
						text += `    Transformation: ${persona.storyline.arc.transformation}\n`;
					}
					if (persona.storyline.arc.outcome) {
						text += `    Outcome: ${persona.storyline.arc.outcome}\n`;
					}
				}
				if (persona.storyline.emotional_driver) {
					text += `  Emotional Driver: ${persona.storyline.emotional_driver}\n`;
				}
				if (persona.storyline.core_message) {
					text += `  Core Message: ${persona.storyline.core_message}\n`;
				}
				text += '\n';
			}

			// Growth Strategy
			if (persona.growth_strategy) {
				text += 'Growth Strategy:\n';
				if (persona.growth_strategy.objective) {
					text += `  Objective: ${persona.growth_strategy.objective}\n`;
				}
				if (persona.growth_strategy.posting_frequency) {
					text += `  Posting Frequency: ${persona.growth_strategy.posting_frequency}\n`;
				}
				if (
					persona.growth_strategy.content_pillars &&
					persona.growth_strategy.content_pillars.length > 0
				) {
					text += '  Content Pillars:\n';
					persona.growth_strategy.content_pillars.forEach(
						(pillar) => {
							text += `    • ${pillar}\n`;
						},
					);
				}
				if (
					persona.growth_strategy.engagement_tactics &&
					persona.growth_strategy.engagement_tactics.length > 0
				) {
					text += '  Engagement Tactics:\n';
					persona.growth_strategy.engagement_tactics.forEach(
						(tactic) => {
							text += `    • ${tactic}\n`;
						},
					);
				}
				if (
					persona.growth_strategy.kpis &&
					persona.growth_strategy.kpis.length > 0
				) {
					text += '  KPIs:\n';
					persona.growth_strategy.kpis.forEach((kpi) => {
						text += `    • ${kpi}\n`;
					});
				}
				text += '\n';
			}

			// Scripts
			if (persona.scripts && persona.scripts.length > 0) {
				text += 'Scripts:\n';
				persona.scripts.forEach((script, scriptIndex) => {
					text += `\n  Script ${scriptIndex + 1}: ${
						script.title ?? 'Untitled'
					}\n`;
					text += '  ' + '-'.repeat(76) + '\n';
					if (script.duration) {
						text += `  Duration: ${script.duration}\n`;
					}
					if (script.day_of_week) {
						text += `  Day: ${script.day_of_week}\n`;
					}
					if (script.preferred_time) {
						text += `  Preferred Time: ${script.preferred_time}\n`;
					}
					if (script.script) {
						text += `  Script:\n  ${script.script
							.split('\n')
							.join('\n  ')}\n`;
					}
					if (script.cta) {
						text += `  CTA: ${script.cta}\n`;
					}
					text += '\n';
				});
			}
		});
	}

	text += '\n' + '='.repeat(80) + '\n';
	text += 'End of Report\n';
	text += '='.repeat(80) + '\n';

	return text;
}

/**
 * Format data as CSV
 */
export function formatAsCSV(data: ExportData): string {
	const rows: string[][] = [];

	// Header
	rows.push(['Section', 'Category', 'Item', 'Details']);

	// Helper to escape CSV values
	const escapeCSV = (value: string | number | undefined): string => {
		if (value === undefined || value === null) return '';
		const str = String(value);
		if (str.includes(',') || str.includes('"') || str.includes('\n')) {
			return `"${str.replace(/"/g, '""')}"`;
		}
		return str;
	};

	// Community Market Fit
	if (data.community_market_fit) {
		if (data.community_market_fit.score) {
			rows.push([
				'Market Fit',
				'Score',
				'Alignment',
				String(data.community_market_fit.score.alignment ?? ''),
			]);
			rows.push([
				'Market Fit',
				'Score',
				'Virality',
				String(data.community_market_fit.score.virality ?? ''),
			]);
			rows.push([
				'Market Fit',
				'Score',
				'Engagement',
				String(data.community_market_fit.score.engagement ?? ''),
			]);
			rows.push([
				'Market Fit',
				'Score',
				'Differentiation',
				String(data.community_market_fit.score.differentiation ?? ''),
			]);
		}
		if (data.community_market_fit.summary) {
			data.community_market_fit.summary.forEach((item) => {
				rows.push(['Market Fit', 'Summary', '', escapeCSV(item)]);
			});
		}
	}

	// Helper function to normalize items to array
	const normalizeToArray = (
		items: string | string[] | undefined,
	): string[] => {
		if (!items) return [];
		if (Array.isArray(items)) return items;
		if (typeof items === 'string') {
			const lines = items
				.split('\n')
				.filter((line) => line.trim().length > 0);
			return lines.length > 0 ? lines : [items];
		}
		return [];
	};

	// IFC Profile
	if (data.ifc_profile) {
		const demographics = normalizeToArray(data.ifc_profile.demographics);
		demographics.forEach((item) => {
			rows.push(['IFC Profile', 'Demographics', '', escapeCSV(item)]);
		});

		const psychographics = normalizeToArray(
			data.ifc_profile.psychographics,
		);
		psychographics.forEach((item) => {
			rows.push(['IFC Profile', 'Psychographics', '', escapeCSV(item)]);
		});

		const painPoints = normalizeToArray(data.ifc_profile.pain_points);
		painPoints.forEach((item) => {
			rows.push(['IFC Profile', 'Pain Points', '', escapeCSV(item)]);
		});

		const triggers = normalizeToArray(data.ifc_profile.triggers);
		triggers.forEach((item) => {
			rows.push(['IFC Profile', 'Triggers', '', escapeCSV(item)]);
		});

		const communityBehaviors = normalizeToArray(
			data.ifc_profile.community_behaviors,
		);
		communityBehaviors.forEach((item) => {
			rows.push([
				'IFC Profile',
				'Community Behaviors',
				'',
				escapeCSV(item),
			]);
		});
	}

	// Personas
	if (data.personas) {
		data.personas.forEach((persona, personaIndex) => {
			const personaName = persona.name ?? `Persona ${personaIndex + 1}`;
			rows.push([
				'Persona',
				'Basic Info',
				'Name',
				escapeCSV(personaName),
			]);
			if (persona.segment) {
				rows.push([
					'Persona',
					'Basic Info',
					'Segment',
					escapeCSV(persona.segment),
				]);
			}
			if (persona.description) {
				rows.push([
					'Persona',
					'Basic Info',
					'Description',
					escapeCSV(persona.description),
				]);
			}
			if (persona.key_motivation) {
				rows.push([
					'Persona',
					'Basic Info',
					'Key Motivation',
					escapeCSV(persona.key_motivation),
				]);
			}
			if (persona.core_pain_point) {
				rows.push([
					'Persona',
					'Basic Info',
					'Core Pain Point',
					escapeCSV(persona.core_pain_point),
				]);
			}
			if (persona.platform_behavior) {
				rows.push([
					'Persona',
					'Basic Info',
					'Platform Behavior',
					escapeCSV(persona.platform_behavior),
				]);
			}
			if (persona.preferred_tone_style) {
				rows.push([
					'Persona',
					'Basic Info',
					'Preferred Tone & Style',
					escapeCSV(persona.preferred_tone_style),
				]);
			}

			// Storyline
			if (persona.storyline) {
				if (persona.storyline.title) {
					rows.push([
						'Persona',
						'Storyline',
						'Title',
						escapeCSV(persona.storyline.title),
					]);
				}
				if (persona.storyline.theme) {
					rows.push([
						'Persona',
						'Storyline',
						'Theme',
						escapeCSV(persona.storyline.theme),
					]);
				}
				if (persona.storyline.arc?.hook) {
					rows.push([
						'Persona',
						'Storyline',
						'Arc - Hook',
						escapeCSV(persona.storyline.arc.hook),
					]);
				}
				if (persona.storyline.arc?.transformation) {
					rows.push([
						'Persona',
						'Storyline',
						'Arc - Transformation',
						escapeCSV(persona.storyline.arc.transformation),
					]);
				}
				if (persona.storyline.arc?.outcome) {
					rows.push([
						'Persona',
						'Storyline',
						'Arc - Outcome',
						escapeCSV(persona.storyline.arc.outcome),
					]);
				}
				if (persona.storyline.emotional_driver) {
					rows.push([
						'Persona',
						'Storyline',
						'Emotional Driver',
						escapeCSV(persona.storyline.emotional_driver),
					]);
				}
				if (persona.storyline.core_message) {
					rows.push([
						'Persona',
						'Storyline',
						'Core Message',
						escapeCSV(persona.storyline.core_message),
					]);
				}
			}

			// Growth Strategy
			if (persona.growth_strategy) {
				if (persona.growth_strategy.objective) {
					rows.push([
						'Persona',
						'Growth Strategy',
						'Objective',
						escapeCSV(persona.growth_strategy.objective),
					]);
				}
				if (persona.growth_strategy.posting_frequency) {
					rows.push([
						'Persona',
						'Growth Strategy',
						'Posting Frequency',
						escapeCSV(persona.growth_strategy.posting_frequency),
					]);
				}
				if (persona.growth_strategy.content_pillars) {
					persona.growth_strategy.content_pillars.forEach(
						(pillar) => {
							rows.push([
								'Persona',
								'Growth Strategy',
								'Content Pillar',
								escapeCSV(pillar),
							]);
						},
					);
				}
				if (persona.growth_strategy.engagement_tactics) {
					persona.growth_strategy.engagement_tactics.forEach(
						(tactic) => {
							rows.push([
								'Persona',
								'Growth Strategy',
								'Engagement Tactic',
								escapeCSV(tactic),
							]);
						},
					);
				}
				if (persona.growth_strategy.kpis) {
					persona.growth_strategy.kpis.forEach((kpi) => {
						rows.push([
							'Persona',
							'Growth Strategy',
							'KPI',
							escapeCSV(kpi),
						]);
					});
				}
			}

			// Scripts
			if (persona.scripts) {
				persona.scripts.forEach((script, scriptIndex) => {
					rows.push([
						'Persona',
						'Script',
						`Script ${scriptIndex + 1} - Title`,
						escapeCSV(script.title ?? ''),
					]);
					if (script.duration) {
						rows.push([
							'Persona',
							'Script',
							`Script ${scriptIndex + 1} - Duration`,
							escapeCSV(script.duration),
						]);
					}
					if (script.day_of_week) {
						rows.push([
							'Persona',
							'Script',
							`Script ${scriptIndex + 1} - Day`,
							escapeCSV(script.day_of_week),
						]);
					}
					if (script.preferred_time) {
						rows.push([
							'Persona',
							'Script',
							`Script ${scriptIndex + 1} - Time`,
							escapeCSV(script.preferred_time),
						]);
					}
					if (script.script) {
						rows.push([
							'Persona',
							'Script',
							`Script ${scriptIndex + 1} - Content`,
							escapeCSV(script.script),
						]);
					}
					if (script.cta) {
						rows.push([
							'Persona',
							'Script',
							`Script ${scriptIndex + 1} - CTA`,
							escapeCSV(script.cta),
						]);
					}
				});
			}
		});
	}

	// Convert to CSV string
	return rows.map((row) => row.join(',')).join('\n');
}
