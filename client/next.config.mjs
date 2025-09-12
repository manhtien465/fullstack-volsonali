/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // images: {
  //   unoptimized: true,
  // },
  images: {
     unoptimized: true,
    domains: ['lazyblogadmin.productminting.com','admin.megagamefun.org']
  },
}

export default nextConfig
