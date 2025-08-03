import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import { addMovieQuery } from "@/requests/movies";
import { addMovie } from "@/store/slices/moviesSlice";
import { PgRating } from "@/types/settings";
import { DialogDescription } from "@radix-ui/react-dialog";
import { MovieForm } from "../forms/MovieForm";

export default function AddMovieDialog({
  settings,
}: {
  settings: { pg_ratings: PgRating[] };
}) {
  const { open, setOpen, onSubmit } = useDialog({
    queryFn: addMovieQuery,
    dispatchFn: addMovie,
    successMessage: "Movie added successfully",
  });

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
          <DialogDescription>
            Add your favorite movie by providing its details.
          </DialogDescription>
          <MovieForm settings={settings} onSubmit={onSubmit} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
