import { useState } from "react";

const Block = ({ block }) => {
  const [displayTransaction, setDisplayTransaction] = useState(false);

  const ToggleTransaction = () => {
    setDisplayTransaction(!displayTransaction);
  };

  const { timestamp, hash, data } = block;
  const hashDisplay = `${hash.substring(0, 15)}...`;
  const stringifiedData = JSON.stringify(data);
  const dataDisplay =
    stringifiedData.length > 35
      ? `${stringifiedData.substring(0, 35)}...`
      : stringifiedData;

  return (
    <div className="block">
      <div>Hash: {hashDisplay}</div>
      <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
      <div onClick={ToggleTransaction} style={{ cursor: "pointer" }}>
        Data: {displayTransaction ? JSON.stringify(data) : dataDisplay}
      </div>
    </div>
  );
};

export default Block;
