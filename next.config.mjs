/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // This allows all domains with https protocol
            },
            {
                protocol: 'http',
                hostname: '**', // This allows all domains with http protocol
            },
        ],
    },
};

export default nextConfig;
