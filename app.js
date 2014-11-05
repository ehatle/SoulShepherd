(function(angular){
	var app = angular.module('app', []);
	
	app.controller('form-controller', function($scope) {
		$scope.formData = [];

		$scope.notifications = [];
		
		var num = 100;
		var names = ['Dad', 'Mom', 'John', 'Mary', 'Mike', 'Adam', 'Julie', 'Juliette', 'Jack', 'Ola', 'Sarah', 'Josh', 'Kim', 'Tim', 'Lena', 'Bastien', 'Jean-Charles', 'Jun', 'Emil'];
		var apps = ['Facebook', 'SMS', 'SnapChat', 'e-mail', 'Call', 'Calendar', 'Game'];
		var contexts = ['home', 'work', 'street', 'busy'];
		function rndNum(seed) {
			return Math.floor(Math.random()*seed);
		}
		function rndNot() {
			var sender = apps[rndNum(apps.length)];
			var val = names[rndNum(names.length)];
			var context = contexts.slice(0);
			switch(sender){
				case 'Facebook':
					context.splice(context.indexOf('work'), 1);
					context.splice(context.indexOf('busy'), 1);
					context.splice(context.indexOf('street'), 1);
					break;
				case 'SMS':
					context.splice(context.indexOf('busy'), 1);
					break;
				case 'SnapChat':
					context.splice(context.indexOf('work'), 1);
					context.splice(context.indexOf('busy'), 1);
					context.splice(context.indexOf('street'), 1);
					break;
				case 'e-mail':
					context.splice(context.indexOf('home'), 1);
					context.splice(context.indexOf('street'), 1);
					break;
				case 'Call':
					context.splice(context.indexOf('busy'), 1);
					break;
				case 'Calendar':
					context.splice(context.indexOf('work'), 1);
					context.splice(context.indexOf('busy'), 1);
					break;
				case 'Game':
					context.splice(context.indexOf('work'), 1);
					context.splice(context.indexOf('busy'), 1);
					context.splice(context.indexOf('street'), 1);
					break;
			}
			return {sender: sender, text:'Notification from ' + val, context: context};
		}
		for (i = 0; i < num; i++){
			$scope.notifications.push(rndNot());
		}
		
		$scope.search = 'home';

		$scope.$watch('search', function(){
			$scope.formData.push($scope.search);
		});
		
		$scope.submitform = function() {
			$scope.formData.push($scope.search);
		}
	});
} (angular));