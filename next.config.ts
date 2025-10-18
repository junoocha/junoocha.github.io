/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export
  basePath: "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
