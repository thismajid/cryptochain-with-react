import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ConductTransaction from "./components/ConductTransaction/ConductTransaction";

ReactDOM.render(
  <React.StrictMode>
    <ConductTransaction />
  </React.StrictMode>,
  document.getElementById("root")
);
