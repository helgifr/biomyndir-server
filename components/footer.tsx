import { cacheLife } from "next/cache";

import { KVIKMYNDIR_SITE_URL } from "@/lib/constants";

// Cached so the non-deterministic Date() read doesn't block static prerendering.
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCurrentYear();
  return (
    <footer className="border-t border-black/10 py-6 text-center text-sm text-zinc-500 dark:border-white/15 dark:text-zinc-400">
      <p>&copy; {year} - Bíómyndir landsins</p>
      <p>
        Kvikmyndaupplýsingar frá{" "}
        <a
          href={KVIKMYNDIR_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Kvikmyndir.is
        </a>
      </p>
    </footer>
  );
}
