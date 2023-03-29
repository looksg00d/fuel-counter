import { useEffect, useState } from "react";
import { Wallet } from "fuels";
import "./App.css";
import { MyCounterProjectAbi__factory } from "./contracts";

const CONTRACT_ID =
  "fuel12tjustp6j9y96at3yt78r6prq5w38hz3lu3x9lyl7ss0x0q6k0rsvclm9c";

const WALLET_SECRET =
  "0x815e1d7793be091252ce73d8e60b55d4ccf8c6615676c76ae7a68488bb275f36";

const wallet = Wallet.fromPrivateKey(
  WALLET_SECRET,
  "https://beta-3.fuel.network/graphql"
);

const contract = MyCounterProjectAbi__factory.connect(CONTRACT_ID, wallet);

function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function main() {
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
      checkWalletBalance();
      checkConnection();
    }
    main();
  }, []);

  async function checkWalletBalance() {
    const balance = await wallet.getBalance();
    console.log("Wallet balance:", balance.toString());
  }

  async function checkConnection() {
    try {
      const network = await wallet.provider.getNetwork();
      console.log("Connected to:", network.name);
    } catch (error) {
      console.error("Error connecting to Fuel network:", error);
    }
  }

  async function increment() {
    setLoading(true);
    try {
      await contract.functions.increment().txParams({ gasPrice: 1 }).call();
      const { value } = await contract.functions.count().get();
      setCounter(Number(value));
    } catch (error) {
      console.error("Error while incrementing:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Counter: {counter}</p>
        <button disabled={loading} onClick={increment}>
          {loading ? "Incrementing..." : "Increment"}
        </button>
      </header>
    </div>
  );
}

export default App;
