"use client";

import { CopyrightIcon } from "lucide-react";
import Link from "next/link";

export function Copyright() {
  return (
    <p className="order-2 md:order-1 text-sm">
      <span className="flex gap-1 items-center">
        Copyright {new Date().getFullYear()}
        <CopyrightIcon className="size-3.5" />
        <Link className="hover:underline" target="_blank" href="https://terry-henrard.dev">
          terry-henrard.dev
        </Link>
      </span>
    </p>
  );
}
