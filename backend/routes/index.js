const Router = require("express");

const router = new Router();

const {
  getBlocks,
  mineTransactions,
  transactionPoolMap,
  transact,
  mine,
  walletInfo,
} = require("../controllers");

router.get("/blocks", getBlocks);

router.get("/mine-transactions", mineTransactions);

router.get("/transaction-pool-map", transactionPoolMap);

router.get("/wallet-info", walletInfo);

router.post("/transact", transact);

router.post("/mine", mine);

module.exports = router;
