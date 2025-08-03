"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SelectComponent from "@/components/ui/select";
import { PgRating } from "@/types/settings";
import { Input } from "./ui/input";

export const addMovieFormSchema = z.object({
  title: z
    .string({
      error: "Please provide a title for the movie.",
    })
    .min(1, { message: "Please provide a title for the movie." }),
  description: z
    .string({
      error: "Please provide a description for the movie.",
    })
    .min(1, { message: "Please provide a description for the movie." }),
  pg_rating_id: z.string({
    error: "Please select a PG Rating.",
  }),
});

export function AddMovieForm({
  settings,
  onSubmit,
}: {
  settings: {
    pg_ratings: PgRating[];
  };
  onSubmit: (data: z.infer<typeof addMovieFormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof addMovieFormSchema>>({
    resolver: zodResolver(addMovieFormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                onChange={field.onChange}
                value={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                onChange={field.onChange}
                value={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pg_rating_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PG Rating</FormLabel>
              <SelectComponent
                defaultValue={field.value}
                options={settings.pg_ratings.map((pgRating) => ({
                  key: pgRating.id.toString(),
                  value: pgRating.name,
                }))}
                placeholder="Choose a PG Rating"
                onValueChange={field.onChange}
                isFullWidth
              />
              <FormDescription>
                PG Ratings are used to determine the age-appropriateness of a
                movie.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
