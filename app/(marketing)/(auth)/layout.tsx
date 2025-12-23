import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Sign In | Admin",
  description: "Sign in to access the admin dashboard",
};

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      {children}
    </main>
  );
}
