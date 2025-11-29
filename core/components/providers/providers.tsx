import { PropsWithChildren } from "react";
import NuqsAdapter from "./nuqs-adapter";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <ThemeProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </ThemeProvider>
  );
}
