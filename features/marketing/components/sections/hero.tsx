import { Button } from "@/core/components/ui/button";
import { TypographyH1, TypographyLead } from "@/core/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import AvailabilityPing from "../availability-ping";
import { Handwritted } from "../handwritted";

import HeroImage from "@/public/images/hero.png";

export function Hero() {
  return (
    <section className="border-b py-24">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 ">
        <div className="flex-1 flex flex-col gap-6">
          <AvailabilityPing variant={"secondary"} />
          <Handwritted className="text-3xl text-muted-foreground" />
          <TypographyH1>Your go-to AI engineer for Next.js projects</TypographyH1>
          <TypographyLead className="text-lg">
            Bringing your ideas to life with clean, efficient, and scalable code. Whether it's
            building web apps, optimizing performance, or solving complex technical challenges.
          </TypographyLead>
          <div className="flex gap-4">
            <Button size={"lg"} asChild>
              <Link href="/">Contact Me</Link>
            </Button>
            <Button size={"lg"} variant={"secondary"} asChild>
              <Link href="/">View Projects</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <Image src={HeroImage} alt="Hero Image" width={712} height={712} />
        </div>
      </div>
    </section>
  );
}
