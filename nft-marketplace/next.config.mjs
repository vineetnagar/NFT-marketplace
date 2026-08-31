/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ivory-actual-hippopotamus-842.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
