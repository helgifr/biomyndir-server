import { cacheLife } from "next/cache";

import type { Movie, MovieDetail, Theater, UpcomingMovie } from "./types";

// Falls back to the original public values so the app keeps working out of the box.
// The token is not a real secret; override both via env vars for your own deployment.
const BASE_URL = process.env.MOVIE_API_URL ?? "https://kvikmyndir.is/api/v2";
const API_TOKEN = process.env.MOVIE_API_TOKEN ?? "Kappa";

// Keyed by path; lets us send If-None-Match so unchanged data costs a cheap 304
// instead of a full fetch against the X-RateLimit-* budget.
const etagCache = new Map<string, { etag: string; data: unknown }>();

function warnIfRateLimitLow(headers: Headers) {
  const remaining = headers.get("x-ratelimit-remaining");
  const limit = headers.get("x-ratelimit-limit");
  if (
    remaining !== null &&
    limit !== null &&
    Number(remaining) <= Number(limit) * 0.1
  ) {
    console.warn(
      `Movie API rate limit running low: ${remaining}/${limit} remaining`,
    );
  }
}

async function fetchApi<T>(path: string): Promise<T> {
  const cached = etagCache.get(path);

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      ...(cached ? { "if-none-match": cached.etag } : {}),
    },
  });

  warnIfRateLimitLow(response.headers);

  if (response.status === 304 && cached) {
    return cached.data as T;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path} (${response.status})`);
  }

  const body = (await response.json()) as { data: T };

  const etag = response.headers.get("etag");
  if (etag) {
    etagCache.set(path, { etag, data: body.data });
  }

  return body.data;
}

export async function getMovies(): Promise<Movie[]> {
  "use cache";
  cacheLife("hours");

  return fetchApi<Movie[]>("/showtimes");
}

export async function getUpcomingMovies(): Promise<UpcomingMovie[]> {
  "use cache";
  cacheLife("hours");

  return fetchApi<UpcomingMovie[]>("/upcoming");
}

export async function getTheaters(): Promise<Theater[]> {
  "use cache";
  cacheLife("hours");

  return fetchApi<Theater[]>("/theaters");
}

export async function getMovieById(id: number): Promise<MovieDetail> {
  "use cache";
  cacheLife("hours");

  return fetchApi<MovieDetail>(`/movies/${id}`);
}
