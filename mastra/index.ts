import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { VercelDeployer } from '@mastra/deployer-vercel';

import { weatherAgent } from './agents/weather-agent';

export const mastra = new Mastra({
	agents: { weatherAgent },
	logger: new PinoLogger({
		name: 'Mastra',
		level: 'info',
	}),
	telemetry: {
		// Telemetry is deprecated and will be removed in the Nov 4th release
		enabled: false,
	},
	observability: {
		// Enables DefaultExporter and CloudExporter for AI tracing
		default: { enabled: true },
	},
	deployer: new VercelDeployer({
		maxDuration: 600,
		memory: 2048,
	}),
});
