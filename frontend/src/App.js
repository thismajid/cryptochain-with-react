import HomePage from "./components/HomePage/HomePage";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionPool from "./components/TransactionPool/TransactionPool";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route path="/transaction-pool" component={TransactionPool} />
        <Route path="/transaction" component={TransactionForm} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
