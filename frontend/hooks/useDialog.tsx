import { MovieFormSchema } from "@/components/forms/MovieForm";
import { removeMovieQuery } from "@/requests/movies";
import { useAppDispatch } from "@/store/hooks";
import { removeMovie } from "@/store/slices/moviesSlice";
import { Movie } from "@/types/movies";
import { UnknownAction } from "@reduxjs/toolkit";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

export function useDialog({
  queryFn,
  dispatchFn,
  successMessage,
}: {
  queryFn: (data: z.infer<typeof MovieFormSchema>) => Promise<Response>;
  dispatchFn: (payload: Movie) => UnknownAction;
  successMessage: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  async function onSubmit(data: z.infer<typeof MovieFormSchema>) {
    const res = await queryFn(data);
    const newMovie = await res.json();
    dispatch(dispatchFn(newMovie));
    setOpen(false);
    toast.success(successMessage);
    router.push(`?${searchParams.toString()}`);
  }

  async function onSubmitRemove(id: number) {
    removeMovieQuery(id);
    dispatch(removeMovie(id));
    setOpen(false);
    toast.success("Movie removed successfully");
    router.push(`?${searchParams.toString()}`);
  }

  return {
    open,
    setOpen,
    onSubmit,
    onSubmitRemove,
  };
}
