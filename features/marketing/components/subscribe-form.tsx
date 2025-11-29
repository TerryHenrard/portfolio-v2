"use client";

import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Send } from "lucide-react";

export function SubscribeForm({
  description = "Subscribe to get updates about new projects and occasional tips and tricks.",
}: {
  description?: string;
}) {
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Label className="sr-only" htmlFor="subscribe-email">
        Email address
      </Label>
      <div className="flex w-full flex-col gap-2 items-center md:flex-row md:items-center">
        <div className="w-full md:flex-1">
          <Input
            id="subscribe-email"
            name="email"
            placeholder="your@email.com"
            className="h-10 rounded-4xl corner-squircle"
            autoComplete="email"
          />
        </div>
        <div className="w-full md:w-auto">
          <Button size="lg" type="submit" className="w-full">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {description && <span className="text-muted-foreground text-xs">{description}</span>}
    </form>
  );
}
