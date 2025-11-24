import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { TypographyH1, TypographyH2, TypographyH3 } from "./core/components/ui/typography";

const components: MDXComponents = {
  img: (props) => (
    <Image
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="w-full h-auto"
      {...(props as ImageProps)}
      alt={props.alt}
    />
  ),
  h1: (props) => <TypographyH1 {...props} />,
  h2: (props) => <TypographyH2 {...props} />,
  h3: (props) => <TypographyH3 {...props} />,
  // pre: (props) => <pre className="bg-card p-4 overflow-x-auto" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
