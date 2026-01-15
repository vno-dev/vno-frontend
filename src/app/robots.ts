import { VNO_APP_URL } from "@/config/env";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [""],
        },
        sitemap: [
            `${VNO_APP_URL}/sitemap.xml`,
            `${VNO_APP_URL}/sitemap_index.xml`,
        ],
    };
}
