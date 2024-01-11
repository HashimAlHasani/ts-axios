import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./Types";

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
            return <CryptoSummary crypto={crypto} />;
          })
        : null}
    </div>
  );
}

export default App;
