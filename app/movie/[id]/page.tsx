import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ExternalLinkIcon } from "@/components/external-link-icon";
import { ImdbLogo } from "@/components/imdb-logo";
import { Loading } from "@/components/loading";
import { getMovieById } from "@/lib/api";
import {
  FALLBACK_POSTER_SRC,
  KVIKMYNDIR_MOVIE_URL,
  POSTER_PLACEHOLDER_URL,
} from "@/lib/constants";
import { formatIcelandicDate } from "@/lib/format";
import type { MovieDetail } from "@/lib/types";

async function findMovie(idParam: string): Promise<MovieDetail | null> {
  const id = Number(idParam);
  if (Number.isNaN(id)) return null;

  const movie = await getMovieById(id);

  return movie;
}

export default function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <MovieDetails params={params} />
    </Suspense>
  );
}

async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await findMovie(id);
  if (!movie) notFound();

  const { title, imdb, imdb_rating, id: movieId, plot, premiere_is } = movie;

  const poster =
    movie.poster === POSTER_PLACEHOLDER_URL
      ? FALLBACK_POSTER_SRC
      : movie.poster;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Poster comes from an external, non-allowlisted host, so it can't use next/image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt={`Mynd fyrir bíómyndina ${title}`}
          className="w-full max-w-xs self-start rounded-md shadow-md"
        />
        <div className="flex flex-col gap-3">
          {premiere_is && (
            <h2 className="text-lg font-semibold">
              {formatIcelandicDate(new Date(premiere_is))}
            </h2>
          )}
          <h1 className="text-3xl font-bold">{title}</h1>
          {imdb && (
            <div className="flex items-center gap-2">
              {imdb_rating && <p>{imdb_rating}</p>}
              <ImdbLogo className="h-6 w-auto" />
              <a
                href={`https://www.imdb.com/title/tt${imdb}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm underline"
              >
                Á imdb
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
          )}
          <p>{plot}</p>
          <a
            href={KVIKMYNDIR_MOVIE_URL(movieId)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-zinc-500 underline dark:text-zinc-400"
          >
            Heimild: Kvikmyndir.is
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
