var TTTApp = angular.module('TTTApp', []);

  TTTApp.directive('rateMe', function() {
    // Runs during compile
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" class="filled">' +
                      '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '='
      },
      link: function (scope, iElm, iAttrs) {
        console.log(scope.ratingValue);
        scope.stars = [1,2,3,4];
        for (var i = 0; i < scope.ratingValue; i++) {
          scope.stars.push({});
        }
      }
    };
  });


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