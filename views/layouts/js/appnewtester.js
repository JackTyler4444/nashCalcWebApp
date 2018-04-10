

$(document).ready(function(){
        //$('#load_data').click(function(){
			//loaded();
			
 			console.log('attempting ajax');
 			/*
			$.ajax({
			    url: 'auth/:MetaAddress',
			    //data: {"testidone": "test1","testidtwo":"testtwo"},
			    success: function(response) {
			        //Do Something
			        console.log('jquery reponse success');
			    },
			    error: function(xhr) {
			        //Do Something to handle error
			        console.log('jquery reponse error');
			    }
			});
*/
			var url = 'loalhost:3000/auth/:MetaAddress';
			var data = {test: 'data'};
			var datatype = 'json';

			function success(response) {
			// do something here 
			}

			//$.get(url, data, success, datatype);
			//$.get('localhost:3000/auth/:MetaAddress');

			//console.log('finshed get attempt');
			getInputs();
		//});
});		