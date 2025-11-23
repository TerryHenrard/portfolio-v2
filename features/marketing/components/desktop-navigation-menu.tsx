"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/core/components/ui/navigation-menu";
import { useIsMobile } from "@/core/hooks/use-mobile";
import Link from "next/link";
import { ContactMeCta } from "./contact-me-cta";

export const menuItems: { title: string; href: string }[] = [
  { title: "Projects", href: "/#portfolio" },
  { title: "About Me", href: "/#about" },
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/#faq" },
  { title: "Contact Me", href: "/#contact" },
];

export function DesktopNavigationMenu() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList>
        {menuItems.map((item) => {
          if (item.title === "Contact Me") {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <ContactMeCta variant={"outline"} />
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="bg-transparent" href={item.href}>
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
