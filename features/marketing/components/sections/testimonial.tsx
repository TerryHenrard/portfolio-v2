import { Badge } from "@/core/components/ui/badge";
import { TypographyH2 } from "@/core/components/ui/typography";
import { TestimonialCard, type TestimonialProps } from "../testimonial-card";

const testimonials: TestimonialProps[] = [
  {
    quote:
      "Terry transformed our complex needs into cost-effective AI tools. A smooth collaboration thanks to his down-to-earth approach and responsiveness. Highly recommended for his expertise and dedication!",
    highlightedText: "cost-effective AI tools",
    author: {
      name: "Michel Villani",
      role: "Head of Engineering and R&D at Thomas & Piron",
      image: "/images/marketing/michel-villani-avatar.png",
    },
  },
  {
    quote:
      "Terry delivered a premium AI dashboard that shows to our clients real business profits at a glance. This upgrade improved our retention significantly. I highly recommend Terry for high-impact solutions.",
    highlightedText: "real business profits at a glance",
    author: {
      name: "Alain Clerckx",
      role: "Founder and CEO at VISIT ME",
      image: "/images/marketing/alain-clerckx-avatar.png",
    },
  },
];

export function Testimonial() {
  return (
    <section className="border-b py-24 flex gap-10 flex-col" id="testimonial">
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
