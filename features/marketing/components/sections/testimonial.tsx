import { Badge } from "@/core/components/ui/badge";
import { TypographyH2 } from "@/core/components/ui/typography";
import { TestimonialCard, type TestimonialProps } from "../../testimonial-card";

const testimonials: TestimonialProps[] = [
  {
    quote:
      "Alicia Smith is an outstanding developer. She understood our needs right away and delivered a website that exceeded expectations. Great communication, attention to detail, and top-notch skills. Highly recommended!",
    highlightedText: "outstanding developer",
    author: {
      name: "Peter Norris",
      role: "Founder at Acme Inc.",
      image:
        "https://shadcndesign-dev-portfolio-template.vercel.app/home_team-section_peter_norris.png",
    },
  },
  {
    quote:
      "Alicia Smith is a fantastic developer. She understood our needs and delivered a website that exceeded our expectations. Her communication and attention to detail are outstanding. I highly recommend her!",
    highlightedText: "exceeded our expectations",
    author: {
      name: "Ann Helfer",
      role: "Founder at Design Stars",
      image:
        "https://shadcndesign-dev-portfolio-template.vercel.app/home_team-section_ann_helfer.png",
    },
  },
];

export function Testimonial() {
  return (
    <section className="border-b py-24 flex gap-10 flex-col">
      <div className="flex flex-col gap-5">
        <Badge className="tracking-widest">TESTIMONIAL</Badge>
        <TypographyH2>What my clients say</TypographyH2>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author.name} {...testimonial} />
        ))}
      </div>
    </section>
  );
}
