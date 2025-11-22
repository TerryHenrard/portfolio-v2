import { Card, CardContent } from "@/core/components/ui/card";
import { DiagonalSplitImage } from "@/core/components/ui/diagonal-split-image";
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
  secondImageSrc?: string;
  secondImageAlt?: string;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  secondImageSrc,
  secondImageAlt,
}: BentoGridItemProps) => {
  return (
    <Card className={cn("h-full p-0 overflow-hidden", className)}>
      <CardContent className="px-6 flex flex-col gap-2 pt-6 text-left">
        <h3 className="text-foreground text-lg font-semibold font-mono">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      {secondImageSrc && secondImageAlt ? (
        <DiagonalSplitImage
          src1={imageSrc}
          alt1={imageAlt}
          src2={secondImageSrc}
          alt2={secondImageAlt}
          width={imageWidth}
          height={imageHeight}
          className="h-full w-full"
        />
      ) : (
        <Image
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="h-full w-full object-cover object-center"
          src={imageSrc}
        />
      )}
    </Card>
  );
};
