"use client";

import { Badge } from "@/core/components/ui/badge";
import { Card, CardContent } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import type { Project } from "content-collections";
import Fuse from "fuse.js";
import { ArrowRight, Filter, Search, X as XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { parseAsArrayOf, parseAsString, throttle, useQueryState } from "nuqs";
import { useEffect, useMemo, useRef, useState } from "react";
import ContentBadges from "./content-badges";

export default function ProjectSearch({ projects, tags }: { projects: Project[]; tags: string[] }) {
  const [q, setQ] = useQueryState(
    "q",
    parseAsString.withOptions({ history: "replace", shallow: true, limitUrlUpdates: throttle(300) })
  );

  const [selectedTags, setSelectedTags] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({ history: "push", shallow: true })
  );
  // Sort order state persisted in query params for back/forward support.
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsString.withDefault("createdAt-desc").withOptions({ history: "replace", shallow: true })
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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  useEffect(() => {
    if (activeIndex === null) return;
    const el = itemRefs.current[activeIndex];
    if (el) el.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeIndex]);

  const fuseOptions = useMemo(
    () => ({
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
    if (isTagQuery) {
      return projects.filter((p) => {
        const selTags = selectedTags ?? [];
        return selTags.length === 0 || (p.tags || []).some((t: string) => selTags.includes(t));
      });
    }

    const searchQuery = (q ?? "").trim();
    const selTags = selectedTags ?? [];

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

  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    switch (sortBy) {
      case "createdAt-asc": {
        return list.sort((a, b) => {
          const av = a.createdAt;
          const bv = b.createdAt;
          if (av === bv) return 0;
          return av > bv ? 1 : -1;
        });
      }
      case "createdAt-desc": {
        return list.sort((a, b) => {
          const av = a.createdAt;
          const bv = b.createdAt;
          if (av === bv) return 0;
          return bv > av ? 1 : -1;
        });
      }
      case "updatedAt-asc": {
        return list.sort((a, b) => {
          const av = a.updatedAt;
          const bv = b.updatedAt;
          if (av === bv) return 0;
          return av > bv ? 1 : -1;
        });
      }
      case "updatedAt-desc": {
        return list.sort((a, b) => {
          const av = a.updatedAt;
          const bv = b.updatedAt;
          if (av === bv) return 0;
          return bv > av ? 1 : -1;
        });
      }
      case "readingTime-asc":
        return list.sort(
          (a, b) => (a.readingTimeMinutes ?? Infinity) - (b.readingTimeMinutes ?? Infinity)
        );
      case "readingTime-desc":
        return list.sort(
          (a, b) => (b.readingTimeMinutes ?? -Infinity) - (a.readingTimeMinutes ?? -Infinity)
        );
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return list.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return list;
    }
  }, [filteredProjects, sortBy]);

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
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3">
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
              className="flex-1 pl-10 h-12.5 pr-3 py-3 rounded-4xl corner-squircle border border-input bg-background text-foreground placeholder:text-muted-foreground"
            />

            <Select value={sortBy ?? "createdAt-desc"} onValueChange={(v) => setSortBy(v)}>
              <SelectTrigger className="p-6 rounded-4xl corner-squircle cursor-pointer ">
                <Filter size={18} className="mr-2 -ml-2 text-muted-foreground" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="rounded-4xl corner-squircle">
                <SelectGroup>
                  <SelectLabel>Sort projects</SelectLabel>
                  <SelectItem value="createdAt-desc">Created (newest)</SelectItem>
                  <SelectItem value="createdAt-asc">Created (oldest)</SelectItem>
                  <SelectItem value="updatedAt-desc">Updated (newest)</SelectItem>
                  <SelectItem value="updatedAt-asc">Updated (oldest)</SelectItem>
                  <SelectItem value="readingTime-desc">Reading time (longest)</SelectItem>
                  <SelectItem value="readingTime-asc">Reading time (shortest)</SelectItem>
                  <SelectItem value="title-asc">
                    Title (A <ArrowRight className="text-white" /> Z)
                  </SelectItem>
                  <SelectItem value="title-desc">
                    Title (Z <ArrowRight className="text-white" /> A)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

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

        {/* Selected tags (show all currently selected tags so users can remove any of them) */}
        <div className="flex gap-2 flex-wrap">
          {(selectedTags ?? []).map((tag) => (
            <Badge
              key={`selected-${tag}`}
              variant="default"
              className="px-3 py-1 text-sm flex items-center gap-2"
            >
              <span>#{tag}</span>
              <button
                type="button"
                aria-label={`Remove tag ${tag}`}
                onClick={() => removeTag(tag)}
                className="inline-flex items-center justify-center p-0.5 rounded-full hover:bg-muted/20"
              >
                <XIcon size={12} />
              </button>
            </Badge>
          ))}
        </div>

        {/* Top tags */}
        <div className="flex gap-2 flex-wrap">
          {allTags
            .slice(0, 10)
            .filter((t) => !(selectedTags ?? []).includes(t))
            .map((tag) => (
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

      <div className="mx-auto grid grid-cols-1 gap-4 md:auto-rows-[28rem] md:grid-cols-3">
        {sortedProjects.map((project, index) => (
          <Link
            href={`/portfolio/${project._meta.path}`}
            key={project.title}
            className={index === 0 || index === 3 ? "md:col-span-2" : ""}
          >
            <Card className="h-full p-0 overflow-hidden relative group">
              <CardContent className="px-6 flex flex-col gap-2 pt-6 pb-4 text-left z-10 bg-card/70 backdrop-blur-sm group-hover:opacity-0 opacity-100 transition-all duration-300 group-hover:-translate-y-10">
                <h3 className="text-foreground text-lg font-semibold font-mono flex justify-between flex-wrap">
                  {project.title}
                  <ContentBadges readingTimeMinutes={project.readingTimeMinutes} className="mb-0" />
                </h3>
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

      {sortedProjects.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No projects match your search.
        </div>
      )}
    </div>
  );
}
