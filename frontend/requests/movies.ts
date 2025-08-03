import { MovieFormSchema } from "@/components/forms/MovieForm";
import z from "zod";

export const getMoviesWithFiltersQuery = (queryString: string) => {
  return fetch(`${process.env.API_URL}/api/movies?${queryString}`);
};

export const addMovieQuery = (data: z.infer<typeof MovieFormSchema>) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/api/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const editMovieQuery = (
  data: z.infer<typeof MovieFormSchema>,
  id: number
) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/api/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const removeMovieQuery = (id: number) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/api/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
