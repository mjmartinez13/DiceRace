
function DiceRace(player1, player2) {

  this.player1 = player1;
  this.player2 = player2;

  if (Math.random() < 0.5) {
    this.currentPlayer = this.player1;
  } else {
    this.currentPlayer = this.player2;
  }

}

DiceRace.prototype.rollDice1 = function () {
  num1 = Math.floor(Math.random() * 6) + 1;
  return num1;
};

DiceRace.prototype.rollDice2 = function () {
  num2 = Math.floor(Math.random() * 6) + 1;
  return num2;
};
