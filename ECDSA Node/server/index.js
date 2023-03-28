const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04101d8ae98e0259c9cf87e31c5b33d7caf9787c66a999c63f828d5d99172d83df512d20fb94fd6e51c9ea89b1962fb4e13b56617ab6fc4773b006bfb226580d1f": 100,
  "04c83a957a008923be77e83f3bec941e093dea012f5b067804e7f00aa4f87b9e6f77a132028e3efda25289f0d8386c4f46f688c53ad659de7312d84bb8f755d2b3": 50,
  "0456a45f4ff1ca258f67f8342553fd111b4e05060eedcdbee269698e4662b2cc8748168345c05a038697b6eb91f6ead0e39d97151526e4e50a3ebd6cf2d6ada1c4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
