const MONTHS = [
  "Janúar",
  "Febrúar",
  "Mars",
  "Apríl",
  "Maí",
  "Júní",
  "Júlí",
  "Ágúst",
  "September",
  "Október",
  "Nóvember",
  "Desember",
];

export function formatIcelandicDate(date: Date): string {
  return `${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

// Joins director names with commas and 'og' before the last one.
export function listDirectors(directors: { name: string }[]): string {
  if (directors.length === 0) return "";
  if (directors.length === 1) return `Leikstjóri: ${directors[0].name}`;

  let text = `Leikstjórar: ${directors[0].name}`;
  for (let i = 1; i < directors.length; i++) {
    text +=
      i === directors.length - 1
        ? ` og ${directors[i].name}`
        : `, ${directors[i].name}`;
  }
  return text;
}
