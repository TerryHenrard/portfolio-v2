import { Badge } from "@/core/components/ui/badge";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import AboutImage from "@/public/images/about.png";
import Image from "next/image";
import { ContactMeCta } from "../contact-me-cta";
import { ViewProjectsCta } from "../view-projects-cta";

export function About() {
  return (
    <section className="border-b py-24 flex items-center justify-center gap-16" id="about">
      <Image src={AboutImage} alt="About Me Image" width={712} height={712} />

      <div className="flex flex-col items-start gap-5">
        <Badge className="tracking-widest">ABOUT</Badge>
        <TypographyH2>Developer who loves to build stuff</TypographyH2>
        <TypographyLead className="text-base">
          Hello! I'm Terry Henrard, a passionate web developer who thrives on creating innovative
          solutions that tackle complex user challenges.
        </TypographyLead>
        <TypographyLead className="text-base">
          My attention to detail allows me to enhance every interaction, ensuring it not only boosts
          productivity but also elevates user satisfaction.
        </TypographyLead>

        <div className="flex gap-4">
          <ContactMeCta />
          <ViewProjectsCta />
        </div>
      </div>
    </section>
  );
}
