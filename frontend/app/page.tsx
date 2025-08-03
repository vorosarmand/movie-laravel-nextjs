import { DataTable } from "@/components/DataTable";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const settings = await fetch(`${process.env.API_URL}/api/settings`).then(
    (res) => res.json()
  );

  const resolvedSearchParams = await searchParams;
  const queryString = Object.entries(resolvedSearchParams)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");

  const movies = await fetch(
    `${process.env.API_URL}/api/movies?${queryString}`
  ).then((res) => res.json());

  return (
    <div className="font-sans">
      <div className="w-full max-w-7xl m-auto p-10">
        <h1 className="font-bold text-3xl mb-10">Movies</h1>
        <DataTable
          columns={[
            { accessorKey: "id", header: "ID" },
            { accessorKey: "title", header: "Title" },
            { accessorKey: "description", header: "Description" },
            { accessorKey: "pg_rating.name", header: "PG Rating" },
          ]}
          data={movies}
          settings={settings}
        />
      </div>
    </div>
  );
}
