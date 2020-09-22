var electionModule = require('./configuration.js');
var db = require('./db.js');

var Election = electionModule.election;
var Web3 = electionModule.web3Module;

var listAccount = Web3.eth.accounts;

// add votesr
exports.getCandidateData = function(req,res){
   Election.winer({gas:400000});
  res.redirect('/Evoting/Dashboard');
};

exports.InserVoterdata = function(req,res){
    var Address = req.body.voterAddress;
    var voterElectionId = req.body.voterElectionId;
    var FName = req.body.voterfastName;
    var LName = req.body.voterlastName;
    var Gender = req.body.selectUserAccess;
    console.log(req.body);
    Election.addVoterData(Address,voterElectionId,FName,LName,Gender,{gas:300000});
    deleteRecord(Address);
    res.redirect('/Evoting/Addvoterdata');
};

 exports.AddVoterPage = function(req,res) {

  db.query('SELECT * FROM etherAddress Limit 1',function(err,rows){
                if(err){
                      console.log("Error Selecting : %s ",err );
                } else {
                  res.render('addVoterdata',{page_title:"Add Voter",data:rows});
                }
             });
};

exports.votingUI = function(req,res){
 db.query('SELECT * FROM etherAddress',function(err,rows){
               if(err){
                     console.log("Error Selecting : %s ",err );
               } else {
                 res.render('E-voting',{page_title:"E voting System",data:rows});
               }
            });
};
exports.ethAccounts = function(req,res){
  addAcountsInDB();
};
// votesr vote to candidate using candidate ID and voter Address
exports.Evote = function(req,res){

  var cid = req.body.Id;
  var vAddress =req.body.address;
  console.log(vAddress);
   Election.vote(cid,vAddress,{gas:400000});

   res.send('200');
};


exports.viewVoterData = function(req,res){
         db.query('SELECT * FROM voters',function(err,rows){
                 if(err){
                       console.log("Error Selecting : %s ",err );
                 } else {
                   res.render('tables',{page_title:"View VoterData",data:rows});
                 }
      });
};

exports.Dashboard = function(req,res){
  db.query('SELECT * FROM candidates',function(err,rows){
          if(err){
                console.log("Error Selecting : %s ",err );
          } else {
            res.render('index',{page_title:"Election Result",data:rows});

          }
    });
};
exports.getCandidate = function(req,res){
  db.query('SELECT * FROM condidatesdata',function(err,rows){
          if(err){
                console.log("Error Selecting : %s ",err );
          } else {
            res.send(rows);
          }
    });
};


exports.voterIdcheck = function(req,res) {
  var voterElectionId = req.body.txtvoterID;
  var sql = "SELECT voterAddress,voterVoted FROM voters where voterElectionId = '" + voterElectionId + "'";
  console.log(sql);
   db.query(sql, function (err, result) {
   if (err){
     var errlog = "Not register";
     res.redirect('/Evoting/unauthorized');
   } else {
     console.log(result);
     var chjson = JSON.stringify(result);
      if(result.length !=0){
        if(result[0].voterVoted == 0){
            res.render('E-voting',{page_title:"E voting System",data:result});
        } else {
          res.redirect('/Evoting/error');
        }
      }else{
          res.redirect('/Evoting/unauthorized');
      }
   }
 });
};

function addAcountsInDB(){
  var records = [];
  for(var ii=0; ii<listAccount.length; ii++){
    records.push([listAccount[ii],ii]);
  }
  var sql = "INSERT INTO etherAddress (address,Id) VALUES ?";
  var query = db.query(sql, [records], function(err, result) {
    if (err)
        console.log("Error inserting : %s ",err );
      console.log(result);
  });
}

function deleteRecord(address){
  var sql = "DELETE FROM etherAddress WHERE address = '"+address+"'";
   db.query(sql, function (err, result) {
   if (err) throw err;
   console.log("Number of records deleted: " + result.affectedRows);
 });
}
