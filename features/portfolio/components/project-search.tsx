"use client";

import { Badge } from "@/core/components/ui/badge";
import { Card, CardContent } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import type { Project } from "content-collections";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { parseAsArrayOf, parseAsString, throttle, useQueryState } from "nuqs";
import { useEffect, useMemo, useRef, useState } from "react";
// We don't directly import Project type here because client components can't import server-only types sometimes. Use any or infer.

export default function ProjectSearch({ projects, tags }: { projects: Project[]; tags: string[] }) {
  // Map search UI state into URL search params with `nuqs`.
  // - `q` - text query (string) with throttled URL updates and replace history to avoid polluting history entries.
  // - `tags` - array of selected tags (string[]) with push history to allow back button navigation.
  const [q, setQ] = useQueryState(
    "q",
    parseAsString.withOptions({ history: "replace", shallow: true, limitUrlUpdates: throttle(300) })
  );

  const [selectedTags, setSelectedTags] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({ history: "push", shallow: true })
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allTags = useMemo(() => tags || [], [tags]);

  const qValue = (q ?? "").toString();
  const isTagQuery = qValue.trim().startsWith("#");
  const tagQuery = isTagQuery ? qValue.trim().slice(1).toLowerCase() : qValue.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!isTagQuery) return [];
    return allTags
      .filter((t) => !(selectedTags ?? []).includes(t))
      .filter((t) => (tagQuery ? t.toLowerCase().includes(tagQuery) : true));
  }, [allTags, selectedTags, tagQuery, isTagQuery]);

  // NOTE: Not using an effect to show suggestions when `isTagQuery` becomes true
  // because syncing state from an effect can cause cascading renders. Instead we
  // update `showSuggestions` proactively in the input's onChange below when the
  // value starts with '#' so suggestions show while typing even when the input
  // already has focus.

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Reset activeIndex when suggestions change
  useEffect(() => {
    if (!showSuggestions || suggestions.length === 0) {
      if (activeIndex !== null) {
        setTimeout(() => setActiveIndex(null), 0);
      }
      return;
    }
    if (activeIndex === null || activeIndex >= suggestions.length) {
      setTimeout(() => setActiveIndex(0), 0);
    }
  }, [suggestions, showSuggestions, activeIndex]);

  // Ensure active item is scrolled into view
  useEffect(() => {
    if (activeIndex === null) return;
    const el = itemRefs.current[activeIndex];
    if (el) el.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeIndex]);

  const fuseOptions = useMemo(
    () => ({
      // Define which keys to search and give title higher weight.
      keys: [
        { name: "title", weight: 0.6 },
        { name: "description", weight: 0.3 },
        { name: "tags", weight: 0.1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      includeScore: false,
      findAllMatches: false,
      minMatchCharLength: 1,
    }),
    []
  );

  const fuse = useMemo(() => new Fuse(projects ?? [], fuseOptions), [projects, fuseOptions]);

  const filteredProjects = useMemo(() => {
    // When typing a tag (query starting with '#'), we DON'T run the full text search
    // This avoids showing 0 projects while browsing tags — instead we show all projects
    // (or filter by selectedTags only) so users can continue browsing
    if (isTagQuery) {
      return projects.filter((p) => {
        const selTags = selectedTags ?? [];
        return selTags.length === 0 || (p.tags || []).some((t: string) => selTags.includes(t));
      });
    }

    const searchQuery = (q ?? "").trim();
    const selTags = selectedTags ?? [];

    // If there's no text query, return projects (filtered by tags).
    if (!searchQuery) {
      return projects.filter((p) => {
        const inTags =
          selTags.length === 0 || (p.tags || []).some((t: string) => selTags.includes(t));
        return inTags;
      });
    }

    // For non-empty search queries, use Fuse for fuzzy search.

    const results = fuse.search(searchQuery);
    const matchedProjects = results.map((r) => r.item as Project);

    return matchedProjects.filter((p: Project) => {
      const selTags = selectedTags ?? [];
      const inTags =
        selTags.length === 0 || (p.tags || []).some((t: string) => selTags.includes(t));
      return inTags;
    });
  }, [projects, q, selectedTags, isTagQuery, fuse]);

  function addTag(tag: string) {
    const selTags = selectedTags ?? [];
    if (!selTags.includes(tag)) setSelectedTags((s) => [...(s ?? []), tag]);
    setQ(null);
    setShowSuggestions(false);
  }

  function removeTag(tag: string) {
    setSelectedTags((s) => (s ? s.filter((t) => t !== tag) : s));
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <Input
            id="project-search-input"
            type="text"
            aria-label="Search projects"
            placeholder="Search projects or type # to browse tags"
            value={q ?? ""}
            onChange={(e) => {
              const value = e.target.value || null;
              setQ(value);
              const valueStr = (value ?? "").toString();
              if (valueStr.trim().startsWith("#")) setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (isTagQuery) {
                  const exact = allTags.find((t) => t.toLowerCase() === tagQuery);
                  if (exact) addTag(exact);
                }
                // for non-tag queries we allow the default behavior — nothing special here
              }
              if (isTagQuery && showSuggestions && suggestions.length > 0) {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIndex((prev) => {
                    if (prev === null) return 0;
                    return (prev + 1) % suggestions.length;
                  });
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((prev) => {
                    if (prev === null) return suggestions.length - 1;
                    return (prev - 1 + suggestions.length) % suggestions.length;
                  });
                }
                if (e.key === "Escape") {
                  setShowSuggestions(false);
                }
                if (e.key === "Enter" && activeIndex !== null) {
                  e.preventDefault();
                  addTag(suggestions[activeIndex]);
                }
              }
            }}
            role="combobox"
            aria-controls="tag-suggestion-list"
            aria-expanded={showSuggestions}
            aria-activedescendant={activeIndex !== null ? `tag-option-${activeIndex}` : undefined}
            aria-autocomplete="list"
            className="w-full pl-10 h-12.5 pr-3 py-3 rounded-4xl corner-squircle border border-input bg-background text-foreground placeholder:text-muted-foreground"
          />

          {/* Tag suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul
              id="tag-suggestion-list"
              ref={listRef}
              role="listbox"
              className="absolute z-50 left-0 right-0 mt-2 max-h-64 overflow-auto rounded-xl bg-card/90 backdrop-blur p-2 shadow-md"
            >
              {suggestions.map((tag, index) => (
                <li
                  key={tag}
                  id={`tag-option-${index}`}
                  role="option"
                  aria-selected={activeIndex === index}
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    activeIndex === index ? "bg-muted/40" : "hover:bg-muted"
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex((prev) => (prev === index ? null : prev))}
                >
                  <button
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className="w-full text-left"
                    onClick={() => addTag(tag)}
                    aria-label={`Add tag ${tag}`}
                  >
                    #{tag}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {allTags.slice(0, 10).map((tag) => (
            <Badge
              key={tag}
              variant={(selectedTags ?? []).includes(tag) ? "default" : "outline"}
              className="px-3 py-1 text-sm cursor-pointer "
              onClick={() => ((selectedTags ?? []).includes(tag) ? removeTag(tag) : addTag(tag))}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[28rem] md:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <Link
            href={`/portfolio/${project._meta.path}`}
            key={project.title}
            className={index === 0 || index === 3 ? "md:col-span-2" : ""}
          >
            <Card className="h-full p-0 overflow-hidden relative group">
              <CardContent className="px-6 flex flex-col gap-2 pt-6 pb-4 text-left z-10 bg-card/70 backdrop-blur-sm group-hover:opacity-0 opacity-100 transition-all duration-300 group-hover:-translate-y-10">
                <h3 className="text-foreground text-lg font-semibold font-mono">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <Image
                alt={project.coverImageAlt}
                className={`h-full w-full object-cover object-center group-hover:scale-115 transition-transform duration-800 ease-in-out`}
                src={project.coverImagePath}
                fill
              />
            </Card>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No projects match your search.
        </div>
      )}
    </div>
  );
}
