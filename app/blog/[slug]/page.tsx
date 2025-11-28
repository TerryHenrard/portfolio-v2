interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;

  return (
    <section className="container m-auto border-b py-24" id={`blog-post-${slug}`}>
      Coming soon...
    </section>
  );
}
