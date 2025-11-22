"use client";

import { CopyrightIcon } from "lucide-react";
import Link from "next/link";

export function Copyright() {
  return (
    <p className="text-muted-foreground order-2 md:order-1">
      <span className="flex gap-1 items-center">
        Copyright {new Date().getFullYear()}
        <CopyrightIcon className="size-3.5 text-foreground" />
        <Link className="hover:underline" target="_blank" href="https://terry-henrard.dev">
          terry-henrard.dev
        </Link>
      </span>
    </p>
  );
}
