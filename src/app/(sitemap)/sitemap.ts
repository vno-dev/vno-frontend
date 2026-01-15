import { VNO_APP_URL } from "@/config/env";
import type { MetadataRoute } from "next";

const PUBLIC_ROUTES = {
    HOME: "/",
    CONTACT: "/contact",
    PRIVACY: "/privacy",
    TERMS: "/terms",
    ONBOARDING: "/onboarding",
    PRICING: "/pricing",
};

type changeFrequency =
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const changeFrequency = "daily" as changeFrequency;

    const routes = Object.values(PUBLIC_ROUTES).map((page: string) => ({
        url: `${VNO_APP_URL}${page}`,
        lastModified: new Date().toISOString(),
        changeFrequency,
    }));

    return [...routes];
}
