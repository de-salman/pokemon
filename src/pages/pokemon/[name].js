import Link from "next/link";
import styled from "styled-components";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
  min-height: calc(100vh - 250px);
`;

const MainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: center;
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

const Pokeidp = styled.p`
  top: 10px;
  font-size: 2.5rem;
  opacity: 0.5;
  font-weight: 700;
`;
const PokeDetails = styled.div`
  align-content: center;
  font-size: 22px;
  text-align: center;
  text-transform: capitalize;

  flex: 0 0 70%;
  & > h1 {
    font-size: 30px;
    font-family: "PokemonSolid", sans-serif;
    letter-spacing: 0.4rem;
    line-height: 1.5;
    text-align: center;
    font-size: 40px;
    font-weight: 100;
    color: #fbc418;
    text-shadow: 3px 3px 3px #3e6cbd;
    text-transform: capitalize;
    margin-bottom: 30px;
  }

  & > h2 {
  }
`;

export default function PokemonDetails() {
  const router = useRouter();
  const { name } = router.query;
  const { data, isLoading, error } = usePokemonDetails(name);

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const statsChartOptions = {
    chart: {
      type: "radar",
      foreColor: "#ffffff",
    },
    series: [
      {
        name: "Stats",
        data: data.stats.map((stat) => stat.base_stat),
      },
    ],
    labels: data.stats.map((stat) => stat.stat.name),
    xaxis: {
      categories: data.stats.map((stat) => stat.stat.name),
      labels: {
        show: true,
        style: {
          colors: ["#ffffff"],
          fontSize: "15px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
        },
      },
    },
  };

  const donutChartOptions = {
    chart: {
      type: "donut",
    },
    series: data.stats.map((stat) => stat.base_stat),
    labels: data.stats.map((stat) => stat.stat.name),
  };

  return (
    <>
      <Navbar />
      <MainSec>
        <MainDiv>
          <PokeDetails>
            <h1>{data.name}</h1>
            <h3>
              Type : {data.types.map((type) => type.type.name).join(", ")}
            </h3>
            <h3>Height : {data.height / 10}m</h3>
            <h3>Weight : {data.weight / 10}kg</h3>
            <h3>Abilities : </h3>
            {data.abilities.map((ability, index) => (
              <span key={index}>
                {ability.ability.name} {ability.is_hidden ? "(Hidden)" : ""},{" "}
              </span>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flex: "1 1 0%",
                  minWidth: "300px",
                  minHeight: "300px",
                  maxWidth: "60%",
                  maxHeight: "60%",
                  alignContent: "center",
                }}
              >
                <Chart
                  options={statsChartOptions}
                  series={statsChartOptions.series}
                  type="radar"
                />
              </div>
              <div
                style={{
                  flex: "1 1 0%",
                  minWidth: "300px",
                  minHeight: "300px",
                  maxWidth: "40%",
                  maxHeight: "40%",
                  alignContent: "center",
                }}
              >
                <Chart
                  options={donutChartOptions}
                  series={donutChartOptions.series}
                  type="donut"
                />
              </div>
            </div>
          </PokeDetails>
          <div
            style={{
              textDecoration: "none",
              margin: "20px",
              borderRadius: "20px",
              background: "#fff",
              display: "flex",
            }}
          >
            <CategoryCard categoryName={data?.types[0]?.type?.name}>
              <Pokeidp>#{data.id}</Pokeidp>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                width={"170px"}
                style={{ marginBottom: "10px" }}
              />
              {data.name}
            </CategoryCard>
          </div>
        </MainDiv>
      </MainSec>
      <BottomBg></BottomBg>
    </>
  );
}
