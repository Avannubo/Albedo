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
    reactStrictMode: false,

    experimental: {
        serverActions: {
            bodySizeLimit: '10MB',
        },
    },
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};


export default nextConfig;
