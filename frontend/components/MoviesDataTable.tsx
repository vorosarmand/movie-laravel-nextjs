"use client";

import { useAppSelector } from "@/store/hooks";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddMovieDialog from "./dialogs/AddMovieDialog";
import { MoviesTable } from "./MoviesTable";
import { Input } from "./ui/input";
import SelectComponent from "./ui/select";

export function MoviesDataTable() {
  const settings = useAppSelector((state) => state.settings);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterValue, setFilterValue] = useState({
    title: searchParams.get("filter[title]") || "",
    pg_rating_id: searchParams.get("filter[pg_rating_id]") || "",
  });

  const applyFiltersToUrl = (newFilterValue: typeof filterValue) => {
    console.log(newFilterValue);
    const params = new URLSearchParams(searchParams);

    Object.keys(newFilterValue).forEach((key) => {
      const index = key as keyof typeof newFilterValue;
      if (newFilterValue[index] != "") {
        console.log(newFilterValue[index]);
        console.log(`filter[${index}]`, newFilterValue[index]);
        params.set(`filter[${index}]`, newFilterValue[index]);
      } else {
        params.delete(`filter[${index}]`);
      }
    });
    console.log(`?${params.toString()}`);
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilterValue = {
      ...filterValue,
      [key]: value,
    };
    setFilterValue(newFilterValue);
    debouncedApplyFilters(newFilterValue);
  };

  const debouncedApplyFilters = useRef(
    debounce(applyFiltersToUrl, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedApplyFilters.cancel();
    };
  }, [debouncedApplyFilters]);

  const pgOptions = [
    { key: "all", value: "All" },
    ...settings.pg_ratings.map((pgRating) => ({
      key: pgRating.id.toString(),
      value: pgRating.name,
    })),
  ];

  return (
    <div className="w-full">
      <div className="flex items-center p-4 gap-4">
        <Input
          placeholder="Filter title"
          value={filterValue.title}
          onChange={(event) => handleFilterChange("title", event.target.value)}
          className="max-w-sm"
        />
        <SelectComponent
          defaultValue={filterValue.pg_rating_id}
          onValueChange={(value: string) =>
            handleFilterChange("pg_rating_id", value == "all" ? "" : value)
          }
          options={pgOptions}
          placeholder="All"
        />
        <AddMovieDialog settings={settings} />
      </div>
      <div className="rounded-md border">
        <MoviesTable />
      </div>
    </div>
  );
}
