(function(angular){
	var app = angular.module('app', []);
	
	app.controller('form-controller', function($scope) {
		$scope.formData = [];

		$scope.notifications = [{sender:'John', text:'text from john', context: "home"},
			{sender:'Mary', text:'text from mary', context: "home"},
			{sender:'Mike', text:'text from mike', context: "home"},
			{sender:'Adam', text:'text from adam', context: "home"},
			{sender:'Julie', text:'text from julie', context: "home"},
			{sender:'Juliette', text:'text from juliette', context: "home"},
			{sender:'Mary', text:'text from mary', context: "work"},
			{sender:'Mike', text:'text from mike', context: "work"},
			{sender:'Adam', text:'text from adam', context: "work"},
			{sender:'Julie', text:'text from julie', context: "work"},
			{sender:'Juliette', text:'text from juliette', context: "work"},
			{sender:'Mary', text:'text from mary', context: "street"},
			{sender:'Mike', text:'text from mike', context: "street"},
			{sender:'Adam', text:'text from adam', context: "street"},
			{sender:'Julie', text:'text from julie', context: "street"},
			{sender:'Juliette', text:'text from juliette', context: "street"},
			{sender:'Mary', text:'text from mary', context: "busy"},
			{sender:'Mike', text:'text from mike', context: "busy"},
			{sender:'Adam', text:'text from adam', context: "busy"},
			{sender:'Julie', text:'text from julie', context: "busy"},
			{sender:'Juliette', text:'text from juliette', context: "busy"}
		];
		
		$scope.search = 'home';

		$scope.$watch('search', function(){
			$scope.formData.push($scope.search);
		});
		
		$scope.submitform = function() {
			$scope.formData.push($scope.search);
		}
	});
} (angular));