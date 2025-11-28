import { Badge } from "@/core/components/ui/badge";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import ProjectSearch from "@/features/portfolio/components/project-search";
import { allProjects } from "content-collections";

export const dynamic = "force-static";

export default function PortfolioPage() {
  const projects = allProjects;

  // Collect unique tags
  const tags = projects.reduce((acc: string[], p) => {
    if (!p.tags) return acc;
    p.tags.forEach((t: string) => {
      if (!acc.includes(t)) acc.push(t);
    });
    return acc;
  }, []);

  return (
    <div>
      <div className="max-w-3xl m-auto text-center flex flex-col gap-5">
        <Badge className="m-auto tracking-widest">PORTFOLIO</Badge>
        <TypographyH2>Discover All My Projects</TypographyH2>
        <TypographyLead className="text-base">
          Each piece reflects my passion for innovation and commitment to delivering high-quality
          results. Explore my full portfolio, search, and filter by tags to find projects that match
          your interests.
        </TypographyLead>
      </div>

      <div className="mt-12">
        <ProjectSearch projects={projects} tags={tags} />
      </div>
    </div>
  );
}
