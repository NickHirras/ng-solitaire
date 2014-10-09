angular.module('solitaireApp', []);

angular.module('solitaireApp').controller('GameCtrl', function($scope) {
    
    $scope.suites = { clubs: 0, spaids: 1, hearts: 2, diamonds: 3 };
    $scope.deck = [];
    
    $scope.stock = [];
    $scope.waste = [];
    $scope.foundations = [];
    $scope.tableau = [];
    
    // initialize the deck of cards.
    for(var suite = 0; suite < 4; suite++) {
      for(var val = 0; val < 13; val++) {
        card = {
          suite: suite,
          val: val
        };
        $scope.deck.push(card);
      }
    };
    
});
