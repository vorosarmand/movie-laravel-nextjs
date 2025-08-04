"use client";

import { MoviesDataTable } from "@/components/MoviesDataTable";
import { useAppDispatch } from "@/store/hooks";
import { setMovies } from "@/store/slices/moviesSlice";
import { setSettings } from "@/store/slices/settingsSlice";
import { Movie } from "@/types/movies";
import { PgRating } from "@/types/settings";
import { useEffect } from "react";

interface MoviesProps {
  initialMovies: {
    current_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    data: Movie[];
  };
  settings: {
    pg_ratings: PgRating[];
  };
}

export default function Movies({ initialMovies, settings }: MoviesProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMovies(initialMovies));
    dispatch(setSettings(settings));
  }, [dispatch, initialMovies, settings]);

  return <MoviesDataTable />;
}
