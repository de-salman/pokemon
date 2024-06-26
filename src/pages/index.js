import Link from "next/link";
import { usePokemonCategories } from "@/hooks/usePokemonCategories";
import styled from "styled-components";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

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

const MainSec = styled.div`
  background: #79c9fa;
  padding-top: 50px;
`;

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

const SearchDiv = styled.div`
  margin: 0px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  background-color: #fff;
  color: rgb(122, 125, 128);
  padding: 15px;
  border-radius: 20px;
  font-size: 18px;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 10px;
  font-size: 22px;
  margin-left: 10px;
  background-color: #fff;
  border-radius: 50%;
  border: none;
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

export default function Home() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = usePokemonCategories();
  const router = useRouter();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSearch = () => {
    if (search) {
      router.push(`search/${search}`);
    }
  };

  return (
    <>
      <Navbar />
      <MainSec>
        <MainDiv>
          {data.results.slice(0, -2).map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name}`}
              style={{
                textDecoration: "none",
                margin: "20px",
                borderRadius: "20px",
                background: "#fff",
              }}
            >
              <CategoryCard categoryName={category.name}>
                <img
                  src={`/category/${category.name}.webp`}
                  width={"100px"}
                  style={{ marginBottom: "10px" }}
                />
                {category.name}
              </CategoryCard>
            </Link>
          ))}
        </MainDiv>
      </MainSec>
      <BottomBg></BottomBg>
    </>
  );
}
