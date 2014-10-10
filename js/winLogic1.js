// Basic Win Logic... How to simplify? Use loops???

if ($scope.cellList[0].status == "X" && 
    $scope.cellList[1].status == "X" &&
    $scope.cellList[2].status == "X" ) {
    $scope.notification = "X Wins!"; 
}

if ($scope.cellList[3].status == "X" && 
    $scope.cellList[4].status == "X" &&
    $scope.cellList[5].status == "X" ) {
    console.log("hello");
    $scope.notification = "X Wins!"; 
}

if ($scope.cellList[6].status == "X" && 
    $scope.cellList[7].status == "X" &&
    $scope.cellList[8].status == "X" ) {
    console.log("hello");
    $scope.notification = "X Wins!"; 
}

if ($scope.cellList[0].status == "X" && 
    $scope.cellList[3].status == "X" &&
    $scope.cellList[6].status == "X" ) {
    console.log("hello");
    $scope.notification = "X Wins!"; 
}

if ($scope.cellList[1].status == "X" && 
    $scope.cellList[4].status == "X" &&
    $scope.cellList[7].status == "X" ) {
    console.log("hello");
    $scope.notification = "X Wins!"; 
}

if ($scope.cellList[2].status == "X" && 
    $scope.cellList[5].status == "X" &&
    $scope.cellList[8].status == "X" ) { 
    console.log("hello");
    $scope.notification = "X Wins!"; 
}
    
if ($scope.cellList[0].status == "X" && 
    $scope.cellList[4].status == "X" &&
    $scope.cellList[8].status == "X" ) {
    $scope.notification = "X Wins!"; 
}

if ($scope.cellList[2].status == "X" && 
    $scope.cellList[4].status == "X" &&
    $scope.cellList[6].status == "X" ) {
    console.log("hello");
    $scope.notification = "X Wins!"; 
}

if ($scope.cellList[0].status == "O" && 
    $scope.cellList[1].status == "O" &&
    $scope.cellList[2].status == "O" ) {
    console.log("hello");
    $scope.notification = "X Wins!"; 
}

if ($scope.cellList[3].status == "O" && 
    $scope.cellList[4].status == "O" &&
    $scope.cellList[5].status == "O" ) {
    console.log("hello");
    $scope.notification = "0 Wins!"; 
}

if ($scope.cellList[6].status == "O" && 
    $scope.cellList[7].status == "O" &&
    $scope.cellList[8].status == "O" ) {
    console.log("hello");
    $scope.notification = "0 Wins!";
}

if ($scope.cellList[0].status == "O" && 
    $scope.cellList[3].status == "O" &&
    $scope.cellList[6].status == "O" ) {
    console.alert("O wins!");
    $scope.notification = "0 Wins!";
}

if ($scope.cellList[1].status == "O" && 
    $scope.cellList[4].status == "O" &&
    $scope.cellList[7].status == "O" ) {
    console.alert("O wins!");
    $scope.notification = "0 Wins!";
}

if ($scope.cellList[2].status == "O" && 
    $scope.cellList[5].status == "O" &&
    $scope.cellList[8].status == "O" ) {
    console.alert("O wins!");
    $scope.notification = "0 Wins!";
}

if ($scope.cellList[0].status == "O" && 
    $scope.cellList[4].status == "O" &&
    $scope.cellList[8].status == "O" ) {
    console.alert("O wins!");
    $scope.notification = "0 Wins!";
}

if ($scope.cellList[2].status == "O" && 
    $scope.cellList[4].status == "O" &&
    $scope.cellList[6].status == "O" ) {
    console.alert("O wins!");
    $scope.notification = "0 Wins!";
}