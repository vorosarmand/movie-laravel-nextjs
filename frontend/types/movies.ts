export type Movie = {
  id: number;
  title: string;
  description: string;
  pg_rating_id: number;
  pgRating: PGRating;
};

export type PGRating = {
  id: number;
  name: string;
};
