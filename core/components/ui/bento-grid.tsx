import { Project } from "@/content-collections";
import { Card, CardContent } from "@/core/components/ui/card";
import { cn } from "@/core/lib/utils";
import ContentBadges from "@/features/portfolio/components/content-badges";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[28rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = async ({
  className,
  title,
  description,
  coverImageAlt,
  coverImagePath,
  readingTimeMinutes,
}: Omit<Project, "content"> & { className?: string }) => {
  return (
    <Card className={cn("h-full p-0 overflow-hidden relative group", className)}>
      <CardContent className="px-6 flex flex-col gap-2 pt-6 pb-4 text-left z-10 bg-card/70 backdrop-blur-sm group-hover:opacity-0 opacity-100 transition-all duration-300 group-hover:-translate-y-10">
        <h3 className="text-foreground text-lg font-semibold font-mono flex justify-between flex-wrap">
          {title} <ContentBadges readingTimeMinutes={readingTimeMinutes} className="mb-0" />
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      {/* <CardFooter className="relative h-full w-full"> */}
      <Image
        alt={coverImageAlt}
        className={`h-full w-full object-cover object-center group-hover:scale-115 transition-transform duration-800 ease-in-out`}
        src={coverImagePath}
        fill
      />
      {/* </CardFooter> */}
    </Card>
  );
};
