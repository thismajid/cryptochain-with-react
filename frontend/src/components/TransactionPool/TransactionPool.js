import Transaction from "../Blocks/Block/Transaction/Transaction";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pool from "../../assets/pool.png";
import {
  getTransactionPoolMapReq,
  getMineTransactionReq,
} from "../../services/requestService";
import { toast } from "react-toastify";

const TransactionPool = ({ history }) => {
  const [transactionMap, setTransactionMap] = useState({});

  useEffect(() => {
    getTransactions();
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

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const getTransactions = async () => {
    try {
      const { data } = await getTransactionPoolMapReq();
      setTransactionMap(data);
    } catch (err) {
      notifyError("Something went wrong ...");
    }
  };

  const mineHandler = async () => {
    try {
      await getMineTransactionReq();
      notifySuccess("Success !");
      setTimeout(() => {
        history.push("/");
      }, 6000);
    } catch (err) {
      notifyError("Something went wrong ...");
    }
  };

  return (
    <div className="transaction-pool">
      <img src={pool} alt="pool" />
      <Link to="/">
        <button className="goToHome">Back to home page</button>
      </Link>
      <button onClick={mineHandler}>Mine Transactions</button>
      {Object.values(transactionMap).map((transaction) => {
        return (
          <div key={transaction.id}>
            <hr />
            <Transaction transaction={transaction} />
          </div>
        );
      })}
    </div>
  );
};

export default TransactionPool;
