"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setMovies } from "@/store/slices/moviesSlice";
import { DataTable } from "@/components/DataTable";
import { Movie } from "@/types/movies";
import { PgRating } from "@/types/settings";
import { setSettings } from "@/store/slices/settingsSlice";

interface MoviesProps {
  initialMovies: Movie[];
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

  return <DataTable />;
}
