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
            bodySizeLimit: '1024mb',
        },
    },
    api: {
        bodyParser: {
            sizeLimit: '1024mb',
        },
    },
};


export default nextConfig;
