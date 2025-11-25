"use client";

import { useScrolled } from "@/core/hooks/use-scrolled";
import { cn } from "@/core/lib/utils";
import Link from "next/link";
import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { Handwritted } from "./handwritted";

export function Header() {
  const scrolled = useScrolled(50);

  return (
    <header
      className={cn(
        "fixed left-1/2 bg-red-500 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-300 ease-in-out",
        scrolled
          ? "top-4 w-[90%] max-w-4xl rounded-full border bg-background/10 backdrop-blur-md shadow-md py-2 px-6"
          : "top-0 w-full container bg-background/10 backdrop-blur-sm py-4 px-4 md:px-8"
      )}
    >
      <Link href="/">
        <Handwritted />
      </Link>
      <div className="flex items-center gap-4 ">
        <DesktopNavigationMenu />
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
}
