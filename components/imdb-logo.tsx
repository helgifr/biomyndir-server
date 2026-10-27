import Image from "next/image";

export function ImdbLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/imdb.svg"
      alt="imdb logo"
      width={64}
      height={32}
      className={className}
    />
  );
}
