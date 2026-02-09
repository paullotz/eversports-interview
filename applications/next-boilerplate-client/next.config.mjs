/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@frontend-interview/types"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
