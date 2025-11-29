import { TypographyH1 } from "@/core/components/ui/typography";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;

  return (
    <section className="container m-auto border-b py-24" id={`blog-post-${slug}`}>
      <TypographyH1 className="text-center py-16 md:py-50">Coming soon...</TypographyH1>
    </section>
  );
}
