import ContentBadges from "@/features/portfolio/components/content-badges";
import { allProjects } from "content-collections";
import { notFound } from "next/navigation";
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

  const project = allProjects.find((project) => project._meta.path === slug);

  if (!project) {
    notFound();
  }

  return (
    <article
      className="prose lg:prose-lg mx-auto dark:prose-invert"
      id={`portfolio-project-${slug}`}
    >
      {project && <ContentBadges {...project} />}
      <Content />
    </article>
  );
}
