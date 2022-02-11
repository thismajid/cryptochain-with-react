import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ConductTransaction from "./components/ConductTransaction/ConductTransaction";
import TransactionPool from "./components/TransactionPool/TransactionPool";
import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/transaction-pool" component={TransactionPool} />
      <Route path="/transaction" component={ConductTransaction} />
      <Route path="/" exact component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
