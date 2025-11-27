"use client";

import { cn } from "@/core/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { XIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface ImageLightboxProps extends Omit<ImageProps, "onClick"> {
  className?: string;
}

export function ImageLightbox({ src, alt, className, ...props }: ImageLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "group overflow-hidden not-prose my-8 rounded-4xl corner-squircle block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            className
          )}
          aria-label={`View ${alt || "image"} in fullscreen`}
        >
          <Image
            src={src}
            alt={alt || ""}
            sizes="100vw"
            className={cn(
              "w-full h-auto corner-squircle rounded-4xl group-hover:scale-115 transition-transform duration-800 ease-in-out",
              "pointer-events-none",
              className
            )}
            {...props}
          />
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          aria-describedby={undefined}
          onClick={(e) => {
            // Close when clicking outside the image (on the backdrop area)
            if (e.target === e.currentTarget) {
              (e.currentTarget as HTMLElement)
                .closest("[data-state]")
                ?.querySelector<HTMLButtonElement>("[data-slot='dialog-close']")
                ?.click();
            }
          }}
        >
          <DialogTitle asChild>
            <VisuallyHidden.Root>{alt || "Image preview"}</VisuallyHidden.Root>
          </DialogTitle>
          <DialogClose asChild>
            <div
              className="relative w-full h-full max-w-[80vw] max-h-[80vh] flex items-center justify-center cursor-zoom-out"
              role="button"
              tabIndex={0}
              aria-label="Close fullscreen image"
            >
              <Image
                src={src}
                alt={alt || ""}
                sizes="80vw"
                className="object-contain w-auto h-auto max-w-full max-h-[80vh] rounded-4xl corner-squircle pointer-events-none"
                {...props}
              />
            </div>
          </DialogClose>
          <DialogClose className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 text-foreground opacity-80 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer">
            <XIcon className="size-6" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
