import { Suspense } from "react";

import { MovieBrowser } from "@/components/movie-browser";
import { Loading } from "@/components/loading";
import { getMovies, getTheaters } from "@/lib/api";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <MoviesSection />
    </Suspense>
  );
}

async function MoviesSection() {
  const [movies, theaters] = await Promise.all([getMovies(), getTheaters()]);
  return <MovieBrowser movies={movies} theaters={theaters} />;
}
