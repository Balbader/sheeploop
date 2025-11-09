import { withNextVideo } from "next-video/process";
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	serverExternalPackages: ['@mastra/*'],
};

export default withNextVideo(nextConfig);