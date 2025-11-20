import { Separator } from "@/core/components/ui/separator";
import { Hero } from "@/features/marketing/components/sections/hero";

export default function Home() {
  return (
    <main className="container m-auto">
      <Hero />
      <Separator className="my-10" />
    </main>
  );
}
