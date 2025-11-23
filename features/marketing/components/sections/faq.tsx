import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/components/ui/accordion";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import { ContactMeCta } from "../contact-me-cta";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What services do you offer?",
    answer:
      "I specialize in building high-quality websites and web applications using modern technologies like React, Next.js, and TypeScript. I also offer UI/UX design implementation, performance optimization, and ongoing maintenance.",
  },
  {
    question: "How do you charge for your services?",
    answer:
      "I offer both fixed-price quotes for well-defined projects and hourly rates for ongoing work or consultation. We can discuss which model works best for your specific needs during our initial call.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "Timelines vary depending on the project's scope and complexity. A simple landing page might take 1 week, while a full-featured web application could take 4-8 weeks or more. I'll provide a detailed timeline estimate with my proposal.",
  },
  {
    question: "Do you provide support after the project is launched?",
    answer:
      "Yes, I offer post-launch support packages to ensure your website runs smoothly. This includes bug fixes, security updates, and minor content changes. We can tailor a maintenance plan that suits your requirements.",
  },
  {
    question: "Can you help improve my existing website?",
    answer:
      "Absolutely! I can audit your current site for performance, accessibility, and user experience issues, and then implement improvements or add new features as needed.",
  },
  {
    question: "What do I need to provide to get started?",
    answer:
      "To get started, I'll need a clear understanding of your goals, any design assets you have (logos, branding guidelines), and the content you want on the site. If you don't have these yet, I can guide you through the process.",
  },
];

export function Faq() {
  const midpoint = Math.ceil(FAQS.length / 2);
  const leftFaqs = FAQS.slice(0, midpoint);
  const rightFaqs = FAQS.slice(midpoint);

  return (
    <section className="py-24 border-b" id="faq">
      <div className="container mx-auto">
        <div className="flex w-full flex-col gap-12 md:gap-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex max-w-xl flex-col items-center text-center md:items-start md:text-left gap-4">
              <TypographyH2>Frequently asked questions</TypographyH2>
              <TypographyLead className="text-base">
                I've gathered the key information to help you make the most of your experience. If
                you can't find what you need, feel free to reach out to me.
              </TypographyLead>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <ContactMeCta asChild size={"lg"} />
            </div>
          </div>

          <div className="w-full">
            <Accordion
              type="single"
              collapsible
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"
            >
              <div className="flex flex-col gap-4">
                {leftFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                    <AccordionTrigger className="text-left text-base font-semibold font-mono cursor-pointer">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                {rightFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + midpoint}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold font-mono">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
