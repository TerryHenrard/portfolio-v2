import type { Project } from "@/content-collections";
import { Badge } from "@/core/components/ui/badge";
import { cn } from "@/core/lib/utils";
import { Calendar, Clock, LayoutGrid, User } from "lucide-react";
import Link from "next/link";

// Reuse the Project type's fields, but allow createdAt/updatedAt to be Date | string for convenience
type ContentBadgesProps = Omit<Project, "content"> & { className?: string };

function formatDate(date?: string | Date) {
  if (!date) return undefined;
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ContentBadges({
  author,
  createdAt,
  updatedAt,
  readingTimeMinutes,
  category,
  tags,
  className,
}: ContentBadgesProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 mb-4", className)}>
      {category && (
        <Link href={`/portfolio`} className="group">
          <Badge className="gap-1.5">
            <LayoutGrid size={14} />
            <span className="group-hover:underline">{category}</span>
          </Badge>
        </Link>
      )}

      <Badge variant="secondary" className="gap-1.5">
        <User size={14} />
        <span>{author}</span>
      </Badge>

      {createdAt && (
        <Badge variant="secondary" className="gap-1.5">
          <Calendar size={14} />
          <span>Created {formatDate(createdAt)}</span>
        </Badge>
      )}

      {updatedAt && updatedAt !== createdAt && (
        <Badge variant="secondary" className="gap-1.5">
          <Calendar size={14} />
          <span>Last update {formatDate(updatedAt)}</span>
        </Badge>
      )}

      {readingTimeMinutes && (
        <Badge variant="secondary" className="gap-1.5">
          <Clock size={14} />
          <span>{readingTimeMinutes} min read</span>
        </Badge>
      )}

      {tags &&
        tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1.5">
            {tag}
          </Badge>
        ))}
    </div>
  );
}
