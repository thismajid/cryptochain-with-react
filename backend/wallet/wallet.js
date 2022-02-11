const { STARTING_BALANCE } = require("./../configs");
const { ec, cryptoHash } = require("./../utils");
const Transaction = require("../wallet/transaction");

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }

  createTransaction({ recipient, amount, chain }) {
    if (chain) {
      this.balance = Wallet.calculateBalance({
        chain,
        address: this.publicKey,
      });
    }
    if (amount > this.balance) {
      throw new Error("amount exceeds balance");
    }
    return new Transaction({ senderWallet: this, recipient, amount });
  }

  static calculateBalance({ chain, address }) {
    let hasCondectedTransaction = false;
    let outputTotal = 0;

    for (let index = chain.length - 1; index > 0; index--) {
      const block = chain[index];

      for (const transaction of block.data) {
        if (transaction.input.address === address) {
          hasCondectedTransaction = true;
        }
        const addressOutput = transaction.outputMap[address];
        if (addressOutput) {
          outputTotal += addressOutput;
        }
      }

      if (hasCondectedTransaction) {
        break;
      }
    }

    return hasCondectedTransaction
      ? outputTotal
      : STARTING_BALANCE + outputTotal;
  }
}

module.exports = Wallet;
