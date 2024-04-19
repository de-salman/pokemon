import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { useRouter } from "next/router";

export default function PokemonDetails() {
  const router = useRouter();
  const { name } = router.query;
  const { data, isLoading, error } = usePokemonDetails(name);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const statsChartOptions = {
    chart: {
      type: "bar",
      type: "radar",
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
    <div>
      <h1>{data.name}</h1>
      <h2>Type: {data.types.map((type) => type.type.name).join(", ")}</h2>
      <h3>Height: {data.height / 10}m</h3>
      <h3>Weight: {data.weight / 10}kg</h3>
      <h3>Abilities:</h3>
      <ul>
        {data.abilities.map((ability, index) => (
          <li key={index}>
            {ability.ability.name} {ability.is_hidden ? "(Hidden)" : ""}
          </li>
        ))}
      </ul>
      <h3>Stats:</h3>
      <Chart
        options={statsChartOptions}
        series={statsChartOptions.series}
        type="bar"
      />
      <Chart
        options={statsChartOptions}
        series={statsChartOptions.series}
        type="radar"
      />
      <Chart
        options={donutChartOptions}
        series={donutChartOptions.series}
        type="donut"
      />
    </div>
  );
}
