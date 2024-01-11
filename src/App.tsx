import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

export type Crypto = {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  symbol: string;
  volumeUsd24Hr: string;
};

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>();

  useEffect(() => {
    const url = "https://api.coincap.io/v2/assets";
    axios.get(url).then((response) => {
      setCryptos(response.data.data);
    });
  }, []);

  return (
    <div className="App">
      {cryptos
        ? cryptos.map((crypto) => {
            return <p>{crypto.name + " $" + +crypto.priceUsd}</p>;
          })
        : null}
    </div>
  );
}

export default App;
