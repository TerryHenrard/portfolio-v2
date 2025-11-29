import { Button, ShadcnButtonProps } from "@/core/components/ui/button";
import { cn } from "@/core/lib/utils";
import Link from "next/link";

export function ContactMeCta({
  className,
  children = "Contact Me",
  href = "/#contact",
  size = "lg",
  asChild = true,
  ...props
}: ShadcnButtonProps & { children?: string; href?: string }) {
  return (
    <Button className={cn("corner-squircle", className)} size={size} asChild={asChild} {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
