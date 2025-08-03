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

export default function AddMovieDialog({
  settings,
}: {
  settings: { pg_ratings: PgRating[] };
}) {
  const [open, setOpen] = useState(false);

  function onSubmit(data: z.infer<typeof MovieFormSchema>) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL_PUBLIC}/api/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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
