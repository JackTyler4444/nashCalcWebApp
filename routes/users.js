var express = require('express');
var router = express.Router();
var MetaAuth = require('meta-auth');
var metaAuth = new MetaAuth();

 var request = require('request');
var jsonQuery = require('json-query');

var fs = require('fs');
 
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
   // res.send(req.metaAuth.recovered);
    console.log('matched');
    console.log(req.metaAuth.recovered);

//var bodyTemp;

  request('https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x627306090abaB3A6e1400e9345bC60c78a8BEf57&startblock=2086841&endblock=99999999&sort=asc&apikey=ZBNU9HGBQNG1T8ASTYMB95ANZJFYJMZN2I', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('Inside Body: ' + body);
  //bodyTemp = body;
  //console.log('Inside Body: ' + bodyTemp);
  //return(body);

//console.log('Outside before JSON parse:' + bodyTemp);
 var bodyTemp = JSON.parse(body);
//console.log('Outside:' + bodyTemp);
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

         var table_output_data = getInputs(req.params.antes, req.params.position, req.params.effectiveBbs, req.params.icmCev);
         console.log(table_output_data);
         //*** need to resolve these two sends
         //res.send(req.metaAuth.recovered);
          //res.render('index', table_output_data);
         //res.render('outputs', { minraise_output: 'test'});
        // res.redirect('outputs');
         //res.render('index');
          res.send(table_output_data);
          
          console.log('done render');
          break;
    }
    //console.log('Didnt match.  Trying again');
} 

  //console.log('body:', bodyTemp); // Print the HTML for the Google homepage.
});
//res.send(req.metaAuth.recovered);
  } else {
    // Sig did not match, invalid authentication
    console.log('didnt match');
    res.status(400).send();
  }
 //res.redirect('outputs');
});

