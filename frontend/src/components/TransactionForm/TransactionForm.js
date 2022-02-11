import { useState } from "react";
import { Link } from "react-router-dom";
import { postTransactionReq } from "../../services/requestService";
import { toast } from "react-toastify";

const TransactionForm = ({ history }) => {
  const [transaction, setTransaction] = useState({
    recipient: "",
    amount: "",
  });

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

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const changeHandler = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (transaction.recipient && transaction.amount) {
        const { data } = await postTransactionReq(transaction);
        notifySuccess("Money Sent Successfully");
        setTimeout(() => {
          history.push("/transaction-pool");
        }, 6000);
      }
    } catch (err) {
      notifyError("Something went wrong ...");
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
        <Link to="/" style={{ marginLeft: "10px" }}>
          <button className="goToHome">Back to home page</button>
        </Link>
      </form>
    </div>
  );
};

export default TransactionForm;
