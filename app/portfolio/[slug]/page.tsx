export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "thomas-and-piron-ai-agent" }];
}

interface PortfolioProps {
  params: Promise<{ slug: string }>;
}

export default async function Portfolio({ params }: PortfolioProps) {
  const { slug } = await params;
  const { default: Content } = await import(`@/features/portfolio/content/${slug}.mdx`);

  return (
    <article
      className="prose lg:prose-lg m-auto dark:prose-invert"
      id={`portfolio-project-${slug}`}
    >
      <Content />
    </article>
  );
}
