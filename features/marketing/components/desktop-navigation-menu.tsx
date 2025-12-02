"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/core/components/ui/navigation-menu";
import { useIsMobile } from "@/core/hooks/use-mobile";
import { allProjects } from "content-collections";
import Link from "next/link";
import { menuItems } from "../lib/menu-items";
import { ContactMeCta } from "./contact-me-cta";

const [one, two, three, four] = allProjects;
const sortedProjects = [three, two, one, four]; // Ensure consistent order

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="flex gap-2">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function DesktopNavigationMenu() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList>
        {menuItems.map((item) => {
          if (item.title === "Projects") {
            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className={"bg-transparent"}>
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[635px] lg:grid-cols-[.75fr_1fr_1fr]">
                    <li className="row-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/portfolio"
                          className="bg-transparent h-full flex justify-end p-4"
                        >
                          <div className="text-lg font-medium">All Projects</div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Discover all my projects in one place.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {sortedProjects.map((project) => (
                      <ListItem
                        key={project.title}
                        title={project.title}
                        href={`/portfolio/${project._meta.path}`}
                      >
                        {project.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

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
