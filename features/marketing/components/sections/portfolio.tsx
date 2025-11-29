import { Badge } from "@/core/components/ui/badge";
import { BentoGrid, BentoGridItem } from "@/core/components/ui/bento-grid";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import { allProjects } from "content-collections";
import Link from "next/link";

const [one, two, three, four] = allProjects;
const sortedProjects = [three, two, one, four]; // Ensure consistent order

export function Portfolio() {
  return (
    <section className="py-24 border-b text-center flex flex-col gap-9.5" id="portfolio">
      <div className="max-w-xl m-auto flex flex-col gap-5">
        <Badge className="m-auto tracking-widest">PORTFOLIO</Badge>
        <TypographyH2>Discover what I've created</TypographyH2>
        <TypographyLead className="text-base">
          Each piece reflects my passion for innovation and commitment to delivering high-quality
          results. Feel free to explore and get inspired!
        </TypographyLead>
      </div>
      <BentoGrid className="mx-auto max-w-none">
        {sortedProjects.map((project, index) => (
          <Link
            href={`/portfolio/${project._meta.path}`}
            key={project.title}
            className={index === 0 || index === 3 ? "md:col-span-2" : "" + ""}
          >
            <BentoGridItem {...project} />
          </Link>
        ))}
      </BentoGrid>
    </section>
  );
}
