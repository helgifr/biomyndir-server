import type { TrailerGroup } from "@/lib/types";

export function TrailerPlaylist({ trailers }: { trailers?: TrailerGroup }) {
  const results = trailers?.results ?? [];
  if (results.length === 0) return null;

  const playlist = results.map((result) => result.key).join(",");

  return (
    <div className="aspect-video w-full max-w-2xl">
      <iframe
        title="Stiklur"
        className="h-full w-full"
        src={`https://www.youtube.com/embed/?playlist=${playlist}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
