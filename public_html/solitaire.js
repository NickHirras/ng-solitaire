angular.module('solitaireApp', []);

angular.module('solitaireApp').controller('GameCtrl', function ($scope) {

  Array.prototype.last = function () {
    return this[this.length - 1];
  };

  $scope.differentColor = function(suiteA, suiteB) {    
    return (suiteA >= 0 && suiteA <= 1 && suiteB >=2 && suiteB <=3) ||
            (suiteA >= 2 && suiteA <= 3 && suiteB >=0 && suiteB <=1);
  };

  $scope.flip = function(howMany) {
    $scope.saveState()
    $scope.selected = null;
    $scope.selectedFrom = null;
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

  $scope.selectWasteCard = function(card) {
    if($scope.selected === card) {
      $scope.selectedFrom = null;
      $scope.selected = null;
    } else {
      $scope.selectedFrom = $scope.waste;
      $scope.selected = card;
    }
  };
  
  $scope.flipTableauCard = function(tableauIndex, cardIndex) {
    $scope.saveState()
    $scope.selected = null;
    $scope.selectedFrom = null;        
    if(cardIndex !== $scope.tableau[tableauIndex].length - 1) {
      return;
    }
    var card = $scope.tableau[tableauIndex][cardIndex];
    if(card.face === $scope.face.up) {
      return;
    }
    card.face = $scope.face.up; 
  };

  $scope.selectTableauCard = function(tableauIndex, cardIndex) {
    var card = $scope.tableau[tableauIndex][cardIndex];
    if(card.face === $scope.face.down) {
      return;
    }
    if($scope.selected === card) {
      $scope.selected = null;
      $scope.selectedFrom = null;
      return;
    }
    $scope.selected = card;
    $scope.selectedFrom = $scope.tableau[tableauIndex];
  };

  $scope.moveSelectedToFoundation = function(foundation) {
    if($scope.selected === null || $scope.selectedFrom === null) {
      return;
    }
    $scope.saveState()
    foundation.push($scope.selectedFrom.pop());
    $scope.selected = null;
    $scope.selectedFrom = null;
  };
  
  $scope.moveSelectedToTableau = function(tableauIndex) {
    if($scope.selected === null || $scope.selectedFrom === null) {
      return;
    }
    $scope.saveState()
    if($scope.selectedFrom === $scope.waste) {
      var card = $scope.selectedFrom.pop();
      card.face = $scope.face.up;
      $scope.tableau[tableauIndex].push(card);
    } else {      
      var idx = $scope.selectedFrom.indexOf($scope.selected);
      if(idx === -1) {
        return;
      }
      var cards = $scope.selectedFrom.splice(idx, $scope.selectedFrom.length - idx);
      $scope.tableau[tableauIndex] = $scope.tableau[tableauIndex].concat(cards);
    }
    $scope.selected = null;
    $scope.selectedFrom = null;    
  };
  
  $scope.gameOver = function() {
    return ($scope.foundations[0].length === 13 &&
            $scope.foundations[1].length === 13 &&
            $scope.foundations[2].length === 13 &&
            $scope.foundations[3].length === 13);
  };

  $scope.newGame = function() {
    $scope.state = [];
    $scope.face = {down: 0, up: 1};
    $scope.suites = {clubs: 0, spaids: 1, hearts: 2, diamonds: 3};
    $scope.symbols = ['♣', '♠', '♥', '♦'];
    $scope.deck = [];

    $scope.stock = [];
    $scope.waste = [];
    $scope.foundations = [[], [], [], []];
    $scope.tableau = [[], [], [], [], [], [], []];

    $scope.selected = null;
    $scope.selectedFrom = null;
    
    // get a new deck of cards
    for (var suite = 0; suite < 4; suite++) {
      for (var val = 0; val < 13; val++) {
        card = {
          suite: suite,
          val: val, 
          face: $scope.face.down
        };
        $scope.deck.push(card);
      }
    }

    // shuffle the cards
    $scope.deck = shuffle($scope.deck);

    // deal out the tableaus
    for(var t=0; t<7; t++) {
      for(var i=0; i<=t; i++) {
        card = $scope.deck.shift();
        card.face = i>=t ? $scope.face.up : $scope.face.down;
        $scope.tableau[t].push(card);
      }
    }

    // put the remaining cards into the stock pile
    while($scope.deck.length > 0) {
      $scope.stock.push($scope.deck.shift());
    };
  };
  
  $scope.undo = function() {
    if($scope.state.length === 0) {
      return;
    }
    var state = $scope.state.pop();
    $scope.deck = angular.copy(state.deck);
    $scope.stock = angular.copy(state.stock);
    $scope.waste = angular.copy(state.waste);
    $scope.foundations = angular.copy(state.foundations);
    $scope.tableau = angular.copy(state.tableau);
    $scope.selected = null;
    $scope.selectedFrom = null;
  };
  
  $scope.saveState = function() {    
    $scope.state.push({
      deck: angular.copy($scope.deck),
      stock: angular.copy($scope.stock),
      waste: angular.copy($scope.waste),
      foundations: angular.copy($scope.foundations),
      tableau: angular.copy($scope.tableau),
    });    
  };
  
  var shuffle = function (o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
  
  $scope.newGame();

});

 
