import { url } from "inspector";
import { Crypto } from "../Types";

export type AppProps = {
  crypto: Crypto;
};

export default function CryptoSummary({ crypto }: AppProps): JSX.Element {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          style={{
            width: "2rem",
            height: "2rem",
            paddingTop: "0.5rem",
            margin: "0.125",
          }}
          src={crypto.image}
          alt={crypto.name + "logo"}
        />
        <p>{crypto.name + " $" + crypto.current_price}</p>
      </div>
    </>
  );
}
