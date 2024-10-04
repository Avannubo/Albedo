/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/Blog/:slug*',
                destination: 'http://blog.albedo.biz/:slug*',
                permanent: true,
            },
        ]
    },

    images: {
        domains: ['blog.albedo.biz'],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '127mb',
        },
    },
};


export default nextConfig;
