import { useEffect, useState } from "react";
import blockchain from "../../assets/blockchain.png";
import Block from "./Block/Block";
import { getBlocksReq } from "../../services/requestService";
import { toast } from "react-toastify";

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    getBlocks();
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

  const getBlocks = async () => {
    try {
      const { data } = await getBlocksReq();
      setBlocks(data);
    } catch (err) {
      notifyError("Something went wrong ...");
    }
  };

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
