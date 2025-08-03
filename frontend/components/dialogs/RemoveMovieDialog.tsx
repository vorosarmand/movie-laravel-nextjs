import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/store/hooks";
import { removeMovie } from "@/store/slices/moviesSlice";
import { Movie } from "@/types/movies";
import { useState } from "react";

export default function RemoveMovieDialog({ movie }: { movie: Movie }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  async function onSubmit() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/api/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(removeMovie(movie.id));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="destructive">Remove</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove movie</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to remove this movie?</p>
          <Button onClick={onSubmit} variant="destructive">
            Remove
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
