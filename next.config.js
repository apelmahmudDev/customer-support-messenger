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
						// value: "SAMEORIGIN",
						value: "ALLOW-FROM http://127.0.0.1:5501/test/index.html",
					},
				],
			},
		];
	},
  }

module.exports = nextConfig;
