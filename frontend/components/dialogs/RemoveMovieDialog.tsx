import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import { removeMovieQuery } from "@/requests/movies";
import { removeMovie } from "@/store/slices/moviesSlice";
import { Movie } from "@/types/movies";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function RemoveMovieDialog({ movie }: { movie: Movie }) {
  const { open, setOpen, onSubmitRemove } = useDialog({
    queryFn: () => removeMovieQuery(movie.id),
    dispatchFn: removeMovie,
    successMessage: "Movie removed successfully",
  });

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
          <DialogDescription>
            Are you sure you want to remove this movie?
          </DialogDescription>
          <Button
            onClick={() => onSubmitRemove(movie.id)}
            variant="destructive"
          >
            Remove
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
