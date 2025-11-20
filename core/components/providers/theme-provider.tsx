"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PropsWithChildren } from "react";

export function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <NextThemesProvider
      attribute={"class"}
      enableSystem
      defaultTheme={"dark"}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
