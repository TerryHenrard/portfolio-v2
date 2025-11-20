import Link from "next/link";
import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { Handwritted } from "./handwritted";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="font-dancing-script text-2xl">
        <Handwritted />
      </Link>
      <div className="flex items-center gap-4 sticky top-0 backdrop-blur-sm bg-background/80 z-50 isolate py-3.5 md:py-4">
        <DesktopNavigationMenu />
        {/* <ModeToggle /> */}
      </div>
    </header>
  );
}
