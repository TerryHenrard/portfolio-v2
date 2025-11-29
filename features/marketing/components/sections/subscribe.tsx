import { Badge } from "@/core/components/ui/badge";
import { TypographyH2, TypographyLead } from "@/core/components/ui/typography";
import { SubscribeForm } from "../subscribe-form";

export function Subscribe() {
  return (
    <section
      className="py-24 border-b bg-background"
      id="subscribe"
      aria-labelledby="subscribe-heading"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto px-4">
            <Badge className="tracking-widest">SUBSCRIBE</Badge>
            <TypographyH2 id="subscribe-heading">Don't miss an update</TypographyH2>
            <TypographyLead className="text-base">
              Stay up to date with me, I share project updates and occasional tips and tricks.
              Subscribe below to get the highlights directly in your inbox.
            </TypographyLead>
          </div>

          <SubscribeForm description="" />
        </div>
      </div>
    </section>
  );
}

export default Subscribe;
