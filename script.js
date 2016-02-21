var app = angular.module("app", []);
app.controller("mainCtrl", mainCtrl); 

function mainCtrl ($scope) {
	$scope.logs = []; 
	$scope.submitNew = function (newText) {
		//$scope.logs = [];
		$scope.logs.push({
			userText: newText.submission, 
			type: 0 
			});
		console.log(newText.submission);
		//might want to generate a unique id each time, so that we aren't all the same speaker
		//have them submit name and age or something and then I can use that as the key  
		var urlCall = 'http://www.personalityforge.com/api/chat/?apiKey=OGolx9hVeyDkEkW5&chatBotID=2&message=' + newText.submission + '&externalID=abc-639184572'; 
		var api_call = $.ajax({
			url: urlCall,  
			type: 'GET', 
			dataType: 'json'
		});
		api_call.done(function(response) {
			$scope.$apply(function() { //This tells angular to run the function and then check for changes in the scope, otherwise it won't know that it needs to update since this is being done through a jquery call 
			if (response.success) {
				//Successful response 
				var textResponse = response.message.message; 
				console.log(textResponse);
				//$("<h1>" + textResponse + "</h1>").appendTo(".jumbotron"); 
				$scope.logs.push({
					userText: textResponse,
					type: 1
				});
				 
				 
			} else {
				//Unsuccessful, show error
				console.log("ERROR"); 
			}
			})
		})
		
		//In case the actual API call fails 
		api_call.fail(function(jqXHR, textStatus) {
			console.log(jqXHR);
			console.log(textStatus);
		});  
	};
}
