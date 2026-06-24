import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import "./core/env/server";

const nextConfig: NextConfig = {
	reactCompiler: true,
	poweredByHeader: false,
	pageExtensions: ["mdx", "tsx", "ts"],
	images: {
		remotePatterns: [
			new URL("https://shadcndesign-dev-portfolio-template.vercel.app/**"),
		],
	},
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
	async redirects() {
		return [
			{
				source: "/:path*",
				has: [
					{
						type: "host",
						value: "terry-henrard.dev",
					},
				],
				destination: "https://henrard.ai/:path*",
				permanent: true,
			},
		];
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [
			"remark-gfm",
			"remark-frontmatter",
			"remark-mdx-frontmatter",
			"remark-toc",
			"@fec/remark-a11y-emoji",
		],
		rehypePlugins: [
			"rehype-slug",
			"rehype-autolink-headings",
			"rehype-pretty-code",
			["rehype-img-size", { dir: "public" }],
		],
	},
});

export default withContentCollections(withMDX(nextConfig));
