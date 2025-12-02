import { About } from "@/features/marketing/components/sections/about";
import { Contact } from "@/features/marketing/components/sections/contact";
import { Faq } from "@/features/marketing/components/sections/faq";
import { FeaturedProjects } from "@/features/marketing/components/sections/featured-projects";
import { Hero } from "@/features/marketing/components/sections/hero";
import Subscribe from "@/features/marketing/components/sections/subscribe";
import { Testimonial } from "@/features/marketing/components/sections/testimonial";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 lg:pt-28">
      <Hero />
      <FeaturedProjects />
      <About />
      <Testimonial />
      <Contact />
      <Subscribe />
      <Faq />
    </div>
  );
}
