import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { editMovieQuery } from "@/requests/movies";
import { useAppDispatch } from "@/store/hooks";
import { editMovie } from "@/store/slices/moviesSlice";
import { Movie } from "@/types/movies";
import { PgRating } from "@/types/settings";
import { useState } from "react";
import z from "zod";
import { MovieForm, MovieFormSchema } from "../forms/MovieForm";

export default function EditMovieDialog({
  settings,
  movie,
}: {
  settings: { pg_ratings: PgRating[] };
  movie: Movie;
}) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof MovieFormSchema>) {
    const res = await editMovieQuery(data, movie.id);
    const updatedMovie = await res.json();
    dispatch(editMovie(updatedMovie));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Movie</DialogTitle>
          </DialogHeader>
          <MovieForm settings={settings} onSubmit={onSubmit} movie={movie} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
