import type { PropsWithChildren } from "react";

export default function AdminLayout({ children }: Readonly<PropsWithChildren>) {
  return <div className="min-h-screen">{children}</div>;
}
