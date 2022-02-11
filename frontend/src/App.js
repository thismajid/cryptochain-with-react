import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Blocks from "./components/Blocks/Blocks";

function App() {
  const [walletInfo, setWalletInfo] = useState({ address: "", balance: "" });

  useEffect(() => {
    axios
      .get("http://localhost:1372/api/wallet-info")
      .then((res) => {
        setWalletInfo(res.data);
      })
      .then((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>wallet info : </h1>
      <h3>Address : {walletInfo.address}</h3>
      <h3>Balance : {walletInfo.balance}</h3>
      <br />
      <Blocks />
    </div>
  );
}

export default App;
