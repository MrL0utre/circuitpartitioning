"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchEntries } from "../data/site";

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !isEditable(event.target)) {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchEntries;
    return searchEntries.filter((entry) =>
      [entry.title, entry.description, entry.section, ...entry.terms]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <>
      <button
        className="search-trigger"
        type="button"
        onClick={() => setOpen(true)}
        aria-keyshortcuts="/"
      >
        <span aria-hidden="true">⌕</span> Search <kbd>/</kbd>
      </button>
      {open ? (
        <div
          className="search-backdrop"
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <section
            className="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="search-dialog-header">
              <div>
                <span className="eyebrow">Site index</span>
                <h2 id="search-title">Search the foundation</h2>
              </div>
              <button
                className="close-button"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
              >
                ×
              </button>
            </div>
            <label className="search-field">
              <span className="sr-only">Search terms</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “critical path”, “FM”, or “dataset”"
              />
            </label>
            <p className="search-count" aria-live="polite">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
            <ul className="search-results">
              {results.map((entry) => (
                <li key={entry.href}>
                  <Link href={entry.href} onClick={() => setOpen(false)}>
                    <span>{entry.section}</span>
                    <strong>{entry.title}</strong>
                    <p>{entry.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
            {results.length === 0 ? (
              <p className="empty-state">
                No indexed page matches yet. Try a broader scientific term.
              </p>
            ) : null}
          </section>
        </div>
      ) : null}
    </>
  );
}

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}
