 function getInputs(){
 
 //$(document).ready(function(){
 //       $('#load_data').click(function(){
			var antes = $('#formSelectorantes').val();
			var position = $('#formSelectorposition').val();
			var effectiveBbs = $('#formSelectoreffectiveBbs').val();
			var icmCev = $('#formSelectoricmCev').val();
			//var minRaiserange = "-";
			var shoveRange = "-";
			
			var ssArray = [[["minRaisenoantescev.csv", "shoveNoantescev.csv"], ["NocEV"]], [["minRaiseantescev.csv","shoveAntescev.csv"], ["YescEV"]], [["minRaisenoantesICM.csv", "shovenoantesICM.csv"], ["NoICM"]], [["minRaiseantesICM.csv", "shoveantesICM.csv"], ["YesICM"]]];
 
			// get inputs: antes, icm/cev  
			var userInputs = antes + icmCev;
			  
			 //match inputs to corresponding sheet call parse/output function
			 for (i = 0; i < ssArray.length; i++) {
				if (ssArray[i][1][0] === userInputs) {
					
					getRanges(ssArray[i][0][0], ssArray[i][0][1]);	 
					
							var table_data = '<table class="table table-bordered table-striped table-hover" name="table1" id="table1"><tr><th>Inputs:</th></tr><tr><td colspan="4">';	
							//var inputsOutput = "test";
							var inputsOutput = "Antes: " + antes + " " + "Position: " + position + " " + "Effective BBs: " + effectiveBbs + " " + "Payounts: " + icmCev + "file1: " + ssArray[i][0][0] + "  file2: " + ssArray[i][0][1];
							table_data += inputsOutput;
							table_data += '</td></tr></table>';
							$('#input_table').html(table_data);													  															
				}
			 }
}
