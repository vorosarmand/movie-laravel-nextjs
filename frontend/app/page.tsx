import { DataTable } from "@/components/DataTable";

export default async function Home() {
  const data = await fetch("http://backend-nginx-server:80/api/movies");
  const movies = await data.json();

  return (
    <div className="font-sans">
      <div className="w-full max-w-7xl m-auto p-10">
        <h1 className="font-bold text-3xl mb-10">Movies</h1>
        <DataTable
          columns={[
            {
              accessorKey: "id",
              header: "ID",
            },
            {
              accessorKey: "title",
              header: "Title",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
            {
              accessorKey: "pg_rating.name",
              header: "PG Rating",
            },
          ]}
          data={movies}
        />
      </div>
    </div>
  );
}
