import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import { editMovieQuery } from "@/requests/movies";
import { editMovie } from "@/store/slices/moviesSlice";
import { Movie } from "@/types/movies";
import { PgRating } from "@/types/settings";
import { DialogDescription } from "@radix-ui/react-dialog";
import { MovieForm } from "../forms/MovieForm";

export default function EditMovieDialog({
  settings,
  movie,
}: {
  settings: { pg_ratings: PgRating[] };
  movie: Movie;
}) {
  const { open, setOpen, onSubmit } = useDialog({
    queryFn: (data) => editMovieQuery(data, movie.id),
    dispatchFn: editMovie,
    successMessage: "Movie saved successfully",
  });

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
          <DialogDescription>
            Edit the movie by modifying its details.
          </DialogDescription>
          <MovieForm settings={settings} onSubmit={onSubmit} movie={movie} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
