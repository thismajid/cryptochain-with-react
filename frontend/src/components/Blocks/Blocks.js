import axios from "axios";
import { useEffect, useState } from "react";
import blockchain from "../../assets/blockchain.png";
import Block from "./Block/Block";

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
    <div className="blocks">
      <div className="header">
        <img src={blockchain} alt="blockchain" />
        <h1>Cryptochain</h1>
      </div>
      {blocks.map((block) => (
        <Block key={block.hash} block={block} />
      ))}
    </div>
  );

  // return (
  //   <div>
  //     <h3>Blocks</h3>
  //     {blocks.map((block) => {
  //       return <div key={block.hash}>{block.hash}</div>;
  //     })}
  //   </div>
  // );
};

export default Blocks;