router.post('/calculate', function(req, res){
    console.log(req.body.formSelectorantes);
    console.log(req.body.formSelectorposition);
    console.log(req.body.formSelectoreffectiveBbs);
    console.log(req.body.formSelectoricmCev);
    console.log('calculate working');
    //res.redirect('/auth/:MetaAddress'); 
});



  function getInputs(antes, position, effectiveBbs, icmCev){
      //var antes = $('#formSelectorantes').val();
      //var position = $('#formSelectorposition').val();
      //var effectiveBbs = $('#formSelectoreffectiveBbs').val();
      //var icmCev = $('#formSelectoricmCev').val();
      //var minRaiserange = "-";

      var fileOne = '';
      var fileTwo = '';

      var shoveRange = "-";
      
      var ssArray = [[["minRaisenoantescev.csv", "shoveNoantescev.csv"], ["NocEV"]], [["minRaiseantescev.csv","shoveAntescev.csv"], ["YescEV"]], [["minRaisenoantesICM.csv", "shovenoantesICM.csv"], ["NoICM"]], [["minRaiseantesICM.csv", "shoveantesICM.csv"], ["YesICM"]]];
 
      // get inputs: antes, icm/cev  
      var userInputs = antes + icmCev;
        
       //match inputs to corresponding sheet call parse/output function
       for (i = 0; i < ssArray.length; i++) {
        if (ssArray[i][1][0] === userInputs) {
          
          //getRanges(ssArray[i][0][0], ssArray[i][0][1], antes, position, effectiveBbs, icmCev);   
          
          fileOne = ssArray[i][0][0];
          fileTwo = ssArray[i][0][1];
              /*
              var table_data = '<table class="table table-bordered table-striped table-hover" name="table1" id="table1"><tr><th>Inputs:</th></tr><tr><td colspan="4">'; 
              //var inputsOutput = "test";
              var inputsOutput = "Antes: " + antes + " " + "Position: " + position + " " + "Effective BBs: " + effectiveBbs + " " + "Payounts: " + icmCev + "file1: " + ssArray[i][0][0] + "  file2: " + ssArray[i][0][1];
              table_data += inputsOutput;
              table_data += '</td></tr></table>';
              $('#input_table').html(table_data);
              */                                                         
        }
       }
  //}

 // function getRanges(fileOne, fileTwo, antes, position, effectiveBbs, icmCev) {
  //var antes = $('#formSelectorantes').val();
  //var position = $('#formSelectorposition').val();
  //var effectiveBbs = $('#formSelectoreffectiveBbs').val();
  //var icmCev = $('#formSelectoricmCev').val();

 // fs.readFile(fileOne, 'utf8', function(error, data){
  //  console.log(data);
 // });

   var data = fs.readFileSync(fileOne, 'utf8');
  // globally declared in order take out seperating functions
  var minR = '';
  var threebet  = '';
  var callthreebet = '';
  var shoveParam = '';
  var callrangeParam = '';
  
  var urlTempone = fileOne;
  var urlTemptwo = fileTwo;
      
      var output_data = data.split(/\r?\n|\r/);
      var table_data = '<table class="table table-bordered table-striped table-hover" name="table2" id="table2"><tr><td>Min Raise Range: </td></tr><tr><td colspan="4">'; 
      table_data += output_data[0];
                            
        //toggles
        var bbsToggle = effectiveBbs;
        var positionToggle = position;
                
        //value initializations
        var bbComparision = 20;
        var arrPositioncomparision = [3, 2, 1, 0, "sb"];
        var maxSeats = 6;
        maxSeats = maxSeats -= 1;
        var nextBbamount = 35;
      
      var minRaiserange = 0;
            
      //first two elements are the line the range starts and ends, 3rd element is the difference
      //ie number of ranges to output
      var threeBetRanges = [2, 6, 6];
      var callThreebetrange = [7, 11, 6];
      
        var rangeValueFirst = 11;
          //testing ^^ was 6
        var rangeValueSecond = 10;
        // ^^ was 5
      
      var tempbbComparision = bbComparision; 

      for (i = 0; i < bbComparision; i++){
        
        if (bbsToggle == tempbbComparision){
        
        for (k = 0; k < maxSeats; k++){
        
           // if matching seat is found output the values and break the for loop
           if (positionToggle == arrPositioncomparision[k]) {
               
             var TempTwo = output_data[minRaiserange];
             //ss.getRange(minraiseOutput).setValue(TempTwo); 
             
             var Temp = [];
             var forCounter = threeBetRanges[0];
             for (j = 0; j < threeBetRanges[2]; j++)
            {
                Temp[j] = output_data[forCounter];
                forCounter += 1;
            }
             
             //ss.getRange(threebetOutput).setValues(Temp);
             
             var tempThree = [];
             var forCounter = callThreebetrange[0];
             //ss.getRange(callThreebetoutput).setValues(tempThree); 
            for (m = 0; m < callThreebetrange[2]; m++)
            {
                tempThree[m] = output_data[forCounter]; 
                forCounter += 1;
            }
             
            //tempThree = ["asdfsdf", "asdfsdf", "sdfsdf"];    

            //printRanges(TempTwo, Temp, tempThree);
             //insteadn of print ranges function assign to global variables
             minR = TempTwo;
             threebet = Temp;
             callthreebet = tempThree;

             //break after outputing values
             k = maxSeats;
             i = bbComparision;
          } 
          // else increment 
             
            //increment input ranges
            minRaiserange += rangeValueFirst;
            threeBetRanges[0] += rangeValueFirst;
            threeBetRanges[1] += rangeValueSecond;
            threeBetRanges[2] = threeBetRanges[1] - threeBetRanges[0] + 1;
            
            callThreebetrange[0] += rangeValueFirst;
            callThreebetrange[1] += rangeValueSecond;
            callThreebetrange[2] = callThreebetrange[1] - callThreebetrange[0] + 1;
            
            //update output ranges
            //threebetOutput[0] += incrementRangevariable(threebetOutput, 0, 1);
            //callThreebetoutput += incrementRangevariable(callThreebetoutput, 0, 1);
            
            //decrement values 
            rangeValueFirst -= 2;
            rangeValueSecond -= 2;  

        }    
        
        // break for loop
         i = bbComparision;
        }
        
        //decrement bb counter, increment input search space
        tempbbComparision -= 1;     
        minRaiserange += nextBbamount;
        threeBetRanges[0] += nextBbamount;
        threeBetRanges[1] += nextBbamount;
        threeBetRanges[2] = threeBetRanges[1] - threeBetRanges[0] + 1;
        
        callThreebetrange[0] += nextBbamount;
        callThreebetrange[1] += nextBbamount;
        callThreebetrange[2] = callThreebetrange[1] - callThreebetrange[0] + 1;
      }               
                 
  //get shove range
   // fs.readFile(fileTwo, 'utf8', function(error, data){
  //  console.log(data);
 // });
 var data = fs.readFileSync(fileTwo, 'utf8');

      var output_data = data.split(/\r?\n|\r/);
      var table_data = '<table class="table table-bordered table-striped table-hover" name="table2" id="table2"><tr><td>Min Raise Range: </td></tr><tr><td colspan="4">'; 
      table_data += output_data[0];
                            
        //toggles
        var bbsToggle = effectiveBbs;
        var positionToggle = position;
                
        //value initializations
        var bbComparision = 20;
        var arrPositioncomparision = [3, 2, 1, 0, "sb"];
        var maxSeats = 6;
        maxSeats = maxSeats -= 1;
        var nextBbamount = 20;
      
      var shoveRange = 0;
            
      //first two elements are the line the range starts and ends, 3rd element is the difference
      //ie number of ranges to output
      var callRanges = [2, 6, 6];     
      
        var rangeValueFirst = 6;
          //testing ^^ was 6
        var rangeValueSecond = 5;
        // ^^ was 5
      
      var tempbbComparision = bbComparision; 

      for (i = 0; i < bbComparision; i++){
        
        if (bbsToggle == tempbbComparision){
        
        for (k = 0; k < maxSeats; k++){
        
           // if matching seat is found output the values and break the for loop
           if (positionToggle == arrPositioncomparision[k]) {
               
             var TempTwo = output_data[shoveRange];
             //ss.getRange(minraiseOutput).setValue(TempTwo); 
             
             var Temp = [];
             var forCounter = callRanges[0];
             for (j = 0; j < callRanges[2]; j++)
            {
                Temp[j] = output_data[forCounter];
                forCounter += 1;
            }         
              //TempTwo = "tested";
            //tempThree = ["asdfsdf", "asdfsdf", "sdfsdf"];
            
            //removed function and use global variables
            //printShovecalls(TempTwo, Temp);
            shoveParam = TempTwo;
             callrangeParam = Temp;
             //break after outputing values
             k = maxSeats;
             i = bbComparision;
          } 
          // else increment 
             
            //increment input ranges
            shoveRange += rangeValueFirst;
            callRanges[0] += rangeValueFirst;
            callRanges[1] += rangeValueSecond;
            callRanges[2] = callRanges[1] - callRanges[0];
                                            
            //decrement values 
            rangeValueFirst -= 1;
            rangeValueSecond -= 1;  
        }           
        // break for loop
         i = bbComparision;
        }       
        //decrement bb counter, increment input search space
        tempbbComparision -= 1;     
        shoveRange += nextBbamount;
        callRanges[0] += nextBbamount;
        callRanges[1] += nextBbamount;
        callRanges[2] = callRanges[1] - callRanges[0];            
      }   

 // printRanges(minR, threebet, callthreebet, shoveParam, callrangeParam);   
//}

//function printRanges(minR, threebet, callthreebet, shoveParam, callrangeParam){
  //var threebettest = threebet;
  
  var table_data = '<table class="table table-bordered table-striped table-hover" name="table2" id="table2"><tr><th>Min Raise: </th></tr><tr><td colspan="4">';
  table_data += minR;
  table_data += '</td></tr></table>';   
  //$('#minraise_table').html(table_data); 
  var table_data_one = table_data;
  
  var table_data = '<table class="table table-bordered table-striped"><tr><th>3 Bet Shove: </th></tr>';
  for(var count = 0; count < threebet.length; count ++)
  {                       
    table_data += '<tr><td>';
    table_data += threebet[count];
    table_data += '</td></tr>';
  }
    table_data += '</table>';
   // $('#output_table2').html(table_data);
    var table_data_two = table_data;

  var table_data = '<table class="table table-bordered table-striped"><tr><th>Call vs. 3 Bet: </th></tr>';
  for(var count = 0; count < callthreebet.length; count ++)
  {                       
    table_data += '<tr><td>';
    table_data += callthreebet[count];
    table_data += '</td></tr>';
  }
    table_data += '</table>';
  // $('#output_table3').html(table_data);
  var table_data_three = table_data;
                   
  //print shove range
  //shoveParam = "test";
  var table_data = '<table class="table table-bordered table-striped table-hover" name="table3" id="table3"><tr><th>Shove: </th></tr><tr><td colspan="4">';
  table_data += shoveParam;
  table_data += '</td></tr></table>';   
  //$('#shove_table').html(table_data); 
  var table_data_four = table_data;
  
  //print call range
  var table_data = '<table class="table table-bordered table-striped"><tr><th>Call Ranges: </th></tr>';
  for(var count = 0; count < callrangeParam.length; count ++)
  {                       
    table_data += '<tr><td>';
    table_data += callrangeParam[count];
    table_data += '</td></tr>';
  }
    table_data += '</table>';
    //$('#output_table1').html(table_data);
  var table_data_five = table_data;

 console.log('Output tables');

 //return('{table_data_one:' + '"' + table_data_one + '"' + ', table_data_two:' + '"' + table_data_two + '"' + ', table_data_three:' + '"' + table_data_three + '"' + ', table_data_four:' + '"' + table_data_four + '"' + ', table_data_five:' + '"' + table_data_five + '"}');
  return(table_data_one + table_data_two + table_data_three + table_data_four + table_data_five);

}

//res.render('index', {table_data_one: table_data_one, table_data_two: table_data_two, table_data_three: table_data_three, table_data_four: table_data_four, table_data_five: table_data_five});

module.exports = router;
