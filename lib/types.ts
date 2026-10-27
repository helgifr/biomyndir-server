export type Theater = {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  website: string;
  description: string;
  googleMap: string;
};

export type ScheduleEntry = {
  time: string;
  hall: string;
  language: string;
  purchase_url: string;
};

export type TheaterShowtimes = {
  cinema: number;
  cinema_name: string;
  schedule: ScheduleEntry[];
};

export type Director = {
  name: string;
};

export type TrailerResult = {
  key: string;
};

export type TrailerGroup = {
  results: TrailerResult[];
};

export type Movie = {
  id: number;
  title: string;
  alternativeTitles: string;
  year: number;
  certificateIS: string;
  durationMinutes: number;
  poster: string;
  plot: string;
  ratings: {
    imdb: string | number;
    rotten_critics: number;
    rotten_audience: number;
  };
  ids: {
    imdb: string;
    tmdb: number;
  };
  genres: number[];
  genres_names: string[];
  fjoldi_syninga: number;
  directors_abridged: Director[];
  showtimes: TheaterShowtimes[];
  trailers: TrailerGroup[];
};

export type UpcomingMovie = {
  id: number;
  title: string;
  alternativeTitles: string;
  year: number;
  poster: string;
  plot: string;
  pg_is: string;
  premiere_is: string;
  imdb: string;
  imdb_rating: string | null;
  trailer: {
    id: number;
    description: string;
  };
};

export type MovieDetail = {
  id: number;
  title: string;
  alternativeTitles: string;
  year: number;
  poster: string;
  plot: string;
  imdb: string;
  imdb_rating: string;
  runtime: number;
  tv_show: number;
  is_icelandic: number;
  tagline: string;
  language: string;
  pg_us: string;
  pg_is: string;
  premiere_is: string;
  ratings: {
    imdb: string;
    imdb_votes: number;
    rotten_critics: number;
    rotten_audience: number;
  };
  genres: number[];
  genres_names: string[];
};

