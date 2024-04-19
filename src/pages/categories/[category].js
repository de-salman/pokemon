import { useRouter } from "next/router";
import Link from "next/link";
import { usePokemonByCategory } from "@/hooks/usePokemonByCategory";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { data, isLoading, error } = usePokemonByCategory(category);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Pokémon in the {category} category</h1>
      {data.pokemon.map((pokemon) => (
        <>
          <Link href={`/pokemon/${pokemon.pokemon.name}`}>
            <div key={pokemon.pokemon.name}>{pokemon.pokemon.name}</div>
          </Link>
        </>
      ))}
    </div>
  );
}
