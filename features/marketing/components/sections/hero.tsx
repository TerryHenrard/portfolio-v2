import { Button } from "@/core/components/ui/button";
import { TypographyH1, TypographyLead } from "@/core/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import AvailabilityPing from "../availability-ping";
import { Handwritted } from "../handwritted";
import { Header } from "../header";

export function Hero() {
  return (
    <div className="min-h-screen border-b">
      <Header />
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mt-12">
        <div className="flex-1 flex flex-col gap-6">
          <AvailabilityPing variant={"secondary"} />
          <Handwritted className="text-3xl text-muted-foreground" />
          <TypographyH1 className="font-medium font-mono text-5xl">
            Your go-to AI engineer for Next.js projects
          </TypographyH1>
          <TypographyLead>
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
          <Image src={"/images/hero.png"} alt="Hero Image" width={1024} height={1024} />
        </div>
      </div>
    </div>
  );
}
