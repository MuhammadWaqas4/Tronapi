const TronWeb = require("tronweb");
const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const fullNode = "https://api.shasta.trongrid.io";
const solidityNode = "https://api.shasta.trongrid.io";
const eventServer = "https://api.shasta.trongrid.io";
const privateKey =
  "52a53be6ac8a4c761b4b9a9bde5d90b8dd3b64a196ee1f7419b1b8f8d363cac1"; // Enter Private key of your account

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

tronWeb.setAddress("TFuJeG2U8w7UZD9FutFt6YaMg7SNzNaqy8"); //Enter Address of your account

let contractAddress = "TNpVzcqD4zWpez9GJhKgPEF6pgxu8RpBxC"; //Enter Your Smart Contract Address
let abi =[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"users_ids","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"turnover","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getuserDetail","outputs":[{"name":"referralid","type":"address"},{"name":"userids","type":"uint256"},{"name":"lastpakage","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upline","type":"address"}],"name":"register","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"matrixIncome","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getUserById","outputs":[{"name":"addr","type":"address"},{"name":"upline","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"levelAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"chakuser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userAddress","type":"address[]"},{"name":"levelAmounts","type":"uint256[]"}],"name":"buyNewLevelProfit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"levelInfo","outputs":[{"name":"level","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"last_transaction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"last_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_LEVEL","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"id","type":"uint256"},{"name":"lastdepositId","type":"uint256"},{"name":"upline","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"levels","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amont","type":"uint256"}],"name":"drainTrX","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"upgrade","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_receiver","type":"address"},{"name":"_amont","type":"uint256"}],"name":"sendROI","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"root","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_root","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]


let instance = tronWeb.contract(abi, contractAddress);

// let args = {
//   callValue: 0,
//   shouldPollResponse: true,
// };



app.post("/sendROI", async function (req, res) {
  let address = req.body.address;
  let amount = req.body.amount;
  try {
    await instance
      .sendROI(address, amount*1000000)
      .send()
      .then((output) => {
        res.send({ success: true, result: output });
      });
  } catch (error) {
    console.log(error);
    res.send({ success: false, result:"transaction Error" });
  }
});
app.listen(4000, function () {
  console.log("Server started at 4000...");
});