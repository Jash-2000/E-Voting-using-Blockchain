exports.Home = function(req,res){
    res.render('login', { title: 'BlockChain' });
};
exports.addvoterPage = function(req,res) {
  res.render('addVoterdata',{title: 'add voter'});
};
exports.Dashboard = function(req,res) {
  res.render('index',{title: 'Dashboard view'});
};
exports.error = function(req,res) {
  res.render('errorPage',{title: 'E-voting Dapp'});
};
exports.error2 = function(req,res) {
  res.render('errorPage2',{title: 'E-voting Dapp'});
};
exports.Evoting = function(req,res){
  res.render('E-voting',{title: 'E-voting Dapp'});
};
exports.mainpage = function(req,res){
  res.redirect('/Evoting');
};
