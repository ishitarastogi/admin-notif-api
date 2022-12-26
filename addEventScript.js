const eventSchema = require("./src/models/event");
const mongoose = require("mongoose");

async function addEvent(
    wallet, 
  eventName,
  eventHash,
  lastBlockNumber,
  contractAddress
) {

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
     

  const eventObj = {
    wallet,
    eventName,
    eventHash,
    lastBlockNumber,
    contractAddress,
  };

  const eo = eventSchema(eventObj);
  const eos = await eo.save();
}

addEvent('0x4dc8b342dAe79b0426a05c4fb9d95eD1f9b97144','RoleGranted','0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d',13049291,'0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57')
