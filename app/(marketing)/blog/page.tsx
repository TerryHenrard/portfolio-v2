import { TypographyH1, TypographyLead } from "@/core/components/ui/typography";
import { BlogCard } from "@/features/blog/components/blog-card";

const BLOG_POSTS = [
  {
    href: "/blog/i-built-an-app-with-gpt-in-a-day",
    title: "I built an app with GPT in a day",
    description:
      "A quick breakdown of the tools, flow, and chaos behind a one-day GPT-powered build.",
    imageSrc:
      "https://shadcndesign-dev-portfolio-template.vercel.app/blog_i-built-an-app-with-gpt-in-a-day.png",
    imageAlt: "I built an app with GPT in a day thumbnail",
  },
  {
    href: "/blog/ai-in-development",
    title: "AI in development",
    description:
      "This story delves into the early creation of an AI in a high-tech lab. As it learns, the AI questions its purpose and the motives of its creators.",
    imageSrc: "https://shadcndesign-dev-portfolio-template.vercel.app/blog_ai-in-development.png",
    imageAlt: "AI in development thumbnail",
  },
  {
    href: "/blog/frontend-vs-backend-still-a-thing",
    title: "Frontend vs backend: Still a thing?",
    description: "Thoughts on whether the old division still makes sense in 2025.",
    imageSrc:
      "https://shadcndesign-dev-portfolio-template.vercel.app/blog_frontend-vs-backend_-still-a-thing_.png",
    imageAlt: "Frontend vs backend: Still a thing? thumbnail",
  },
  {
    href: "/blog/ai-doesnt-get-sarcasm",
    title: "AI Doesn't Get Sarcasm (Yet)",
    description: "Exploring the challenges of teaching AI to understand human nuance and humor.",
    imageSrc:
      "https://shadcndesign-dev-portfolio-template.vercel.app/blog_ai-doesnt-get-sarcasm.png",
    imageAlt: "AI Doesn't Get Sarcasm (Yet) thumbnail",
  },
  {
    href: "/blog/how-i-broke-my-own-startup",
    title: "How I Broke My Own Startup",
    description: "A cautionary tale of rapid scaling, technical debt, and learning from failure.",
    imageSrc:
      "https://shadcndesign-dev-portfolio-template.vercel.app/blog_how-i-broke-my-own-startup.png",
    imageAlt: "How I Broke My Own Startup thumbnail",
  },
  {
    href: "/blog/why-ai-wont-steal-your-job",
    title: "Why AI Won't Steal Your Job",
    description: "Debunking the myths and looking at the real impact of AI on the future of work.",
    imageSrc:
      "https://shadcndesign-dev-portfolio-template.vercel.app/blog_why-ai-wont-steal-your-job.png",
    imageAlt: "Why AI Won't Steal Your Job thumbnail",
  },
];

export default function Blog() {
  return (
    <section className="container m-auto border-b py-24" id="blog">
      <div>
        <div className="flex flex-col items-start gap-10 md:gap-12">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center gap-5">
            <div className="flex items-center justify-center w-fit gap-1 [&_svg]:size-3.5 [&_svg]:shrink-0 bg-transparent text-muted-foreground font-mono uppercase text-xs tracking-[0.25em] font-normal">
              Blog
            </div>
            <TypographyH1 id="blog-section-heading">Tech thoughts</TypographyH1>
            <TypographyLead>
              Thoughts, experiments, and code snippets from a developer playing with tech, AI, and
              the weird parts of the web.
            </TypographyLead>
          </div>
          <div
            className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-y-12 lg:gap-x-6 w-full"
            role="list"
          >
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.href} {...post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
