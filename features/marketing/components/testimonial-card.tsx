import { Avatar, AvatarFallback, AvatarImage } from "@/core/components/ui/avatar";
import { Card, CardContent } from "@/core/components/ui/card";

export interface TestimonialProps {
  quote: string;
  highlightedText: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

export function TestimonialCard({ quote, highlightedText, author }: TestimonialProps) {
  const parts = quote.split(highlightedText);

  return (
    <Card className="w-full bg-transparent shadow-none border-none p-0">
      <CardContent className="p-0">
        <div className="flex flex-col gap-8">
          <p className="text-foreground text-center text-lg leading-7 md:text-left font-mono">
            &ldquo;{parts[0]}
            <span className="font-medium px-1 bg-white text-black">{highlightedText}</span>
            {parts[1]}&rdquo;
          </p>
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <Avatar className="size-14">
              <AvatarImage src={author.image} alt={author.name} className="scale-130" />
              <AvatarFallback>
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 text-center md:text-left">
              <p className="text-foreground text-base leading-6 font-semibold">{author.name}</p>
              <p className="text-muted-foreground text-base leading-6">{author.role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
