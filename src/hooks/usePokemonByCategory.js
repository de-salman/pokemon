import { useQuery } from "react-query";

const fetchPokemonByCategory = async (categoryName) => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${categoryName}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const usePokemonByCategory = (categoryName) => {
  return useQuery(["pokemonByCategory", categoryName], () =>
    fetchPokemonByCategory(categoryName)
  );
};
