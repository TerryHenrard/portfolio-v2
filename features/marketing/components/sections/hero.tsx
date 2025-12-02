import { TypographyH1, TypographyLead } from "@/core/components/ui/typography";
import Image from "next/image";
import AvailabilityPing from "../availability-ping";
import { Handwritted } from "../handwritted";

import HeroImage from "@/public/images/marketing/hero.png";
import { ContactMeCta } from "../contact-me-cta";
import { ViewProjectsCta } from "../view-projects-cta";

export function Hero() {
  return (
    <section className="border-b py-24" id="hero">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 ">
        <div className="flex-1 flex flex-col gap-6">
          <AvailabilityPing variant={"secondary"} />
          <Handwritted className="text-3xl text-muted-foreground" />
          <TypographyH1>Your go-to AI engineer for your Next projects</TypographyH1>
          <TypographyLead className="text-lg">
            Bringing your ideas to life with clean, efficient, and scalable code. Whether it's
            building web apps, optimizing performance, or solving complex technical challenges.
          </TypographyLead>
          <div className="flex flex-wrap gap-4">
            <ContactMeCta />
            <ViewProjectsCta />
          </div>
        </div>
        <div className="flex-1">
          <Image src={HeroImage} alt="Hero Image" fetchPriority="high" preload loading="eager" />
        </div>
      </div>
    </section>
  );
}
