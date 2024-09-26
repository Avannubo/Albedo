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
        domains: ['res.cloudinary.com'], // Add the Cloudinary domain
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '1024mb', // maximum limit is `4.5MB/4MB` for Vercel
        },
    }, 
};


export default nextConfig;
