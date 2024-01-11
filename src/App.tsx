import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./Types";

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();

  useEffect(() => {
    const url = "https://api.coincap.io/v2/assets";
    axios.get(url).then((response) => {
      setCryptos(response.data.data);
    });
  }, []);

  return (
    <>
      <div className="App">
        <select
          onChange={(e) => {
            const c = cryptos?.find((x) => x.id === e.target.value);
            setSelected(c);
          }}
        >
          <option selected disabled>
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
      </div>
      {selected ? <CryptoSummary crypto={selected} /> : null}
    </>
  );
}

export default App;
