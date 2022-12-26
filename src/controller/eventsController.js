const eventSchema = require("../models/event");
const axios = require("axios");
const ethers = require("ethers");

async function addEvent(req, res) {
  try {
    const wallet = req.body.wallet; 
  const eventName = req.body.eventName; 
  const eventHash = req.body.eventHash; 
  const provider = ethers.getDefaultProvider()
  const lastBlockNumber = await provider.getBlockNumber();
  const contractAddress = req.body.contractAddress;

  const eventObj = {
    wallet,
    eventName,
    eventHash,
    lastBlockNumber,
    contractAddress,
  };

  const eo = eventSchema(eventObj);
  const eos = await eo.save();
  res.send(eos)
  } catch (error) {
    res.send(error)
  }
  
}

module.exports = {
  addEvent,
};
