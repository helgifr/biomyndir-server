import Link from "next/link";

import { ImdbLogo } from "@/components/imdb-logo";
import { FALLBACK_POSTER_SRC, POSTER_PLACEHOLDER_URL } from "@/lib/constants";
import { formatIcelandicDate } from "@/lib/format";
import type { Movie, UpcomingMovie } from "@/lib/types";

type MovieCardProps =
  | { movie: Movie; upcoming?: false }
  | { movie: UpcomingMovie; upcoming: true };

export function MovieCard(props: MovieCardProps) {
  const { movie } = props;
  const poster =
    movie.poster === POSTER_PLACEHOLDER_URL
      ? FALLBACK_POSTER_SRC
      : movie.poster;

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="flex w-50 flex-col overflow-hidden rounded-md bg-zinc-50 text-center shadow-md transition-transform hover:scale-105 hover:shadow-xl dark:bg-zinc-900"
    >
      {/* Poster comes from an external, non-allowlisted host, so it can't use next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={`Mynd fyrir bíómyndina ${movie.title}`}
        loading="lazy"
        className="w-full flex-1 object-cover content-center"
      />
      <div className="flex flex-col gap-2 p-3">
        <p className="text-base font-medium">{movie.title}</p>
        {props.upcoming ? (
          <p className="font-bold">
            {formatIcelandicDate(new Date(props.movie.premiere_is))}
          </p>
        ) : (
          <div className="gap-2 flex items-center justify-center">
            <p>{props.movie.ratings.imdb}</p>
            <ImdbLogo className="h-5 w-auto" />
          </div>
        )}
      </div>
    </Link>
  );
}
