import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PgRating } from "@/types/settings";
import { useState } from "react";
import z from "zod";
import { MovieForm, MovieFormSchema } from "../forms/MovieForm";
import { useAppDispatch } from "@/store/hooks";
import { addMovie } from "@/store/slices/moviesSlice";

export default function AddMovieDialog({
  settings,
}: {
  settings: { pg_ratings: PgRating[] };
}) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof MovieFormSchema>) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/api/movies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const newMovie = await res.json();
    console.log(newMovie);
    dispatch(addMovie(newMovie));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">+ Add Movie</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Movie</DialogTitle>
          </DialogHeader>
          <MovieForm settings={settings} onSubmit={onSubmit} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
