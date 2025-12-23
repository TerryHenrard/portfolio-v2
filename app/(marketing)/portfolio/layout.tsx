import { PropsWithChildren } from "react";

export default function MdxLayout({ children }: PropsWithChildren) {
  return <section className="container m-auto border-b py-24 px-4">{children}</section>;
}
