import { MetadataRoute } from 'next'

export default function mainifest(): MetadataRoute.Manifest {
  return {
    name: 'Star Breaker Raid',
    short_name: 'SBR',
    description: 'LostArk raid Scheduling',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#121826',

    icons: [
      {
        src: 'logo/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: 'logo/logo-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'logo/logo-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
