(function(angular){
	var app = angular.module('app', []);
	
	.controller('form-controller', function($scope) {
		$scope.formData = [];
		
		$scope.myInput = 'sup?';
		$scope.$watch('myInput', function(){
			$scope.formData.push($scope.myInput);
		}
		
		$scope.submitform = function() {
			$scope.formData.push($scope.myInput);
		}
	});
} (angular));