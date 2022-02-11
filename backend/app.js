const express = require("express");
const tcpPortUsed = require("tcp-port-used");
const cors = require("cors");

const routers = require("./routes");
const { syncOnConnect } = require("./controllers");

const app = express();
app.use(express.json());

app.use("/api", cors("*"), routers);

const rootPort = 3001;
let PORT = 3001;

tcpPortUsed.check(3001, "127.0.0.1").then(function (inUse) {
  if (inUse) {
    PORT += Math.ceil(Math.random() * 1000);
  }
  app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`);
    if (PORT !== rootPort) syncOnConnect(rootPort);
  });
});
