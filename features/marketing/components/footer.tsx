import { Button } from "@/core/components/ui/button";
import { Copyright } from "@/core/components/ui/copyright";
import { Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { menuItems } from "../lib/menu-items";
import { ContactMeCta } from "./contact-me-cta";
import { Handwritted } from "./handwritted";
import { SubscribeForm } from "./subscribe-form";

const socialLinks = [
  { href: "tel:+32498146651", label: "Call me", Icon: Phone, external: false },
  {
    href: "mailto:terry.henrard@outlook.com",
    label: "Write an email",
    Icon: Mail,
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/terry-henrard/",
    label: "Join me on LinkedIn",
    Icon: Linkedin,
    external: true,
  },
];

const legalLinks = [
  { href: "/cookies-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/cookies-policy", label: "Cookies Policy" },
];

export function Footer() {
  return (
    <footer className="py-24 container mx-auto">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="relative flex flex-col items-center gap-12 md:items-center md:justify-between lg:flex-row lg:gap-8">
          <Link href="/" aria-label="Go to homepage">
            <div className="flex items-center gap-2">
              <Handwritted className="text-3xl" />
            </div>
          </Link>
          <nav
            className="flex flex-col items-center gap-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex-row"
            aria-label="Footer navigation"
          >
            {menuItems.map(({ href, title }) => {
              if (title === "Contact Me") {
                return <ContactMeCta key={href + title} variant={"outline"} size={"lg"} asChild />;
              }

              return (
                <Button key={href + title} variant={"ghost"} size={"lg"} asChild>
                  <Link key={href + title} href={href}>
                    {title}
                  </Link>
                </Button>
              );
            })}
          </nav>
          <div className="flex justify-center gap-1" aria-label="Social media links">
            {socialLinks.map(({ href, label, Icon, external }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon-lg"
                className="rounded-4xl corner-squircle"
                asChild
                aria-label={label}
              >
                <Link
                  key={label}
                  className="transition-all duration-300 hover:scale-110"
                  aria-label={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <Icon className="size-6" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-12 text-center md:gap-6 lg:flex-row lg:text-left">
          <div className="max-w-2xs">
            <SubscribeForm />
          </div>
          <Copyright />
          <nav
            className="order-1 flex flex-col items-center gap-6 text-center md:order-2 md:flex-row md:gap-7"
            aria-label="Legal links"
          >
            {legalLinks.map(({ href, label }) => (
              <Link key={href + label} className="text-sm" href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
