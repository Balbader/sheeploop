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
	async rewrites() {
		return [
			{
				source: '/ingest/static/:path*',
				destination: 'https://us-assets.i.posthog.com/static/:path*',
			},
			{
				source: '/ingest/:path*',
				destination: 'https://us.i.posthog.com/:path*',
			},
		];
	},
	// This is required to support PostHog trailing slash API requests
	skipTrailingSlashRedirect: true,
};

export default withNextVideo(nextConfig);
