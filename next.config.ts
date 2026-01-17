import { withNextVideo } from "next-video/process";
import { VNO_API_URL } from "@/config/env";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    output: "standalone",
    async rewrites() {
        return [
            {
                source: "/vno-api/v1/:path*",
                destination: `${VNO_API_URL}/api/v1/:path*`,
            },
        ];
    },
    experimental: {
        viewTransition: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ["plus.unsplash.com", "images.unsplash.com"],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextVideo(withNextIntl(nextConfig));