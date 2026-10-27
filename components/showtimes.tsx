import type { TheaterShowtimes } from "@/lib/types";

export function Showtimes({ showtimes }: { showtimes: TheaterShowtimes[] }) {
  if (showtimes.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {showtimes.map((theater) => (
        <section key={theater.cinema}>
          <h2 className="text-lg font-semibold">{theater.cinema_name}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {theater.schedule.map((schedule, index) => (
              <a
                key={`${theater.cinema}-${index}`}
                href={schedule.purchase_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                {schedule.time}
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

