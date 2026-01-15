import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'VNO | AI Note',
        short_name: 'VNO',
        description: 'VNO | AI Note',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        orientation: 'portrait-primary',
        icons: [
            {
                src: 'pwa-64x64.png',
                sizes: '64x64',
                type: 'image/png',
            },
            {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: 'maskable-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}
