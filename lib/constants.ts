// Placeholder poster URL returned by the upstream API when a movie has no poster yet.
export const POSTER_PLACEHOLDER_URL = "https://kvikmyndir.is/images/poster/";
export const FALLBACK_POSTER_SRC = "/noPoster.png";

// Attribution for the upstream data source, per their terms of use.
export const KVIKMYNDIR_SITE_URL = "https://kvikmyndir.is";
export const KVIKMYNDIR_MOVIE_URL = (id: number) =>
  `https://kvikmyndir.is/mynd/?id=${id}`;
