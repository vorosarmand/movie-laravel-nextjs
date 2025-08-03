import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addMovieQuery } from "@/requests/movies";
import { useAppDispatch } from "@/store/hooks";
import { addMovie } from "@/store/slices/moviesSlice";
import { PgRating } from "@/types/settings";
import { useState } from "react";
import z from "zod";
import { MovieForm, MovieFormSchema } from "../forms/MovieForm";
import { toast } from "sonner";

export default function AddMovieDialog({
  settings,
}: {
  settings: { pg_ratings: PgRating[] };
}) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof MovieFormSchema>) {
    const res = await addMovieQuery(data);
    const newMovie = await res.json();
    dispatch(addMovie(newMovie));
    setOpen(false);
    toast.success("Movie added successfully");
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
