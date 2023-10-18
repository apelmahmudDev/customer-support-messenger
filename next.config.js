/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		domains: ["staging.artifism.techvill.net", "lh3.googleusercontent.com"],
	},
	// iframe access from another domain
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
				],
			},
		];
	},
  }

module.exports = nextConfig;
