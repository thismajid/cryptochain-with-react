import { useState } from "react";
import axios from "axios";

const ConductTransaction = () => {
  const [transaction, setTransaction] = useState({
    recipient: "",
    amount: "",
  });

  const changeHandler = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (transaction.recipient && transaction.amount) {
      const { data } = await axios.post(
        "http://localhost:1372/api/transact",
        transaction
      );
      if (data.type && data.type === "error") {
        alert(data.message);
      } else {
        alert("success");
      }
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="recipient"
          name="recipient"
          value={transaction.recipient}
          onChange={changeHandler}
        />
        <input
          type="number"
          placeholder="amount"
          name="amount"
          value={transaction.amount}
          onChange={changeHandler}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default ConductTransaction;
