import axios from "axios";
import Transaction from "../Blocks/Block/Transaction/Transaction";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pool from "../../assets/pool.png";

const TransactionPool = () => {
  const [transactionMap, setTransactionMap] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:1372/api/transaction-pool-map")
      .then((res) => {
        setTransactionMap(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="transaction-pool">
      <img src={pool} alt="pool" />
      <Link to="/">
        <button>Back to home page</button>
      </Link>
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
