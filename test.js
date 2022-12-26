const ethers = require("ethers");
const PushAPI = require("@pushprotocol/restapi");
const axios = require("axios");
const eventSchema = require("./src/models/event");
const mongoose = require("mongoose");
const config = require("./config");

async function check() {
  console.log("in test");
  mongoose.connect(
    "mongodb+srv://thunderpi:--Earth123--@thunderpi.rmgof.mongodb.net/ishitaPC?retryWrites=true&w=majority",
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
  const events = await eventSchema.find();
  const PK = config.CH_KEY;
  const Pkey = `0x${config.PR_KEY}`;
  const signer = new ethers.Wallet(Pkey);

  events.map(async (eve) => {
      console.log('after DB');
    try {
      const { wallet,eventName, eventHash, lastBlockNumber, contractAddress } = eve;
      const latestBlock = lastBlockNumber + 10000;
      const apiKey = "I7FWNG5KVEMJGQ6PCTRBAYW71QVQJGM5II";
      const baseURL = `https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=${lastBlockNumber}&toBlock=${latestBlock}&address=${contractAddress}&topic0=${eventHash}&page=1&offset=1000&apikey=${apiKey}`;
      console.log(baseURL);
      const config1 = {
        method: "get",
        url: baseURL,
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await axios(config1);
      response = response["data"];
      console.log(Number(response.result[0].timeStamp));
      console.log(new Date(Number(response.result[0].timeStamp)* 1000));


        let messageTitle = `${eventName} was emmited`;
          let messageBody = `Event ${eventName} was emited on ${new Date(Number(response.result[0].timeStamp)* 1000)}`;
          let constantV = "eip155:80001:";
          let final = `${constantV}${wallet}`;
          let recipients = final;
       
          const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3, // target
            identityType: 2, // direct payload
            notification: {
              title: `${messageTitle}`,
              body: `[s: ${messageBody}]`,
            },
            payload: {
              title: `${messageTitle}`,
              body: `[s: ${messageBody}]`,
              cta: `https://etherscan.io/tx/${response.result[0].transactionHash}#eventlog`,
              img: '',
            },
            recipients: final, // recipients addresses
            channel: `eip155:80001:${config.CH_PKEY}`, // your channel address
            env: "staging",
          });


    } catch (error) {
      console.log(error);
    }
  });
}

// check();

async function check1() {
    const provider = ethers.getDefaultProvider()
    const block = await provider.getBlockNumber()
    console.log(block);
}
check1()