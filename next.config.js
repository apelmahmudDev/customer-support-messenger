/** @type {import('next').NextConfig} */

const nextConfig = {
	output: process.env.NODE_ENV === "production" ? "export" : "",
	assetPrefix:
		process.env.NODE_ENV === "production"
			? `/${process.env.ASSET_PREFIX}`
			: "",
	images: {
		unoptimized: process.env.NODE_ENV === "production" ? true : false,
	},
};

module.exports = nextConfig;
