import Link from "next/link";
import { usePokemonCategories } from "@/hooks/usePokemonCategories";

export default function Home() {
  const { data, isLoading, error } = usePokemonCategories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.results.map((category) => (
        <Link href={`/categories/${category.name}`}>
          <div key={category.name}>{category.name}</div>
        </Link>
      ))}
    </div>
  );
}
