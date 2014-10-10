var TTTApp = angular.module('TTTApp', []);

TTTApp.controller('TTTController', function ($scope) {

  $scope.testString = "Angular source, App, and Controller present" ;

  //  Create something to store the status of the cells:
  $scope.cellList = [
  {status: 0, clickNumber: 0, value: 1},
  {status: 1, clickNumber: 0, value: 2},
  {status: 2, clickNumber: 0, value: 4},
  {status: 3, clickNumber: 0, value: 8},
  {status: 4, clickNumber: 0, value: 16},
  {status: 5, clickNumber: 0, value: 32},
  {status: 6, clickNumber: 0, value: 64},
  {status: 7, clickNumber: 0, value: 128},
  {status: 8, clickNumber: 0, value: 256}
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

  // Binary sums for win
  $scope.wins = [7, 56, 448, 73, 146, 292, 273, 84]; 
});