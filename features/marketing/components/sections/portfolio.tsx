import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Badge } from "@/core/components/ui/badge";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import Link from "next/link";
import { ComponentProps } from "react";

const items: (ComponentProps<typeof BentoGridItem> & { href: string })[] = [
  {
    title: "Thomas & Piron - AI Agent",
    description:
      "Dive into the implementation of an AI agent for the customer services department of Thomas & Piron.",
    imageSrc: "/images/thomas-piron-project.webp",
    imageAlt: "Thomas & Piron workers collaborating on site",
    imageWidth: 1016,
    imageHeight: 446,
    href: "/",
  },
  {
    title: "AI Powered Portfolio",
    description: "Discover how I implemented a knowledge based AI assistant for my portfolio.",
    imageSrc: "/images/ai-powered-portfolio-project.png",
    imageAlt: "AI Portfolio Project Screenshot",
    imageWidth: 846,
    imageHeight: 286,
    href: "/",
  },
  {
    title: "Website + Booking System",
    description:
      "Explore the development of a website and booking system for a local car cleaning company.",
    imageSrc: "/images/car-wash-from-home-website-project.png",
    imageAlt: "Booking System Project Screenshot",
    imageWidth: 846,
    imageHeight: 286,
    href: "/",
  },
  {
    title: "AI Powered SaaS Dashboard",
    description:
      "Experience the development of an AI-powered dashboard for a B2B SaaS application.",
    imageSrc: "/images/dashboard-saas-home-page-project.png",
    imageAlt: "AI Powered B2B SaaS Dashboard Screenshots",
    secondImageSrc: "/images/dashboard-saas-statistics-page-project.png",
    secondImageAlt: "AI Powered B2B SaaS Dashboard Analytics Screenshot",
    imageWidth: 1016,
    imageHeight: 446,
    href: "/",
  },
];

export function Portfolio() {
  return (
    <section className="py-24 border-b text-center flex flex-col gap-9.5">
      <div className="max-w-xl m-auto flex flex-col gap-5">
        <Badge className="m-auto tracking-widest">PORTFOLIO</Badge>
        <TypographyH2>Discover what I've created</TypographyH2>
        <TypographyLead className="text-base">
          Each piece reflects my passion for innovation and commitment to delivering high-quality
          results. Feel free to explore and get inspired!
        </TypographyLead>
      </div>
      <BentoGrid className="mx-auto max-w-none">
        {items.map((item, i) => (
          <Link
            href={item.href}
            key={item.title}
            className={i === 0 || i === 3 ? "md:col-span-2" : ""}
          >
            <BentoGridItem
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              imageWidth={item.imageWidth}
              imageHeight={item.imageHeight}
              secondImageSrc={item.secondImageSrc}
              secondImageAlt={item.secondImageAlt}
            />
          </Link>
        ))}
      </BentoGrid>
    </section>
  );
}
