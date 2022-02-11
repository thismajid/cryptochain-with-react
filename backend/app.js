const express = require("express");
const tcpPortUsed = require("tcp-port-used");

const routers = require("./routes");
const { syncOnConnect } = require("./controllers");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to cryptochain");
});
app.use("/api", routers);

const rootPort = 1372;
let PORT = 1372;

tcpPortUsed.check(1372, "127.0.0.1").then(function (inUse) {
  if (inUse) {
    PORT += Math.ceil(Math.random() * 1000);
  }
  app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`);
    if (PORT !== rootPort) syncOnConnect(rootPort);
  });
});
