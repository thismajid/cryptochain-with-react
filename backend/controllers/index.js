const axios = require("axios");
const { Blockchain } = require("../blockchain");
const { Pubsub, TransactionMiner } = require("../services");
const { TransactionPool, Wallet } = require("../wallet");

const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubsub = new Pubsub({ blockchain, transactionPool });

const transactionMiner = new TransactionMiner({
  blockchain,
  transactionPool,
  wallet,
  pubsub,
});

const syncOnConnect = async (rootPort) => {
  let response = await axios.get(`http://localhost:${rootPort}/api/blocks`);
  blockchain.replaceChain(response.data);

  response = await axios.get(
    `http://localhost:${rootPort}/api/transaction-pool-map`
  );
  transactionPool.setMap(response.data);
};

const getBlocks = (req, res) => {
  res.json(blockchain.chain);
};

const mineTransactions = (req, res) => {
  transactionMiner.mineTransactions();
  res.redirect("/api/blocks");
};
const transactionPoolMap = (req, res) => {
  res.json(transactionPool.transactionMap);
};

const transact = (req, res) => {
  let { amount, recipient } = req.body;
  amount = parseInt(amount);
  let transaction = transactionPool.existingTransaction({
    inputAddress: wallet.publicKey,
  });
  try {
    if (transaction) {
      transaction.update({ senderWallet: wallet, recipient, amount });
    } else {
      transaction = wallet.createTransaction({ recipient, amount });
    }
  } catch (error) {
    return res.json({ type: "error", message: error.message });
  }
  transactionPool.setTransaction(transaction);
  pubsub.broadcastTransaction(transaction);
  // console.log("transactionPool", transactionPool);
  res.json({ transaction });
};

const mine = (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });
  pubsub.broadcastChain();
  res.redirect("/api/blocks");
};

const walletInfo = (req, res) => {
  res.json({
    address: wallet.publicKey,
    balance: Wallet.calculateBalance({
      chain: blockchain.chain,
      address: wallet.publicKey,
    }),
  });
};

const walletFoo = new Wallet();
const walletBar = new Wallet();

const generateWalletTransaction = ({ wallet, recipient, amount }) => {
  const transaction = wallet.createTransaction({
    recipient,
    amount,
    chain: blockchain.chain,
  });

  transactionPool.setTransaction(transaction);
};

const walletAction = () =>
  generateWalletTransaction({
    wallet,
    recipient: walletFoo.publicKey,
    amount: 5,
  });

const walletFooAction = () =>
  generateWalletTransaction({
    wallet: walletFoo,
    recipient: walletBar.publicKey,
    amount: 10,
  });

const walletBarAction = () =>
  generateWalletTransaction({
    wallet: walletBar,
    recipient: wallet.publicKey,
    amount: 15,
  });

for (let index = 0; index < 10; index++) {
  if (index % 3 === 0) {
    walletAction();
    walletFooAction();
  } else if (index % 3 === 1) {
    walletAction();
    walletBarAction();
  } else {
    walletFooAction();
    walletBarAction();
  }

  transactionMiner.mineTransactions();
}

module.exports = {
  syncOnConnect,
  getBlocks,
  mineTransactions,
  transactionPoolMap,
  transact,
  mine,
  walletInfo,
};
