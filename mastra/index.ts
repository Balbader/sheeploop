import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';

import { communityFitStorylineAgent } from './agents/community-fit-storyline.agent';
// Minimal env check for the agent's model provider only
if (!process.env.ANTHROPIC_API_KEY) {
	throw new Error('Missing ANTHROPIC_API_KEY environment variable');
}

declare global {
	// eslint-disable-next-line no-var
	var __mastra__: Mastra | undefined;
}

const createMastra = () =>
	new Mastra({
		agents: { communityFitStorylineAgent },
		logger: new PinoLogger({
			name: 'Mastra',
			level: 'info',
		}),
		telemetry: {
			enabled: false,
		},
		observability: {
			default: { enabled: true },
		},
	});

export const mastra = globalThis.__mastra__ ?? createMastra();
if (!globalThis.__mastra__) {
	globalThis.__mastra__ = mastra;
}
