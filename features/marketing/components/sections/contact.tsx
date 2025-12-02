import { Badge } from "@/core/components/ui/badge";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    label: "Call me",
    value: "+32 498 14 66 51",
    href: "tel:+32498146651",
  },
  {
    icon: Mail,
    label: "Write an email",
    value: "terry.henrard@outlook.com",
    href: "mailto:terry.henrard@outlook.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "terry-henrard",
    href: "https://www.linkedin.com/in/terry-henrard/",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "TerryHenrard",
    href: "https://github.com/TerryHenrard",
    external: true,
  },
];

export function Contact() {
  return (
    <section
      className="bg-background py-24 border-b"
      aria-labelledby="contact-heading"
      id="contact"
    >
      <div className="container mx-auto flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
        {/* Header */}
        <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-left lg:flex-1">
          <Badge className="tracking-widest">CONTACT ME</Badge>
          <TypographyH2 id="contact-heading">Let's talk!</TypographyH2>
          <TypographyLead className="text-base max-w-xl">
            Feel free to reach out! I'm here to help and will respond within 24 hours. Your
            questions matter to me!
          </TypographyLead>
        </div>

        {/* Contact Grid - Right Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex-1">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/60 transition-colors"
            >
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                <item.icon className="text-primary h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                  {item.label}
                </span>
                <span className="text-foreground text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {item.value}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
