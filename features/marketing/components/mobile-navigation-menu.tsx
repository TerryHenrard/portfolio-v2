"use client";

import { Button } from "@/core/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/core/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { menuItems } from "../lib/menu-items";
import { ContactMeCta } from "./contact-me-cta";

export function MobileNavigationMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-xs">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-4">
          <SheetClose asChild>
            <Link
              href={"/"}
              className="flex items-center py-3 text-base font-medium hover:text-primary transition-colors border-b border-border"
            >
              {"Home"}
            </Link>
          </SheetClose>
          {menuItems.map((item) => {
            if (item.title === "Contact Me") {
              return (
                <SheetClose asChild key={item.title}>
                  <ContactMeCta className="w-full justify-center" />
                </SheetClose>
              );
            }
            return (
              <SheetClose asChild key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center py-3 text-base font-medium hover:text-primary transition-colors border-b border-border"
                >
                  {item.title}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
