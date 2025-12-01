import { Button, ShadcnButtonProps } from "@/core/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/core/components/ui/tooltip";
import { cn } from "@/core/lib/utils";
import { FileDown } from "lucide-react";

type DownloadCvCtaProps = Omit<ShadcnButtonProps, "asChild"> & {
  iconOnly?: boolean;
};

export function DownloadCvCta({
  className,
  size = "lg",
  iconOnly = false,
  ...props
}: DownloadCvCtaProps) {
  if (iconOnly) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn("rounded-4xl corner-squircle", className)}
            variant="ghost"
            size="icon-lg"
            asChild
            {...props}
          >
            <a
              href="/documents/cv-2025-en-fr.pdf"
              download
              className="transition-all duration-300 hover:scale-110"
              aria-label="Download CV"
            >
              <FileDown className="size-6" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download CV</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button
      className={cn("corner-squircle", className)}
      variant="secondary"
      size={size}
      asChild
      {...props}
    >
      <a href="/documents/cv-2025-en-fr.pdf" download>
        <FileDown className="size-4" />
        Download CV
      </a>
    </Button>
  );
}
