import { cn } from "@/core/lib/utils";
import { ComponentProps } from "react";

type HandwrittedProps = ComponentProps<"p"> & Readonly<{ children?: string }>;

export function Handwritted({ className, children = "Terry Henrard", ...props }: HandwrittedProps) {
  return (
    <p className={cn("font-dancing-script text-2xl", className)} {...props}>
      {children}
    </p>
  );
}
