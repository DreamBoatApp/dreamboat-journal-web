import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/:locale(de|es|pt)/:path*',
                destination: '/en/:path*',
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
