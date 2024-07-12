/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '1024mb', // maximum limit is `4.5MB/4MB` for Vercel
        },
    }, 
};


export default nextConfig;
