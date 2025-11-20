import * as React from "react";

import { cn } from "@/core/lib/utils";

// Basic typography building blocks following shadcn styling conventions
// These are small, accessible reusable elements (H1..H4, P, Lead, Small, Blockquote, Table)

export function TypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight text-balance", className)}
      {...props}
    />
  );
}

export function TypographyH2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...props}
    />
  );
}

export function TypographyH3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function TypographyH4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
  );
}

export function TypographyP({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("leading-7 not-first:mt-6", className)} {...props} />;
}

export function TypographyLead({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-muted-foreground text-xl", className)} {...props} />;
}

export function TypographySmall({ className, ...props }: React.ComponentProps<"small">) {
  return <small className={cn("text-sm leading-none font-medium", className)} {...props} />;
}

export function TypographyBlockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />;
}

export function TypographyTable({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("my-6 w-full overflow-y-auto", className)} {...props}>
      {children}
    </div>
  );
}

export function TypographyLarge({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-lg font-semibold", className)} {...props} />;
}

// A container wrapper for article/prose content if needed (uses tailwind's prose classes).
export function Typography({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)} {...props}>
      {children}
    </div>
  );
}

export default Typography;
