import { useEffect, useState } from "react";
import axios from "axios";
import Blocks from "../Blocks/Blocks";
import wallet from "../../assets/wallet.png";
import { FaKey, FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [walletInfo, setWalletInfo] = useState({
    address: "",
    balance: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:1372/api/wallet-info")
      .then((res) => {
        setWalletInfo(res.data);
      })
      .then((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="wallet">
        <div>
          <img src={wallet} alt="wallet" />
        </div>
        <div>
          <h1>Your Wallet</h1>
          <Link to="transaction">
            <button>Send Money</button>
          </Link>
          <Link to="transaction-pool" style={{ marginLeft: "10px" }}>
            <button>See Pool</button>
          </Link>
          <div className="address">
            <FaKey className="icon" />
            Address: {walletInfo.address}
          </div>
          <div className="balance">
            <FaCoins className="icon" />
            Balance: {walletInfo.balance}
          </div>
        </div>
      </div>
      <Blocks />
    </>
  );
};

export default HomePage;