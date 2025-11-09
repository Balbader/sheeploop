import { withNextVideo } from 'next-video/process';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	serverExternalPackages: ['@mastra/*'],
	webpack: (config, { isServer }) => {
		// Exclude next-video generated JSON files from being processed as modules
		config.module.rules.push({
			test: /\.mp4\.json$/,
			type: 'asset/resource',
		});
		return config;
	},
};

export default withNextVideo(nextConfig);
