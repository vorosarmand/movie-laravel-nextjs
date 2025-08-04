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
import { Settings } from "@/types/settings";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EditMovieDialog from "./dialogs/EditMovieDialog";
import RemoveMovieDialog from "./dialogs/RemoveMovieDialog";
import PaginationComponent from "./ui/pagination";

export function MoviesTable() {
  const movies = useAppSelector((state) => state.movies);
  const settings = useAppSelector((state) => state.settings);

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "pg_rating.name", header: "PG Rating" },
  ];

  const table = useReactTable<Movie>({
    data: movies.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table>
        <Header table={table} />
        <Body
          table={table}
          settings={settings}
          columnLength={columns.length}
          movies={movies}
        />
      </Table>
      <div className="w-full flex justify-center p-4">
        <PaginationComponent
          prev_page_url={movies.prev_page_url}
          next_page_url={movies.next_page_url}
          links={movies.links}
        />
      </div>
    </>
  );
}

function Header({ table }: { table: ReturnType<typeof useReactTable<Movie>> }) {
  return (
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
  );
}

function Body({
  table,
  settings,
  columnLength,
  movies,
}: {
  table: ReturnType<typeof useReactTable<Movie>>;
  settings: Settings;
  columnLength: number;
  movies: {
    prev_page_url: string | null;
    next_page_url: string | null;
    links: {
      active: boolean;
      label: string;
      url: string;
    }[];
  };
}) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        <NoResults columnLength={columnLength} />
      )}
    </TableBody>
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
