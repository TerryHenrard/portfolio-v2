import { Header } from "@/features/marketing/components/header";
import { About } from "@/features/marketing/components/sections/about";
import { Contact } from "@/features/marketing/components/sections/contact";
import { Faq } from "@/features/marketing/components/sections/faq";
import { Hero } from "@/features/marketing/components/sections/hero";
import { Portfolio } from "@/features/marketing/components/sections/portfolio";
import { Testimonial } from "@/features/marketing/components/sections/testimonial";

export default function Home() {
  return (
    <main className="container m-auto">
      <Header />
      <Hero />
      <Portfolio />
      <About />
      <Testimonial />
      <Contact />
      <Faq />
    </main>
  );
}
