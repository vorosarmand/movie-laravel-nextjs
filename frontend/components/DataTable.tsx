"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import SelectComponent from "./ui/select";
import { PgRating } from "@/types/settings";
import debounce from "lodash.debounce";
import AddMovieDialog from "./AddMovieDialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  settings: {
    pg_ratings: PgRating[];
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  settings,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterValue, setFilterValue] = useState({
    title: searchParams.get("title") || "",
    pg_rating_id: searchParams.get("pg_rating_id") || "all",
  });

  const table = useReactTable({
    data,
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
