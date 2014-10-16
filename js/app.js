var TTTApp = angular.module('TTTApp', ['firebase']);

var scopeThing,
    userErrors = [],
    gameInProgress = true,
    players = [],
    namePlaceholders = ["name of player", "player 2 name"];

TTTApp.controller('TTTController', function ($scope, $firebase) {
  $scope.remoteGameContainer = $firebase(new Firebase("https://jen-tic-tac-toe.firebaseio.com/databaseGameContainer"));
  scopeThing = $scope;

  $scope.testString = "Angular source, App, and Controller present" ;

  //List of user errors
  userErrors = [
      {
          name: 'Too Few Players',
          message: 'Name of two players is required!',
          occurred: false
      },
      {
          name: 'Already Clicked!',
          message: 'Please selected another square!',
          occurred: false
      },
      {
          name: 'Game Over',
          message: 'Game Over! Please start a new game.',
          occurred: false
      }
  ]; //end of user error messages

    $scope.moveCount = 0;

  //  Create something to store the status of the cells:
  $scope.boardArray = [
      {status: "null", clickNumber: 0, value: 1},
      {status: "null", clickNumber: 0, value: 2},
      {status: "null", clickNumber: 0, value: 4},
      {status: "null", clickNumber: 0, value: 8},
      {status: "null", clickNumber: 0, value: 16},
      {status: "null", clickNumber: 0, value: 32},
      {status: "null", clickNumber: 0, value: 64},
      {status: "null", clickNumber: 0, value: 128},
      {status: "null", clickNumber: 0, value: 256}
  ];// end of cell storage
    
    // This container object is what gets synced:
    // Doesn't contain anything other player doesn't need to see


    //The bind statement creates a connection between anything in your app and the firebase connection we just created

    $scope.remoteGameContainer.$bind($scope, "gameContainer");

    // the watch statement tells Angular to refresh the interface of elements, ie ng-class,
    // whenever the model, in this case the Board, changes

    $scope.$watch('gameContainer', function() {
        console.log('gameContainer changed!');
    });

    // array of player and function to insert player's name
    // from input field, limits to two players.
    // also assigns a score property to each player
    $scope.namePlaceholder = namePlaceholders[0];

    $scope.addInput = function() {
        if(players.length >= 2) {
            console.log("You've reached the player limit");
            userErrors[0].occurred = false;
        } else {
            players.push({name: $scope.playerName, score: 0, wins: 0});
            namePlaceholder = namePlaceholders[players.length & 1];
            $scope.playerName = "";
        }
    }; // end of add Input function

  // Clears the score and move count,
  // erases the board, and makes it X's turn
  $scope.startNewGame = function () {
      $scope.moveCounter = 0;
      gameInProgress = true;
      userErrors[2].occurred = false;
      for (var i = 0; i < $scope.boardArray.length; i++) {
          $scope.boardArray[i].status = "null";
          $scope.boardArray[i].clickNumber = 0;
      } // clear board
      for (var i = 0; i < players.length; i++) {
          players[i].score = 0;
      }

     // Testing to console
      console.log("connected ");
      console.log("move counter: " + $scope.moveCount);
      console.log("status is: " + $scope.boardArray.status);
      console.log("score is: " + players.score);
      console.log("Game in Progress? " + gameInProgress);
  };

  // can this be inherited from the start New Game???
  $scope.restartGame = function () {
      gameInProgress = true;
      userErrors[2].occurred = false;
      $scope.moveCount = 0;
      for (var i = 0; i < $scope.boardArray.length; i++) {
          $scope.boardArray[i].status = "null";
          $scope.boardArray[i].clickNumber = 0;
      } // clear board
  };

  // Binary sums for win
  var winNums = [7, 56, 448, 73, 146, 292, 273, 84]; 

  // Returns whether the given score is a winning score.
  $scope.win = function (score) {
    for (var i = 0; i < winNums.length; i++) {
        if ((winNums[i] & score) == winNums[i]) {
            return true;
        }
    }
    return false;
  };

  $scope.testJS = function() {
    console.log('Correctly accessing JS function.') ;
  };

    // Stops game by making all clickNumbers = 1, however
    // error message displays to player as asking to click another
    // square instead of game over.
    $scope.gameOver = function() {
        if (gameInProgress == false) {
            userErrors[2].occurred = true;
            userErrors[1].occurred = false;
        }
    };

  // function that enables player to pick a square that turn
  // cell to X or O based on the moveCount
  // won't allow a cell to change if clicked on more than once

  $scope.playerPicks = function(thisCell) {
    if (players.length != 2) {
        userErrors[0].occurred = true;
    } else { 
      var turn = players[$scope.moveCount % 2];

      if ( thisCell.clickNumber == 1 ) {
        userErrors[1].occurred = true;
      } else if (thisCell.clickNumber == 0 && gameInProgress == false) {
          //  keeps an ended game from allowing gameContainer.playerID to click on cells
      } else { //If cell not already clicked, runs else statement
          $scope.moveCount++; //tracks moves to determine turn
          console.log('Cell was: ' + thisCell.status);

          thisCell.clickNumber++;
          if (($scope.moveCount % 2) == 1) {
              thisCell.status = "X";
              userErrors[1].occurred = false;
          } else {
              thisCell.status = "O";
              userErrors[1].occurred = false;
          }

          turn.score += thisCell.value;
          alert("turn: " + turn.name);

          if ($scope.win(turn.score)) {
              turn.wins++;
              gameInProgress = false;
              $scope.gameOver();
              alert(turn.name + " wins!\nwins: " + turn.wins);
          } else if ($scope.moveCount == 9) {
              alert("Cat Game!");
              gameInProgress = false;
              $scope.gameOver();
          }

          //Testing to console, upon clicks to cells
          console.log("Cell is now: " + thisCell.status);
          console.log("Click Number: " + thisCell.clickNumber);
          console.log("name: " + turn.name + "Score: " + turn.score);
          console.log("Game in Progress? " + gameInProgress);
        }
      }
  }; // end of playerPicks()

}); //end of TTTApp module