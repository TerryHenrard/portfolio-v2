import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: Readonly<PropsWithChildren>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
