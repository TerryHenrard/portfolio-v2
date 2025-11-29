import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import { ImageLightbox } from "./core/components/ui/image-lightbox";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "./core/components/ui/typography";

const components: MDXComponents = {
  img: (props) => <ImageLightbox sizes="100vw" {...(props as ImageProps)} alt={props.alt || ""} />,
  h1: (props) => <TypographyH1 {...props} />,
  h2: (props) => <TypographyH2 {...props} />,
  h3: (props) => <TypographyH3 {...props} />,
  h4: (props) => <TypographyH4 {...props} />,
  p: (props) => <TypographyP {...props} />,
  pre: (props) => <pre {...props} className="corner-squircle rounded-4xl!" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
