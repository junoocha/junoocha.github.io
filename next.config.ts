/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export
  images: {
    unoptimized: true, // Next.js image optimization won't work on GitHub Pages
  },
};

export default nextConfig;
