var TTTApp = angular.module('TTTApp', []);

TTTApp.controller('TTTController', function ($scope) {

  $scope.testString = "Angular source, App, and Controller present" ;

  //  Create something to store the status of the cells:
  $scope.cellList = [
  {status: "A", clickNumber: 0},
  {status: "B", clickNumber: 0},
  {status: "C", clickNumber: 0},
  {status: "D", clickNumber: 0},
  {status: "E", clickNumber: 0},
  {status: "F", clickNumber: 0},
  {status: "G", clickNumber: 0},
  {status: "H", clickNumber: 0},
  {status: "I", clickNumber: 0}
  ];
  // end of cell storage

  $scope.players = [];

  $scope.addInput = function() {
    $scope.players.push({name: $scope.playerName});
    if ($scope.players.length == 2) {
      $scope.playerlimit = true;
      console.log("reach limit of players");
    }
  }

  $scope.movecounter = 0;

  $scope.testJS = function() {
    console.log('Correctly accessing JS function.') ;
  } ;

  $scope.playerPicks = function(thisCell) {
    if (thisCell.clickNumber == 1) {
      return;
    } else {
  	$scope.movecounter = $scope.movecounter + 1;
    console.log('Cell was: ' + thisCell.status);
    if (($scope.movecounter % 2) == 1) {
    	thisCell.status = "X";
      thisCell.clickNumber = thisCell.clickNumber + 1;
    } else {
    	thisCell.status = "O";
      thisCell.clickNumber = thisCell.clickNumber + 1;
    }
    console.log("Cell is now: " + thisCell.status);
    console.log(thisCell.clickNumber);
    }
  };
});