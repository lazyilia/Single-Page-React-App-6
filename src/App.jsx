import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        if (!res.ok) throw new Error("Could not fetch data");

        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);
  if (loading) return <p style={{ color: "gray" }}>Loading...</p>;
  if (error)
    return (
      <div className="error-box">
        <span>⚠️</span>
        <p>{error}</p>
      </div>
    );
  return (
    <div className="container">
      <h1 className="title">Crypto Prices</h1>
      <p className="subtitle">
        All prices shown are in <strong>USD</strong>
      </p>
      {coins.map((coin) => (
        <div className="coin" key={coin.id}>
          <img src={coin.image} alt={coin.name} width="20" />
          <span>
            {coin.name}({coin.symbol.toUpperCase()}) : {coin.current_price}
          </span>
        </div>
      ))}
    </div>
  );
}
