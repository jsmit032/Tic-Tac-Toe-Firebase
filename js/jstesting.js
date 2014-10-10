var players = [
    {name: '', score: 0},
    {name: '', score: 0}
];

var addInput = function(playerName) {
    for (var i = 0; i < players.length; i++) {
        if (players[0].name == '') {
            players[0].name = playerName;
            break;
        } else if (players[1].name == '') {
            players[1].name = playerName;
            break;
        } else {
            console.log("You've reached the player limit");
        }
    };
};