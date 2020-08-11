
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./routers/pages.js');
var modules = require('./routers/module.js');

var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || port);

//app.get('/',modules.votingUI);
app.get('/',routes.mainpage)
app.get('/Evoting',routes.Home);
app.post('/Evoting',modules.voterIdcheck);

app.post('/Evoting/HomePage',modules.Evote);

app.get('/Evoting/Addvoterdata',modules.AddVoterPage);
app.post('/Evoting/Addvoterdata',modules.InserVoterdata);
app.get('/Evoting/candidateDataget',modules.getCandidate);
app.get('/Evoting/Dashboard',modules.Dashboard);
app.post('/Evoting/Dashboard',modules.getCandidateData);

app.get('/Evoting/VoterData',modules.viewVoterData);

app.get('/Evoting/ethAccounts',modules.ethAccounts);

app.get('/Evoting/error',routes.error);
app.get('/Evoting/unauthorized',routes.error2);

app.listen(port, function() {
  console.log("Listening on " + port);

});
