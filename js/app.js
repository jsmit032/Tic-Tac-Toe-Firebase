var TTTApp = angular.module('TTTApp', []);

var scopeThing;

TTTApp.controller('TTTController', function ($scope) {
  scopeThing = $scope;

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

  // array of player and function to insert player's name
  // from input field, limits to two players.
  // also assigns a score property to each player
  $scope.players = [];

  $scope.addInput = function() {
    if($scope.players.length >= 2)
    {
      console.log("You've reached the player limit")
    } else {
      $scope.players.push({name: $scope.playerName, score: 0});
    }
  }; // end of add Input function

  // Clears the score and move count, 
  // erases the board, and makes it X's turn
  $scope.startNewGame = function () {
    $scope.turn = "X"; // a way to change who goes first
    $scope.movecounter = 0;
    //refresh page in here???
  };

  // Binary sums for win
  $scope.wins = [7, 56, 448, 73, 146, 292, 273, 84]; 

  // Returns whether the given score is a winning score.
  $scope.win = function () {
    for (var i = 0; i < $scope.wins.length; i += 1) {
      if (($scope.wins[i] & $scope.score) == $scope.wins[i]) {
        return true;
      } 
    }
    return false;
  };

  $scope.movecounter = 0;

  $scope.testJS = function() {
    console.log('Correctly accessing JS function.') ;
  } ;

  // function that enables player to pick a square that turn
  // cell to X or O based on the movecounter
  // won't allow a cell to change if clicked on more than once

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

}); //end of TTTApp module