import type { Project } from "content-collections";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/core/components/ui/card";
import { cn } from "@/core/lib/utils";
import ContentBadges from "./content-badges";

type ProjectCardProps = Pick<
  Project,
  "title" | "description" | "coverImagePath" | "coverImageAlt" | "readingTimeMinutes" | "_meta"
> & {
  className?: string;
};

export function ProjectCard({
  title,
  description,
  coverImagePath,
  coverImageAlt,
  readingTimeMinutes,
  _meta,
  className,
}: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${_meta.path}`} className={cn("block", className)}>
      <Card className="h-full p-0 overflow-hidden relative group">
        <CardContent className="px-6 flex flex-col gap-2 pt-6 pb-4 text-left z-10 bg-card/70 backdrop-blur-sm group-hover:opacity-0 opacity-100 transition-all duration-300 group-hover:-translate-y-10">
          <h3 className="text-foreground text-lg font-semibold font-mono flex justify-between flex-wrap">
            {title}
            <ContentBadges readingTimeMinutes={readingTimeMinutes} className="mb-0" />
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <Image
          alt={coverImageAlt}
          className="h-full w-full object-cover object-center group-hover:scale-115 transition-transform duration-800 ease-in-out"
          src={coverImagePath}
          fill
        />
      </Card>
    </Link>
  );
}
