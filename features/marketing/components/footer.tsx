import { Separator } from "@/core/components/ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { Handwritted } from "./handwritted";

export function Footer() {
  return (
    <footer className="bg-background py-24 border-t">
      <div className="container mx-auto flex flex-col gap-12 px-6 lg:gap-16">
        <div className="relative flex flex-col items-center gap-12 md:items-center md:justify-between lg:flex-row lg:gap-8">
          <Link href="/" aria-label="Go to homepage">
            <div className="flex items-center gap-2">
              <Handwritted className="text-3xl" />
            </div>
          </Link>
          <nav
            className="flex flex-col items-center gap-6 md:gap-8 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex-row"
            aria-label="Footer navigation"
          >
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="/#projects"
            >
              Projects
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="/#about-me"
            >
              About me
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="/blog"
            >
              Blog
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="/#contact"
            >
              Contact
            </Link>
          </nav>
          <div className="flex justify-center gap-4 md:gap-6" aria-label="Social media links">
            <Link
              className="transition-all duration-300 hover:scale-110"
              aria-label="Follow us on Facebook"
              href="#"
            >
              <Facebook className="w-6 h-6" />
            </Link>
            <Link
              className="transition-all duration-300 hover:scale-110"
              aria-label="Follow us on Instagram"
              href="#"
            >
              <Instagram className="w-6 h-6" />
            </Link>
            <Link
              className="transition-all duration-300 hover:scale-110"
              aria-label="Follow us on Twitter"
              href="#"
            >
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-between gap-12 text-center md:gap-6 lg:flex-row lg:text-left">
          <p className="text-muted-foreground order-2 md:order-1">
            <span>
              Copyright {new Date().getFullYear()} ©{" "}
              <Link className="hover:underline" target="_blank" href="https://shadcndesign.com">
                shadcndesign.com
              </Link>
            </span>
          </p>
          <nav
            className="order-1 flex flex-col items-center gap-6 text-center md:order-2 md:flex-row md:gap-7"
            aria-label="Legal links"
          >
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="/legal-page"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="/legal-page"
            >
              Terms of Service
            </Link>
            <Link
              className="text-muted-foreground hover:text-foreground transition-colors"
              href="/legal-page"
            >
              Cookies Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
