"use client";

import { useMemo, useSyncExternalStore } from "react";

import { MovieCard } from "@/components/movie-card";
import type { Movie, Theater } from "@/lib/types";

const STORAGE_KEY = "biomyndir:disabled-cinemas";
const CHANGE_EVENT = "biomyndir:disabled-cinemas-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

// Returning the raw string (rather than a parsed Set) keeps the snapshot a stable
// primitive, which useSyncExternalStore requires to avoid re-render loops.
function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

function persist(disabledCinemas: Set<number>) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...disabledCinemas]),
  );
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function MovieBrowser({
  movies,
  theaters,
}: {
  movies: Movie[];
  theaters: readonly Theater[];
}) {
  const storedRaw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const disabledCinemas = useMemo(() => {
    if (!storedRaw) return new Set<number>();
    try {
      return new Set(JSON.parse(storedRaw) as number[]);
    } catch {
      return new Set<number>();
    }
  }, [storedRaw]);

  function toggleCinema(cinema: number) {
    const next = new Set(disabledCinemas);
    if (next.has(cinema)) {
      next.delete(cinema);
    } else {
      next.add(cinema);
    }
    persist(next);
  }

  const visibleMovies = useMemo(() => {
    const activeCinemas = theaters.filter(
      (cinema) => !disabledCinemas.has(cinema.id),
    );
    return movies.filter((movie) =>
      movie.showtimes.some((showtime) =>
        activeCinemas.some((cinema) => cinema.id === showtime.cinema),
      ),
    );
  }, [movies, theaters, disabledCinemas]);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold">Bíóhús</h2>
        <div className="flex flex-wrap gap-2">
          {theaters.map((cinema) => {
            const pushed = disabledCinemas.has(cinema.id);
            return (
              <button
                key={cinema.id}
                type="button"
                aria-pressed={pushed}
                onClick={() => toggleCinema(cinema.id)}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  pushed
                    ? "border-zinc-300 bg-zinc-100 text-zinc-400 line-through dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                    : "border-zinc-800 bg-zinc-800 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900"
                }`}
              >
                {cinema.name}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => persist(new Set(theaters.map((cinema) => cinema.id)))}
          className="mt-3 cursor-pointer text-sm font-medium text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          Afvelja allt
        </button>
      </section>
      <section className="flex flex-wrap gap-6">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
}
