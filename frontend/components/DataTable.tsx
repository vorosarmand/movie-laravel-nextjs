"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/store/hooks";
import { Movie } from "@/types/movies";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddMovieDialog from "./dialogs/AddMovieDialog";
import EditMovieDialog from "./dialogs/EditMovieDialog";
import RemoveMovieDialog from "./dialogs/RemoveMovieDialog";
import { Input } from "./ui/input";
import SelectComponent from "./ui/select";

export function DataTable() {
  const movies = useAppSelector((state) => state.movies);
  const settings = useAppSelector((state) => state.settings);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterValue, setFilterValue] = useState({
    title: searchParams.get("title") || "",
    pg_rating_id: searchParams.get("pg_rating_id") || "all",
  });

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "pg_rating.name", header: "PG Rating" },
  ];

  const table = useReactTable({
    data: movies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const applyFiltersToUrl = (newFilterValue: typeof filterValue) => {
    const params = new URLSearchParams(searchParams);

    Object.keys(newFilterValue).forEach((key) => {
      const index = key as keyof typeof newFilterValue;
      if (newFilterValue[index] != "" && newFilterValue.pg_rating_id != "all") {
        params.set(`filter[${index}]`, newFilterValue[index]);
      } else {
        params.delete(`filter[${index}]`);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilterValue((prev) => {
      const newFilterValue = {
        ...prev,
        [key]: value,
      };
      debouncedApplyFilters(newFilterValue);
      return newFilterValue;
    });
  };

  const debouncedApplyFilters = useRef(
    debounce(applyFiltersToUrl, 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedApplyFilters.cancel();
    };
  }, [debouncedApplyFilters]);

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
            handleFilterChange("pg_rating_id", value)
          }
          options={[
            { key: "all", value: "All" },
            ...settings.pg_ratings.map((pgRating) => ({
              key: pgRating.id.toString(),
              value: pgRating.name,
            })),
          ]}
          placeholder="All"
        />
        <AddMovieDialog settings={settings} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="flex gap-2">
                    <EditMovieDialog
                      settings={settings}
                      movie={row.original as Movie}
                    />
                    <RemoveMovieDialog movie={row.original as Movie} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <NoResults columnLength={columns.length} />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function NoResults({ columnLength }: { columnLength: number }) {
  return (
    <TableRow>
      <TableCell colSpan={columnLength} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
}
