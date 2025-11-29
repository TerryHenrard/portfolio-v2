import { Badge } from "@/core/components/ui/badge";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import { ContactMeCta } from "@/features/marketing/components/contact-me-cta";
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

      {/* Call to action section */}
      <div className="mt-16 border-t pt-12">
        <div className="max-w-3xl m-auto text-center flex flex-col gap-3">
          <Badge className="m-auto tracking-widest">WORK WITH ME</Badge>
          <TypographyH2>Like what you see?</TypographyH2>
          <TypographyLead className="text-base">
            I'm available for freelance projects and collaborations. If you have a project in mind
            or want to discuss how I can help, let's chat.
          </TypographyLead>
          <div className="mt-4">
            <ContactMeCta size="lg" />
          </div>
        </div>
      </div>

      {/* More coming soon section */}
      {/* <div className="mt-16 border-t border-input pt-12">
        <div className="max-w-3xl m-auto text-center flex flex-col gap-3">
          <Badge className="m-auto tracking-widest">COMING SOON</Badge>
          <TypographyH2>More Projects Coming Soon</TypographyH2>
          <TypographyLead className="text-base">
            Like my work and wanna stay up to date? Drop your email below and I'll send occasional
            updates about new projects and behind-the-scenes notes.
          </TypographyLead>
          <div className="mt-4 w-full">
            <div className="m-auto w-full max-w-lg flex flex-col sm:flex-row items-center gap-2">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 h-10 rounded-4xl corner-squircle"
              />
              <Button variant="default" size="lg" type="button">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
