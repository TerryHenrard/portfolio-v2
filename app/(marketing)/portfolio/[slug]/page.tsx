import { TypographyH3, TypographyLead } from "@/core/components/ui/typography";
import { ContactMeCta } from "@/features/marketing/components/contact-me-cta";
import { SubscribeForm } from "@/features/marketing/components/subscribe-form";
import { ViewProjectsCta } from "@/features/marketing/components/view-projects-cta";
import ContentBadges from "@/features/portfolio/components/content-badges";
import { ProjectCard } from "@/features/portfolio/components/project-card";
import { allProjects } from "content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project._meta.path }));
}

interface PortfolioProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PortfolioProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((project) => project._meta.path === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    keywords: project.tags,
    authors: [{ name: project.author }],
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      authors: [project.author],
      images: project.coverImagePath
        ? [
            {
              url: project.coverImagePath,
              width: 1200,
              height: 630,
              alt: project.coverImageAlt ?? project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.coverImagePath ? [project.coverImagePath] : undefined,
    },
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
  };
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
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="max-w-sm text-center md:text-left">
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

      {/* Newsletter subscription */}
      <section className="mx-auto mt-12 max-w-4xl w-full border-t pt-8 dark:border-neutral-700">
        <div className="flex flex-col items-center gap-6 md:flex-row-reverse md:justify-between">
          <div className="max-w-sm text-center md:text-left">
            <TypographyH3>Subscribe to my newsletter</TypographyH3>
            <TypographyLead className="mt-1">
              Get updates about new projects and occasional tips and tricks — just useful stuff.
            </TypographyLead>
          </div>

          <div className="max-w-2xs w-full">
            <SubscribeForm description="" />
          </div>
        </div>
      </section>

      {/* Proposal: Read another random project */}
      {suggestedProject && (
        <section className="mx-auto mt-12 max-w-4xl w-full border-t pt-8 dark:border-neutral-700">
          <div className="gap-6">
            <div className="max-w-sm text-center md:text-left">
              <TypographyH3>Read another project</TypographyH3>
              <TypographyLead className="mt-1">
                If you'd like to explore more, here's another project you might enjoy.
              </TypographyLead>
            </div>

            <div className="not-prose w-full max-w-3xl">
              <ProjectCard {...suggestedProject} className="h-120 md:h-96" />
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
