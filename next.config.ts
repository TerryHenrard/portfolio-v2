import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  pageExtensions: ["mdx", "tsx"],
  images: {
    remotePatterns: [new URL("https://shadcndesign-dev-portfolio-template.vercel.app/**")],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    mdxRs: {
      mdxType: "gfm",
    },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withContentCollections(withMDX(nextConfig));
