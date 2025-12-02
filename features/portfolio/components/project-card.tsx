"use client";

import type { Project } from "content-collections";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/core/components/ui/card";
import { cn } from "@/core/lib/utils";
import ContentBadges from "./content-badges";

type ProjectCardProps = Pick<
  Project,
  "title" | "description" | "coverImagePath" | "coverImageAlt" | "readingTimeMinutes" | "_meta"
> & {
  className?: string;
};

export function ProjectCard({
  title,
  description,
  coverImagePath,
  coverImageAlt,
  readingTimeMinutes,
  _meta,
  className,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef({ clientX: 0, clientY: 0 });

  const updateBubblePosition = useCallback(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setBubblePosition({
      x: mousePositionRef.current.clientX - rect.left,
      y: mousePositionRef.current.clientY - rect.top,
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePositionRef.current = { clientX: e.clientX, clientY: e.clientY };
    updateBubblePosition();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePositionRef.current = { clientX: e.clientX, clientY: e.clientY };
    updateBubblePosition();
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsPressed(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent drag behavior that interferes with mouse tracking
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    if (!isHovering) return;

    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const { clientX, clientY } = mousePositionRef.current;

      // Check if mouse is still inside the card bounds after scroll
      const isInsideCard =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInsideCard) {
        updateBubblePosition();
      } else {
        // Mouse is outside the card after scroll, hide the bubble
        setIsHovering(false);
        setIsPressed(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHovering, updateBubblePosition]);

  const getBubbleScale = () => {
    if (!isHovering) return 0;
    if (isPressed) return 0.7;
    return 1;
  };

  return (
    <Link
      href={`/portfolio/${_meta.path}`}
      className={cn("block relative", className)}
      target="_blank"
      style={{ cursor: isHovering ? "none" : "auto" }}
    >
      {/* Growing bubble effect - outside Card to avoid overflow-hidden clipping */}
      <div
        className={cn(
          "pointer-events-none absolute z-30 rounded-full bg-primary/20 backdrop-blur-sm"
        )}
        style={{
          left: bubblePosition.x,
          top: bubblePosition.y,
          width: 120,
          height: 120,
          transform: `translate(-50%, -50%) scale(${getBubbleScale()})`,
          transition: isHovering
            ? "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
            : "transform 0.3s ease-out",
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          View
        </span>
      </div>

      <Card
        ref={cardRef}
        className="h-full p-0 overflow-hidden relative group"
        style={{ cursor: isHovering ? "none" : "auto" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <CardContent className="px-6 flex flex-col gap-2 pt-6 pb-4 text-left z-10 bg-card/70 backdrop-blur-sm group-hover:opacity-0 opacity-100 transition-all duration-300 group-hover:-translate-y-10">
          <h3 className="text-foreground text-lg font-semibold font-mono flex justify-between flex-wrap">
            {title}
            <ContentBadges readingTimeMinutes={readingTimeMinutes} className="mb-0" />
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <Image
          alt={coverImageAlt}
          className="h-full w-full object-cover object-center group-hover:scale-115 transition-transform duration-800 ease-in-out"
          src={coverImagePath}
          fill
        />
      </Card>
    </Link>
  );
}
