import { Badge } from "@/core/components/ui/badge";
import { Card, CardContent } from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import { Linkedin, Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <section
      className="bg-background py-24 border-b"
      aria-labelledby="contact-heading"
      id="contact"
    >
      <div className="container mx-auto flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex flex-1 flex-col items-center md:items-start gap-5 text-center md:text-left">
          <Badge className="tracking-widest">CONTACT ME</Badge>
          <TypographyH2 id="contact-heading">Let's talk!</TypographyH2>
          <TypographyLead className="text-base">
            Feel free to reach out! I'm here to help and will respond within 24 hours. Your
            questions matter to me!
          </TypographyLead>
        </div>

        <Separator className="block md:hidden" />

        <Card className="w-full md:bg-muted/40 flex-1 md:p-6 gap-6 md:gap-8 corner-squircle rounded-4xl">
          <CardContent>
            <div className="flex flex-col gap-8">
              <a
                href="tel:+32498146651"
                className="flex cursor-pointer flex-col items-center gap-5 md:flex-row md:items-start"
              >
                <Phone className="text-primary h-6 w-6" />
                <div className="flex flex-col gap-2 text-center md:text-left">
                  <h3 className="text-card-foreground text-base leading-6 font-semibold font-mono">
                    Call me
                  </h3>
                  <span className="text-muted-foreground text-base underline decoration-1 underline-offset-6 hover:text-primary">
                    +32 498 14 66 51
                  </span>
                </div>
              </a>

              <a
                href="mailto:terry.henrard@outlook.com"
                className="flex cursor-pointer flex-col items-center gap-5 md:flex-row md:items-start"
              >
                <Mail className="text-primary h-6 w-6" />
                <div className="flex flex-col gap-2 text-center md:text-left">
                  <h3 className="text-card-foreground text-base leading-6 font-semibold font-mono">
                    Write an email
                  </h3>
                  <span className="text-muted-foreground text-base underline decoration-1 underline-offset-6 hover:text-primary">
                    terry.henrard@outlook.com
                  </span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/terry-henrard/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer flex-col items-center gap-5 md:flex-row md:items-start"
              >
                <Linkedin className="text-primary h-6 w-6" />
                <div className="flex flex-col gap-2 text-center md:text-left">
                  <h3 className="text-card-foreground text-base leading-6 font-semibold font-mono">
                    Join me on LinkedIn
                  </h3>
                  <span className="text-muted-foreground text-base underline decoration-1 underline-offset-6 hover:text-primary">
                    https://www.linkedin.com/in/terry-henrard/
                  </span>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
