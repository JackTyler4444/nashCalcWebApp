function getRanges(fileOne, fileTwo) {
	var antes = $('#formSelectorantes').val();
	var position = $('#formSelectorposition').val();
	var effectiveBbs = $('#formSelectoreffectiveBbs').val();
	var icmCev = $('#formSelectoricmCev').val();
	
	var urlTempone = fileOne;
	var urlTemptwo = fileTwo;
			
	//get min raise range
	$.ajax({
		url:urlTempone,
		dataType:"text",
		success:function(data)
		{
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
						printRanges(TempTwo, Temp, tempThree);
					   
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
	}
});											
	//get shove range
	$.ajax({
		url:urlTemptwo,
		dataType:"text",
		success:function(data)
		{
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
						printShovecalls(TempTwo, Temp);
					   
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
		}   
	});			
}

function printRanges(minR, threebet, callthreebet){
	//var threebettest = threebet;
	
	var table_data = '<table class="table table-bordered table-striped table-hover" name="table2" id="table2"><tr><th>Min Raise: </th></tr><tr><td colspan="4">';
	table_data += minR;
	table_data += '</td></tr></table>';		
	$('#minraise_table').html(table_data);	
	
	var table_data = '<table class="table table-bordered table-striped"><tr><th>3 Bet Shove: </th></tr>';
	for(var count = 0; count < threebet.length; count ++)
	{                       
		table_data += '<tr><td>';
		table_data += threebet[count];
		table_data += '</td></tr>';
	}
		table_data += '</table>';
		$('#output_table2').html(table_data);
		
	var table_data = '<table class="table table-bordered table-striped"><tr><th>Call vs. 3 Bet: </th></tr>';
	for(var count = 0; count < callthreebet.length; count ++)
	{                       
		table_data += '<tr><td>';
		table_data += callthreebet[count];
		table_data += '</td></tr>';
	}
		table_data += '</table>';
		$('#output_table3').html(table_data);
                   
}

function printShovecalls(shoveParam, callrangeParam){
	
	//print shove range
	//shoveParam = "test";
	var table_data = '<table class="table table-bordered table-striped table-hover" name="table3" id="table3"><tr><th>Shove: </th></tr><tr><td colspan="4">';
	table_data += shoveParam;
	table_data += '</td></tr></table>';		
	$('#shove_table').html(table_data);	
	
	//print call range
	var table_data = '<table class="table table-bordered table-striped"><tr><th>Call Ranges: </th></tr>';
	for(var count = 0; count < callrangeParam.length; count ++)
	{                       
		table_data += '<tr><td>';
		table_data += callrangeParam[count];
		table_data += '</td></tr>';
	}
		table_data += '</table>';
		$('#output_table1').html(table_data);
	
}
