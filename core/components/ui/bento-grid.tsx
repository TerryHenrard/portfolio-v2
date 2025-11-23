import { Card, CardContent } from "@/core/components/ui/card";
import { cn } from "@/core/lib/utils";
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

interface BentoGridItemProps {
  className?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
}: BentoGridItemProps) => {
  return (
    <Card className={cn("h-full p-0 overflow-hidden", className)}>
      <CardContent className="px-6 flex flex-col gap-2 pt-6 text-left">
        <h3 className="text-foreground text-lg font-semibold font-mono">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <Image
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className={`h-full w-full object-cover object-center ${
          imageSrc.endsWith("/ai-powered-saas-dashboard.png") ? "object-bottom pb-20" : ""
        }`}
        src={imageSrc}
      />
    </Card>
  );
};
