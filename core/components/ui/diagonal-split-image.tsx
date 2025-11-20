import { cn } from "@/core/lib/utils";
import Image from "next/image";

interface DiagonalSplitImageProps {
  src1: string;
  alt1: string;
  src2: string;
  alt2: string;
  width: number;
  height: number;
  className?: string;
}

export function DiagonalSplitImage({
  src1,
  alt1,
  src2,
  alt2,
  width,
  height,
  className,
}: DiagonalSplitImageProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Second Image (Bottom Right) */}
      <Image
        src={src2}
        alt={alt2}
        width={width}
        height={height}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* First Image (Top Left) */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      >
        <Image
          src={src1}
          alt={alt1}
          width={width}
          height={height}
          className="h-full w-full object-cover object-center"
        />
      </div>
      {/* Diagonal Split Line */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          className="stroke-border"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          className="stroke-border"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
