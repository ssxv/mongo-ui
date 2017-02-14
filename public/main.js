var gridapp = angular.module("demouigridAppex", ["ui.grid" , "ui.grid.edit", "ui.grid.selection"]);

gridapp.controller("demouigridCtrlexample", ['$scope','$http',function ($scope, $http) {

	$scope.columns = []; 
	
	var customMenuItems = [
	{
		title: 'Delete Field',
		action: function($event) {
			alert(this.context.col.displayName);
		}
	}];	
	 
	$scope.nggridOptionsdemo = {
		showGridFooter: true,
		enableFiltering: true,
		columnDefs: $scope.columns,
		onRegisterApi: function (demogridApiexample) {
		$scope.grid1Api = demogridApiexample;
	}};
	
	$http.get("http://localhost:3001/fetch")
    .then(function(response) {
		$scope.nggridOptionsdemo.data = angular.fromJson(response.data);
		var keys = Object.keys($scope.nggridOptionsdemo.data[0]);
		for(var i=1;i<keys.length;i++){
			var newfield = {};
			newfield['field'] = keys[i];
			newfield['enableHiding'] = false;
			//newfield['menuItems'] = customMenuItems;
			$scope.columns.push(newfield);
		}
		//console.log(data);
    });
	
	$scope.saveToDatabase = function(){
		//console.log($scope.nggridOptionsdemo.data);
		$http.post("http://localhost:3001/save", $scope.nggridOptionsdemo.data)
		.success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        });
	}
	
	$scope.addField = function() {
		var newfield = {};
		newfield['field'] = $scope.fieldname;
		$scope.columns.push(newfield);
		$scope.fieldname = '';
	}
	
	$scope.addRecord = function() {
		$scope.nggridOptionsdemo.data.push({});
	}
 
}]);