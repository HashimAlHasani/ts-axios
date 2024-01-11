import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./Types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();

  const [range, setRange] = useState<string>("30");

  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
    axios.get(url).then((response) => {
      setCryptos(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${range}&interval=daily`
        )
        .then((response) => {
          setData({
            labels: response.data.prices.map((price: number[]) => {
              return moment.unix(price[0] / 1000).format("MM-DD-YYYY");
            }),
            datasets: [
              {
                label: selected?.id.toUpperCase(),
                data: response.data.prices.map((price: number[]) => {
                  return price[1];
                }),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          });
          setOptions({
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text:
                  `${selected.name} Price Over Last ` +
                  range +
                  ` Day` +
                  (range === "1" ? "" : "s"),
              },
            },
          });
        });
    }
  }, [selected, range]);

  return (
    <>
      <div className="App">
        <select
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value);
            setSelected(c);
          }}
          defaultValue={"default"}
        >
          <option value="default" disabled>
            Choose a Crypto Currency
          </option>
          {cryptos
            ? cryptos.map((crypto) => {
                return (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </option>
                );
              })
            : null}
        </select>
        <select
          onChange={(e) => {
            setRange(e.target.value);
          }}
        >
          <option value="30">30 Days</option>
          <option value="7">7 Days</option>
          <option value="1">1 Day</option>
        </select>
      </div>
      {selected ? <CryptoSummary crypto={selected} /> : null}
      {data ? (
        <div style={{ width: 600 }}>
          <Line options={options} data={data} />
        </div>
      ) : null}
    </>
  );
}

export default App;
