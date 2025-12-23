import { About } from "@/features/marketing/components/sections/about";
import { Contact } from "@/features/marketing/components/sections/contact";
import { Faq } from "@/features/marketing/components/sections/faq";
import { FeaturedProjects } from "@/features/marketing/components/sections/featured-projects";
import { Hero } from "@/features/marketing/components/sections/hero";
import Subscribe from "@/features/marketing/components/sections/subscribe";
import { Testimonial } from "@/features/marketing/components/sections/testimonial";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "AI Engineer & Full-Stack Developer specialized in building intelligent web applications with AI, Next.js, React, and TypeScript. View my portfolio and get in touch.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 lg:pt-28">
      <Hero />
      <FeaturedProjects />
      <About />
      <Testimonial />
      <Contact />
      <Subscribe />
      <Faq />
    </main>
  );
}
