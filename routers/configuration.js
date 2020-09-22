var db = require('./db.js');
var ElectionContractJson = require("/home/dev/Desktop/vasudev/BlockChain/BlockChain APP/VotingSystemNew/build/contracts/Election.json");
var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.eth.defaultAccount = web3.eth.accounts[0];

var electionDB = web3.eth.contract(ElectionContractJson.abi);
/*
var electionDB = web3.eth.contract([ { "constant": false, "inputs": [ { "name": "_candidateId", "type": "uint256" }, { "name": "_voterAddress", "type": "address" } ], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_name", "type": "string" }, { "name": "_partyName", "type": "string" } ], "name": "addCandidate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "candidates", "outputs": [ { "name": "id", "type": "uint256", "value": "0" }, { "name": "name", "type": "string", "value": "" }, { "name": "partyName", "type": "string", "value": "" }, { "name": "voteCount", "type": "uint256", "value": "0" }, { "name": "parcetange", "type": "uint256", "value": "0" }, { "name": "marginWL", "type": "uint256", "value": "0" }, { "name": "winloss", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_Address", "type": "address" }, { "name": "_FName", "type": "string" }, { "name": "_LName", "type": "string" }, { "name": "_Gender", "type": "uint256" } ], "name": "addVoterData", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "winer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "VoterData", "outputs": [ { "name": "voterID", "type": "uint256", "value": "0" }, { "name": "voterAddress", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "voterFastName", "type": "string", "value": "" }, { "name": "voterLastName", "type": "string", "value": "" }, { "name": "voterGender", "type": "uint256", "value": "0" }, { "name": "voterVoted", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_candidateId", "type": "uint256" }, { "indexed": false, "name": "_candidateName", "type": "string" }, { "indexed": false, "name": "_partyName", "type": "string" } ], "name": "addCandidateEvent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_voterId", "type": "uint256" }, { "indexed": false, "name": "_voterAddress", "type": "address" }, { "indexed": false, "name": "_voterFastName", "type": "string" }, { "indexed": false, "name": "_voterLastName", "type": "string" }, { "indexed": false, "name": "_voterGender", "type": "uint256" }, { "indexed": false, "name": "_voterVoted", "type": "bool" } ], "name": "addVoterEvent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_errorLog", "type": "string" } ], "name": "errorLog", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_voterStatus", "type": "string" } ], "name": "votingLog", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_winName", "type": "string" } ], "name": "winerName", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_id", "type": "uint256" }, { "indexed": false, "name": "_name", "type": "string" }, { "indexed": false, "name": "_partyName", "type": "string" }, { "indexed": false, "name": "_voteCount", "type": "uint256" }, { "indexed": false, "name": "_parcetange", "type": "uint256" }, { "indexed": false, "name": "marginWL", "type": "uint256" }, { "indexed": false, "name": "_winloss", "type": "string" } ], "name": "winnerData", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_candidateId", "type": "uint256" }, { "indexed": false, "name": "_voterAddress", "type": "address" } ], "name": "uservoteLog", "type": "event" } ]);
*/
var Election = electionDB.at("0xf811f5f953eb7cdcbff3378b3a82c0bbd66a87da");

var coinBase = {_from:web3.eth.coinbase};
var fromToBlock = {fromBlock:'latest', toBlock :'latest'};
var fromOTolates = {fromBlock:0, toBlock :'latest'};
var eventAddvoter = Election.addVoterEvent(coinBase,fromToBlock);
var eventLogerr = Election.errorLog(coinBase,fromToBlock);
var votingLog = Election.votingLog(coinBase,fromToBlock);
var uservoteLog = Election.uservoteLog(coinBase,fromToBlock);
var winnerData = Election.winnerData(coinBase,fromToBlock);
var addCandidateEvent = Election.addCandidateEvent(coinBase,fromOTolates);

winnerData.watch(function(err,result){
  if(!err){
  if(result.args._id.toString()!=0){
  var datain = {
   candidateID : result.args._id.toString(),
   name : result.args._name,
   partyName : result.args._partyName,
   voteCount : result.args._voteCount.toString(),
   parcetange : result.args._parcetange.toString(),
   marginWL : result.args.marginWL.toString(),
   winloss : result.args._winloss
 };
 console.log(datain);
 db.query("INSERT INTO candidates set ? ",datain, function(err, rows)
  {
        if (err)
            console.log("Error inserting : %s ",err );
    });
  }
  } else{
    console.log(err);
  }
});

eventAddvoter.watch(function(error, result){
  if (error)
  {
    console.log("Error inserting : %s ",error );
  } else {
      var insertData = {
        voterID : parseInt(result.args._voterId.toString()),
        voterAddress : result.args._voterAddress,
        voterElectionId : result.args._voterElectionId,
        voterFastName : result.args._voterFastName,
        voterLastName : result.args._voterLastName,
        voterGender : parseInt(result.args._voterGender.toString()),
        voterVoted : result.args._voterVoted,
        TranscationHash : result.transactionHash
      };
       console.log(insertData);
       db.query("INSERT INTO voters set ? ",insertData, function(err, rows)
        {
              if (err)
                  console.log("Error inserting : %s ",err );
          });
  }
});
 eventLogerr.watch(function(err,result){
   if(!err){
      console.log(result);
   }
 });
 votingLog.watch(function(err,result){
   if(!err)
   console.log(result.args._voterStatus);
 });
uservoteLog.watch(function(err,result){
  if(!err)
    var voterAddress = result.args._voterAddress;
    var updateAddress ='"'.concat(voterAddress.concat('"'));
    var sql = "UPDATE voters SET voterVoted = 1 WHERE voterAddress ="+updateAddress;
    console.log(sql);
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
  });
});
addCandidateEvent.watch(function(err,result){
  if(!err){
    var addCondiate = {
      candidateId : parseInt(result.args._candidateId.toString()),
      candidateName : result.args._candidateName,
      partyName : result.args._partyName,
      TranscationHash : result.transactionHash
    };

    db.query("INSERT INTO condidatesdata set ? ",addCondiate, function(err, rows)
     {
           if (err)
               console.log("Error inserting : %s ",err );
       });
  }
});

exports.election = Election;
exports.web3Module = web3;
