import { cn } from "@/core/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
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
}
