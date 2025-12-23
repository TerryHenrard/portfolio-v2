import { Footer } from "@/features/marketing/components/footer";
import { Header } from "@/features/marketing/components/header";
import type { PropsWithChildren } from "react";

export default function MarketingLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
