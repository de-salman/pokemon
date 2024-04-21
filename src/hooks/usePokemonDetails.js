import { useQuery } from "react-query";

const fetchPokemonDetails = async (pokemonName) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const usePokemonDetails = (pokemonName) => {
  return useQuery(
    ["pokemonDetails", pokemonName],
    () => fetchPokemonDetails(pokemonName),
    {
      retry: false,
    }
  );
};
