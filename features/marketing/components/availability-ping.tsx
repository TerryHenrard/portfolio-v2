import { Badge, ShadcnBadgeProps } from "@/core/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/core/components/ui/tooltip";
import { cn } from "@/core/lib/utils";
import { ReactElement } from "react";

export default function AvailabilityPing({
  children = "Currently Available",
  className,
  ...props
}: ShadcnBadgeProps & { children?: Readonly<string> }) {
  return (
    <AvailabilityTooltip>
      <Badge className={cn("gap-1.5", className)} {...props}>
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
        </span>
        <span>{children}</span>
      </Badge>
    </AvailabilityTooltip>
  );
}

function AvailabilityTooltip({ children }: { children: Readonly<ReactElement> }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>I am available from 9 AM to 6 PM</p>
      </TooltipContent>
    </Tooltip>
  );
}
