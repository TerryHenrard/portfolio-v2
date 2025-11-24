import { Card, CardContent, CardFooter } from "@/core/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function BlogCard({ href, title, description, imageSrc, imageAlt }: BlogCardProps) {
  return (
    <Link className="flex w-full" href={href}>
      <Card className="group w-full flex cursor-pointer flex-col justify-between gap-6 rounded-none border-none bg-transparent p-0 shadow-none">
        <CardContent className="flex flex-col gap-3 p-0">
          <h3 className="text-base leading-normal font-semibold group-hover:underline">{title}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-normal">{description}</p>
        </CardContent>
        <CardFooter className="flex items-center p-0">
          <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl">
            <Image
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              src={imageSrc}
            />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
