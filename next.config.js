/** @type {import('next').NextConfig} */

const nextConfig = {
	output: process.env.NODE_ENV === "production" ? "export" : "",
	assetPrefix:
		process.env.NODE_ENV === "production"
			? `/${process.env.ASSET_PREFIX}`
			: "",
	images: {
		unoptimized: process.env.NODE_ENV === "production" ? true : false,
		domains: ["staging.artifism.techvill.net", "lh3.googleusercontent.com"],
	},
	async redirects() {
		return [
		  {
			source: '/about',
			destination: '/',
			permanent: true,
		  },
		]
	  },
};

module.exports = nextConfig;
