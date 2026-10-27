import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <nav className="flex items-center gap-6 border-b border-black/10 px-6 py-4 dark:border-white/15">
      <Link href="/" aria-label="Forsíða">
        <Image src="/Home.png" alt="" width={32} height={32} priority />
      </Link>
      <Link
        href="/upcoming"
        className="font-medium text-zinc-700 hover:underline dark:text-zinc-200"
      >
        Væntanlegt
      </Link>
    </nav>
  );
}
