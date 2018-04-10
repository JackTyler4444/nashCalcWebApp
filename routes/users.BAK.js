var express = require('express');
var router = express.Router();
var MetaAuth = require('meta-auth');
var metaAuth = new MetaAuth();

 var request = require('request');
var jsonQuery = require('json-query');
 
//router.post('/invoice/:MetaAddress', metaAuth, function(req, res){
router.get('/auth/:MetaAddress', metaAuth, function(req, res){
  //console.log(req.body.antes);
  //console.log(req.body.position);
  //console.log(req.body.effectiveBbs);
  //console.log(req.body.icmCev);

  //data = JSON.parse(data);
   //console.log(data[0]);
  console.log('asked for challenge');

  // Request a message from the server
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});
//router.post('/invoice/:MetaMessage/:MetaSignature', metaAuth, function(req, res){
router.get('/auth/:MetaMessage/:MetaSignature/:antes/:position/:effectiveBbs/:icmCev', metaAuth, function(req, res){
  
   console.log(req.params.antes);
   console.log(req.params.position);
   console.log(req.params.effectiveBbs);
   console.log(req.params.icmCev);

  if (req.metaAuth && req.metaAuth.recovered) {
    // Signature matches the cache address/challenge
    // Authentication is valid, assign JWT, etc.
    res.send(req.metaAuth.recovered);
    console.log('matched');
    console.log(req.metaAuth.recovered);


  request('https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x4239587333661f3761cbC45ef0A4CBf24417Ae53&startblock=2076060&endblock=99999999&sort=asc&apikey=ZBNU9HGBQNG1T8ASTYMB95ANZJFYJMZN2I', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  bodyTemp = JSON.parse(body);

  //jsonQuery('body[from=0x627306090abab3a6e1400e9345bc60c78a8bef57].name', {
  //data: data
//})

//check returned api results for senders address
var results = [];
var searchField = "from";
var searchVal = req.metaAuth.recovered;
for (var i=0 ; i < bodyTemp.result.length ; i++)
{
    if (bodyTemp.result[i][searchField] == searchVal) {
        results.push(bodyTemp.result[i]);
        console.log('found match');
         console.log(bodyTemp.result[i]);

         //getInputs(req.params.antes, req.params.position, req.params.effectiveBbs, req.params.icmCev);
    }
    //console.log('Didnt match.  Trying again');
} 

  //console.log('body:', bodyTemp); // Print the HTML for the Google homepage.
});

  } else {
    // Sig did not match, invalid authentication
    console.log('didnt match');
    res.status(400).send();
  }
});

router.post('/calculate', function(req, res){
    console.log(req.body.formSelectorantes);
    console.log(req.body.formSelectorposition);
    console.log(req.body.formSelectoreffectiveBbs);
    console.log(req.body.formSelectoricmCev);
    console.log('calculate working');
    //res.redirect('/auth/:MetaAddress'); 
});


module.exports = router;
