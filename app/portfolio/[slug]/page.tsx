import { BentoGridItem } from "@/core/components/ui/bento-grid";
import { TypographyH3, TypographyLead } from "@/core/components/ui/typography";
import { ContactMeCta } from "@/features/marketing/components/contact-me-cta";
import { ViewProjectsCta } from "@/features/marketing/components/view-projects-cta";
import ContentBadges from "@/features/portfolio/components/content-badges";
import { allProjects } from "content-collections";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project._meta.path }));
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

  const findProjectIndex = (projects: typeof allProjects, path: string) => {
    return projects.findIndex((p) => p._meta.path === path);
  };

  const arrayExcludingIndex = <T,>(arr: T[], excludeIndex: number) => {
    if (excludeIndex < 0) {
      return arr;
    }

    return [...arr.slice(0, excludeIndex), ...arr.slice(excludeIndex + 1)];
  };

  const pickRandomItem = <T,>(arr: T[]) => {
    if (!arr.length) {
      return null;
    }

    return arr[Math.floor(Math.random() * arr.length)];
  };

  const currentProjectIndex = findProjectIndex(allProjects, slug);
  const availableOtherProjects = arrayExcludingIndex(allProjects, currentProjectIndex);
  const suggestedProject = pickRandomItem(availableOtherProjects);

  return (
    <article
      className="prose lg:prose-lg mx-auto dark:prose-invert"
      id={`portfolio-project-${slug}`}
    >
      <ContentBadges {...project} />
      <Content />

      {/* CTA section */}
      <section className="mx-auto mt-12 max-w-4xl w-full border-t pt-8 dark:border-neutral-700">
        <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <TypographyH3>Inspired by this project?</TypographyH3>
            <TypographyLead className="mt-1">
              I can help you build something similar — let's chat about your idea and the next
              steps.
            </TypographyLead>
          </div>

          <div className="flex gap-3 not-prose">
            <ContactMeCta />
            <ViewProjectsCta variant="outline" />
          </div>
        </div>
      </section>

      {/* Proposal: Read another random project */}
      {suggestedProject && (
        <section className="mx-auto mt-12 max-w-4xl w-full border-t pt-8 dark:border-neutral-700">
          <div className="gap-6">
            <div>
              <TypographyH3>Read another project</TypographyH3>
              <TypographyLead className="mt-1">
                If you'd like to explore more, here's another project you might enjoy.
              </TypographyLead>
            </div>

            <div className="not-prose w-full max-w-3xl">
              <Link href={`/portfolio/${suggestedProject._meta.path}`} className="block">
                {/* BentoGridItem accepts props and an optional className; make it look right on this layout */}
                <BentoGridItem {...suggestedProject} className="h-120 md:h-96" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
