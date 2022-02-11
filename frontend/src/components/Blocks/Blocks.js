import axios from "axios";
import { useEffect, useState } from "react";

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1372/api/blocks")
      .then((res) => {
        setBlocks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3>Blocks</h3>
      {blocks.map((block) => {
        return <div key={block.hash}>{block.hash}</div>;
      })}
    </div>
  );
};

export default Blocks;
