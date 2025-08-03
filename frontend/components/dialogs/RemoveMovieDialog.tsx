import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { removeMovieQuery } from "@/requests/movies";
import { useAppDispatch } from "@/store/hooks";
import { removeMovie } from "@/store/slices/moviesSlice";
import { Movie } from "@/types/movies";
import { useState } from "react";
import { toast } from "sonner";

export default function RemoveMovieDialog({ movie }: { movie: Movie }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  async function onSubmit() {
    removeMovieQuery(movie.id);
    dispatch(removeMovie(movie.id));
    setOpen(false);
    toast.success("Movie removed successfully");
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
