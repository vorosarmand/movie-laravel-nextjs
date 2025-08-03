import Movies from "@/components/Movies";
import StoreProvider from "@/store/StoreProvider";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const queryString = Object.entries(resolvedSearchParams)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${v}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");

  const settings = await fetch(`${process.env.API_URL}/api/settings`).then(
    (res) => res.json()
  );

  const movies = await fetch(
    `${process.env.API_URL}/api/movies?${queryString}`
  ).then((res) => res.json());

  return (
    <StoreProvider>
      <div className="font-sans">
        <div className="w-full max-w-7xl m-auto p-10">
          <h1 className="font-bold text-3xl mb-10">Movies</h1>
          <Movies initialMovies={movies} settings={settings} />
        </div>
      </div>
    </StoreProvider>
  );
}
