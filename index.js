const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var cors = require("cors");
const app = express();
const router = express.Router();
const config = require("./config");
const bodyParser = require("body-parser");
let cron = require("node-cron");
const ethers = require("ethers");
const PushAPI = require("@pushprotocol/restapi");
const axios = require("axios");
const eventSchema = require("./src/models/event");
let port = config.port;
let uriMongo = "mongodb+srv://thunderpi:--Earth123--@thunderpi.rmgof.mongodb.net/push?retryWrites=true&w=majority";
const eventRoute = require("./src/routes/eventsRoute");
mongoose.connect(
  uriMongo,
  {
    //reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    //useCreateIndex: true,
    //autoReconnect: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) {
      console.log("DB Connection errored");
      return;
    } else {
      console.log("DB Connected successfully");
    }
  }
);
app.use(cors());
app.use(express.json());
app.use("/event", eventRoute);
app.listen(port, () => {
  console.log("App running at port:" + port);
}); 


// cron.schedule("* * * * *", async () => {
    
//     console.log(123);
//     try {
//         const events = await eventSchema.find();
//         const PK = config.CH_KEY;
//         const Pkey = `0x${config.PR_KEY}`;
//         const signer = new ethers.Wallet(Pkey);
      
//         events.map(async (eve) => {
//             console.log('after DB');
//           try {
//             const { wallet,eventName, eventHash, lastBlockNumber, contractAddress } = eve;
//             const provider = ethers.getDefaultProvider()
             
//             const latestBlock = await provider.getBlockNumber();
//             const apiKey = "I7FWNG5KVEMJGQ6PCTRBAYW71QVQJGM5II";
//             const baseURL = `https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=${lastBlockNumber}&toBlock=${latestBlock}&address=${contractAddress}&topic0=${eventHash}&page=1&offset=1000&apikey=${apiKey}`;
//             console.log(baseURL);
//             const config1 = {
//               method: "get",
//               url: baseURL,
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             };
//             let response = await axios(config1);
//             response = response["data"];
//             console.log(Number(response.result[0].timeStamp));
//             console.log(new Date(Number(response.result[0].timeStamp)* 1000));
//             eve.lastBlockNumber = latestBlock;
//             await eve.save();
      
      
//               let messageTitle = `${eventName} was emmited`;
//                 let messageBody = `Event ${eventName} was emited on ${new Date(Number(response.result[0].timeStamp)* 1000)}`;
//                 let constantV = "eip155:80001:";
//                 let final = `${constantV}${wallet}`;
//                 let recipients = final;
             
//                 const apiResponse = await PushAPI.payloads.sendNotification({
//                   signer,
//                   type: 3, // target
//                   identityType: 2, // direct payload
//                   notification: {
//                     title: `${messageTitle}`,
//                     body: `[s: ${messageBody}]`,
//                   },
//                   payload: {
//                     title: `${messageTitle}`,
//                     body: `[s: ${messageBody}]`,
//                     cta: `https://etherscan.io/tx/${response.result[0].transactionHash}#eventlog`,
//                     img: '',
//                   },
//                   recipients: final, // recipients addresses
//                   channel: `eip155:80001:${config.CH_PKEY}`, // your channel address
//                   env: "staging",
//                 });
      
      
//           } catch (error) {
//             console.log(error);
//           }
//         });

//     } catch (error) {
//         console.log(error);
//     }
    
// })