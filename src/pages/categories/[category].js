import { useRouter } from "next/router";
import Link from "next/link";
import { usePokemonByCategory } from "@/hooks/usePokemonByCategory";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

const categoryColors = {
  normal: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #9518b8 100%)",
  fighting: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #009fe3 100%)",
  flying: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #95c11f 100%)",
  poison: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #d40d10 100%)",
  ground: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ffcc00 100%)",
  rock: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ff9900 100%)",
  bug: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ff4500 100%)",
  ghost: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #887ad1 100%)",
  steel: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #0000ff 100%)",
  fire: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ff0000 100%)",
  water: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #0000ff 100%)",
  grass: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #008000 100%)",
  electric: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ffff00 100%)",
  psychic: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ff69b4 100%)",
  ice: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #00ffff 100%)",
  dragon: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ff4500 100%)",
  dark: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #800000 100%)",
  fairy: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #ff69b4 100%)",
  unknown: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #808080 100%)",
  shadow: "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #808080 100%)",
};
const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  background: #79c9fa;
  padding-top: 50px;
`;

const Pokeidp = styled.p`
  top: 10px;
  font-size: 2.5rem;
  opacity: 0.5;
  font-weight: 700;
`;
const CategoryCard = styled.div`
  background: ${(props) =>
    categoryColors[props.categoryName] ||
    "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(168, 184, 32) 100%)"};
  padding: 2em 6em;
  width: 170px;
  border-radius: 20px;
  border: 10px solid #fff;
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: black;
  font-weight: 600;
  font-family: cursive;
  text-transform: capitalize;
`;

const BottomBg = styled.div`
  background: url("/bg-title.png");
  height: 124px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: flex-start;
  align-items: center;
  background-size: contain;
  background-position: center center;
  background-repeat: repeat-x;
`;

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { data, isLoading, error } = usePokemonByCategory(category);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Navbar />
      <MainDiv>
        {data.pokemon.map((pokemon) => (
          <Link
            href={`/pokemon/${pokemon.pokemon.name}`}
            style={{
              textDecoration: "none",
              margin: "20px",
              borderRadius: "20px",
              background: "#fff",
            }}
            key={pokemon.pokemon.name}
          >
            <CategoryCard categoryName={data.name}>
              <Pokeidp>
                #{pokemon.pokemon.url.match(/pokemon\/(\d+)\//)[1]}
              </Pokeidp>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pokemon.pokemon.url.match(/pokemon\/(\d+)\//)[1]
                }.png`}
                width={"150px"}
                style={{ marginBottom: "10px" }}
              />
              <div>{pokemon.pokemon.name}</div>
            </CategoryCard>
          </Link>
        ))}
      </MainDiv>

      <BottomBg></BottomBg>
    </div>
  );
}
