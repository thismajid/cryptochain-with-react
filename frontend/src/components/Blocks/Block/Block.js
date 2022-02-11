import { useState } from "react";
import Transaction from "./Transaction/Transaction";

const Block = ({ block }) => {
  const [displayTransaction, setDisplayTransaction] = useState(false);

  const ToggleTransaction = () => {
    setDisplayTransaction(!displayTransaction);
  };

  const showTransactions = (transactions) => {
    return transactions.map((transaction) => {
      return (
        <div key={transaction.id}>
          <hr />
          <Transaction transaction={transaction} />
        </div>
      );
    });
  };

  const { timestamp, hash, data } = block;
  const hashDisplay = `${hash.substring(0, 15)}...`;

  return (
    <div className="block">
      <div>Hash: {hashDisplay}</div>
      <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
      <div onClick={ToggleTransaction} style={{ cursor: "pointer" }}>
        Data:{" "}
        {displayTransaction ? (
          showTransactions(data)
        ) : (
          <span className="show">Show Transaction</span>
        )}
      </div>
    </div>
  );
};

export default Block;
