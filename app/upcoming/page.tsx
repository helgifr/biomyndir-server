import { Suspense } from "react";

import { Loading } from "@/components/loading";
import { MovieCard } from "@/components/movie-card";
import { getUpcomingMovies } from "@/lib/api";

export const metadata = {
  title: "Væntanlegt",
};

export default function UpcomingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <UpcomingMoviesSection />
    </Suspense>
  );
}

async function UpcomingMoviesSection() {
  const movies = await getUpcomingMovies();
  const sorted = [...movies].sort(
    (a, b) =>
      new Date(a.premiere_is).getTime() - new Date(b.premiere_is).getTime(),
  );

  return (
    <div className="flex flex-wrap gap-6">
      {sorted.map((movie) => (
        <MovieCard key={movie.id} movie={movie} upcoming />
      ))}
    </div>
  );
}
