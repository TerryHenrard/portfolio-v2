import { Header } from "@/features/marketing/components/header";
import { Hero } from "@/features/marketing/components/sections/hero";
import { Portfolio } from "@/features/marketing/components/sections/portfolio";

export default function Home() {
  return (
    <main className="container m-auto">
      <Header />
      <Hero />
      <Portfolio />
    </main>
  );
}
