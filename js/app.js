var TTTApp = angular.module('TTTApp', ['firebase']);

TTTApp.controller('TTTController', function ($scope, $firebase) {
    $scope.remoteGameContainer = $firebase(new Firebase("https://jen-tic-tac-toe.firebaseio.com"));

    $scope.testString = "Angular source, App, and Controller present" ;

    $scope.gameInProgress = true;

    // List of players
    $scope.players = false;

    $scope.namePlaceholders = ["name of player", "player 2 name"];

    //List of user errors
    $scope.userErrors = [
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

    //$scope.remoteGameContainer.moveCount = 0;
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
    $scope.gameContainer = {
        board: $scope.boardArray,
        gamePlay: $scope.gameInProgress,
        Errors: $scope.userErrors,
        moverCounter: $scope.moveCount,
        playerID: $scope.players,
        proxy: $scope.namePlaceholders
    };

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
    $scope.namePlaceholder = $scope.gameContainer.proxy[0];

    $scope.addInput = function() {
        if ($scope.gameContainer.playerID == false) {
            $scope.gameContainer.playerID = new Array();
            $scope.gameContainer.playerID.push({name: $scope.playerName, score: 0, wins: 0});
        } else if ($scope.gameContainer.playerID != false ) {
            $scope.gameContainer.playerID.push({name: $scope.playerName, score: 0, wins: 0});
            $scope.gameContainer.Errors[0].occurred = false;
        }

        $scope.namePlaceholder = $scope.gameContainer.proxy[1];
        $scope.playerName = "";
        };// end of add Input function

    // Clears the score and move count,
    // erases the board, and makes it X's turn
    $scope.startNewGame = function () {
        $scope.gameContainer.moverCounter = 0;
        $scope.gameContainer.gamePlay = true;
        $scope.gameContainer.Errors[2].occurred = false;
        for (var i = 0; i < $scope.gameContainer.board.length; i++) {
            $scope.gameContainer.board[i].status = "null";
            $scope.gameContainer.board[i].clickNumber = 0;
        } // clear board
        for (var i = 0; i < ($scope.gameContainer.playerID).length; i++) {
            ($scope.gameContainer.playerID)[i].score = 0;
        }

        // Testing to console
        console.log("connected ");
        console.log("move counter: " + $scope.gameContainer.moverCounter);
        console.log("status is: " + $scope.gameContainer.board.status);
        console.log("score is: " + ($scope.gameContainer.playerID).score);
        console.log("Game in Progress? " + $scope.gameContainer.gamePlay);
    };

    // can this be inherited from the start New Game???
    $scope.restartGame = function () {
        $scope.namePlaceholder = $scope.gameContainer.proxy[0];
        $scope.gameContainer.playerID = false;
        $scope.gameContainer.gamePlay = true;
        $scope.gameContainer.Errors[2].occurred = false;
        $scope.gameContainer.moverCounter = 0;
        for (var i = 0; i < $scope.gameContainer.board.length; i++) {
            $scope.gameContainer.board[i].status = "null";
            $scope.gameContainer.board[i].clickNumber = 0;
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
        if ($scope.gameContainer.gamePlay == false) {
            $scope.gameContainer.Errors[2].occurred = true;
            $scope.gameContainer.Errors[1].occurred = false;
        }
    };

    // function that enables player to pick a square that turn
    // cell to X or O based on the moveCount
    // won't allow a cell to change if clicked on more than once

    $scope.playerPicks = function(thisCell) {
        if (($scope.gameContainer.playerID).length != 2) {
            // Shows Error if not Enough players are entered in game
            $scope.gameContainer.Errors[0].occurred = true;
        } else {
            // if cell already clicked and gamePlay is true, Error Already Clicked occurs

            if ( thisCell.clickNumber == 1 && $scope.gameContainer.gamePlay ) {
                $scope.gameContainer.Errors[1].occurred = true;
            } else {
                var turn = $scope.gameContainer.playerID[$scope.gameContainer.moverCounter % 2];

                // if clicked cell equals 0 and game not in progress then gameOver() occurs
                //user Error already clicked also is set to false, since game is Over
                if ((thisCell.clickNumber == 0 || 1) && !$scope.gameContainer.gamePlay) {
                    $scope.gameOver();
                    console.log("GAME OVER: " + $scope.gameContainer.Errors[1].name + " occurred ?: " + $scope.gameContainer.Errors[1].occurred);
                } else {
                    // else if clickNumber doesn't equal 0 and game is in progress
                    //then players can select squares until there's
                    // a winner of cat game
                    $scope.gameContainer.moverCounter++;
                    console.log('Cell was: ' + thisCell.status);

                    thisCell.clickNumber++;
                    if (($scope.gameContainer.moverCounter % 2) == 1) {
                        thisCell.status = "X";
                        $scope.gameContainer.Errors[1].occurred = false;
                    } else {
                        thisCell.status = "O";
                        $scope.gameContainer.Errors[1].occurred = false;
                    }

                    turn.score += thisCell.value;
                    alert("turn: " + turn.name);

                    if ($scope.win(turn.score)) {
                        turn.wins++;
                        $scope.gameContainer.gamePlay = false;
                        $scope.gameOver();
                        alert(turn.name + " wins!\nwins: " + turn.wins);
                    } else if ($scope.gameContainer.moverCounter == 9) {
                        alert("Cat Game!");
                        $scope.gameContainer.gamePlay = false;
                        $scope.gameOver();
                    }
                    //Testing to console, upon clicks to cells
                    console.log("Cell is now: " + thisCell.status);
                    console.log("Click Number: " + thisCell.clickNumber);
                    console.log("name: " + turn.name + "Score: " + turn.score);
                    console.log("Game in Progress? " + $scope.gameContainer.gamePlay);
                } //end else statement if clickNumber != 0 or 1 and game isn't in progress
            } // end else statement for game in progress
        } // end else statement testing for number of players
    }; // end of playerPicks()

}); //end of TTTApp module