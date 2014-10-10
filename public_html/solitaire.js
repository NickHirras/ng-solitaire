angular.module('solitaireApp', []);

angular.module('solitaireApp').controller('GameCtrl', function ($scope) {

  $scope.suites = {clubs: 0, spaids: 1, hearts: 2, diamonds: 3};
  $scope.symbols = ['♣', '♠', '♥', '♦'];
  $scope.deck = [];

  $scope.stock = [];
  $scope.waste = [];
  $scope.foundations = [[], [], [], []];
  $scope.tableau = [[], [], [], [], [], [], []];
  $scope.tableauHidden = [0, 1, 2, 3, 4, 5, 6];

  Array.prototype.last = function () {
    return this[this.length - 1];
  };


  $scope.flip = function(howMany) {
    if($scope.stock.length === 0) {
      while($scope.waste.length > 0) {
        $scope.stock.push($scope.waste.shift());
      }
      return;
    }
    
    for(var i=0; i<howMany; i++) {
      if($scope.stock.length > 0) {
        $scope.waste.push($scope.stock.shift());
      }
    }
  };

  var shuffle = function (o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  // get a new deck of cards
  for (var suite = 0; suite < 4; suite++) {
    for (var val = 0; val < 13; val++) {
      card = {
        suite: suite,
        val: val
      };
      $scope.deck.push(card);
    }
  }
  
  // shuffle the cards
  $scope.deck = shuffle($scope.deck);
  
  // deal out the tableaus
  for(var t=0; t<7; t++) {
    for(var i=0; i<=t; i++) {
      $scope.tableau[t].push($scope.deck.shift());
    }
  }

  // put the remaining cards into the stock pile
  while($scope.deck.length > 0) {
    $scope.stock.push($scope.deck.shift());
  };


});
