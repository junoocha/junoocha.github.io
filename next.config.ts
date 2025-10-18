/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export
  basePath: "/your-repo-name", // replace with your GitHub repo name
  images: {
    unoptimized: true, // Next.js image optimization won't work on GitHub Pages
  },
};

export default nextConfig;
