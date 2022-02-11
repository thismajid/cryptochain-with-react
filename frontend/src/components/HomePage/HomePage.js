import { useEffect, useState } from "react";
import Blocks from "../Blocks/Blocks";
import wallet from "../../assets/wallet.png";
import { FaKey, FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getWalletInfoReq } from "../../services/requestService";
import { toast } from "react-toastify";

const HomePage = () => {
  const [walletInfo, setWalletInfo] = useState({
    address: "",
    balance: "",
  });

  useEffect(() => {
    getWalletInfo();
  }, []);

  const notifyError = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const getWalletInfo = async () => {
    try {
      const { data } = await getWalletInfoReq();
      setWalletInfo(data);
    } catch (err) {
      notifyError("Something went wrong ...");
    }
  };

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
