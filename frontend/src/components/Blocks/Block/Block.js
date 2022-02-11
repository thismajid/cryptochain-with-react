const Block = ({ block }) => {
  const { timestamp, hash, data } = block;
  const hashDisplay = `${hash.substring(0, 15)}...`;
  const stringifiedData = JSON.stringify(data);
  const dataDisplay =
    stringifiedData.length > 35
      ? `${stringifiedData.substring(0, 15)}...`
      : stringifiedData;

  return (
    <div className="block">
      {console.log(timestamp)}
      <div>Hash: {hashDisplay}</div>
      <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
      <div>Data: {dataDisplay}</div>
    </div>
  );
};

export default Block;
