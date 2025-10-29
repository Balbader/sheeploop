import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';

import { weatherAgent } from './agents/weather-agent';
// Minimal env check for the agent's model provider only
if (!process.env.OPENAI_API_KEY) {
	throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const mastra = new Mastra({
	agents: { weatherAgent },
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
