import { NuqsAdapter as NAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";

export default function NuqsAdapter({ children }: PropsWithChildren) {
  return <NAdapter>{children}</NAdapter>;
}
