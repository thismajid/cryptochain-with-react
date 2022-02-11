import HomePage from "./components/HomePage/HomePage";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionPool from "./components/TransactionPool/TransactionPool";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/transaction-pool" component={TransactionPool} />
        <Route path="/transaction" component={TransactionForm} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
