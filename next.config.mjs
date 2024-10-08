/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/js',
                destination: "/api/js",
            },
            {
                source: '/script',
                destination: "/api/js",
            },
            {
                source: '/(.*).js',
                destination: "/api/js",
            },
            {
                source: '/api',
                destination: `${process.env.API_URL}/api`,
            },
            {
                source: '/(.*)',
                destination: '/',
            },
        ];
    },
};

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzerConfig = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzerConfig(nextConfig);
