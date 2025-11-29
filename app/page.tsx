import { About } from "@/features/marketing/components/sections/about";
import { Contact } from "@/features/marketing/components/sections/contact";
import { Faq } from "@/features/marketing/components/sections/faq";
import { Hero } from "@/features/marketing/components/sections/hero";
import { Portfolio } from "@/features/marketing/components/sections/portfolio";
import Subscribe from "@/features/marketing/components/sections/subscribe";
import { Testimonial } from "@/features/marketing/components/sections/testimonial";

export default function Home() {
  return (
    <div className="container m-auto pt-17">
      <Hero />
      <Portfolio />
      <About />
      <Testimonial />
      <Contact />
      <Subscribe />
      <Faq />
    </div>
  );
}
