export type PgRating = {
  id: number;
  name: string;
};

export type Settings = {
  pg_ratings: PgRating[];
};
