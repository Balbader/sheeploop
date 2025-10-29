import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';

import { weatherAgent } from './agents/weather-agent';
import { Env } from '@/env';

// Ensure required environment variables are present at startup
Env.initialize();

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
