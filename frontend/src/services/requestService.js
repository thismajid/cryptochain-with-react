import http from "./httpService";

const getWalletInfoReq = () => {
  return http.get("/wallet-info");
};

const getBlocksReq = () => {
  return http.get("/blocks");
};

const postTransactionReq = (transaction) => {
  return http.post("/transact", transaction);
};

const getTransactionPoolMapReq = () => {
  return http.get("/transaction-pool-map");
};

const getMineTransactionReq = () => {
  return http.get("/mine-transactions");
};

export {
  getWalletInfoReq,
  getBlocksReq,
  postTransactionReq,
  getTransactionPoolMapReq,
  getMineTransactionReq,
};
