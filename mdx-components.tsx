import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { TypographyH1, TypographyH2, TypographyH3 } from "./core/components/ui/typography";

const components: MDXComponents = {
  // eslint-disable-next-line jsx-a11y/alt-text
  img: (props) => <Image sizes="100vw" className="w-full h-auto" {...(props as ImageProps)} />,
  h1: (props) => <TypographyH1 {...props} />,
  h2: (props) => <TypographyH2 {...props} />,
  h3: (props) => <TypographyH3 {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
