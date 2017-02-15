
var myGlobalDiceRaceGame;

ion.sound({
  sounds: [{name: "winner-sound"},{name: "snap"},{name: "button_tiny"  },{name: "intro"}, {name: "computer_error"}, {name: "roll-dice"}],
  path: "js/sounds/",
  preload: true
});


$(document).ready(function () {

  ion.sound.play('intro');
  $('.first').typeIt({
    speed: 120,
    cursor: false,
    autoStart: true
  })
  .tiPause(1000)
  .tiType('Hi! welcome to DiceRace');

  $('.readme-text').typeIt({
    speed: 70,
    cursor: false,
    autoStart: false
  })
  .tiPause(4000)
  .tiType("This is a simple game made to showcase the different technologies that I have learned over the past two weeks at <b>IronHack</b>.")
  .tiBreak()
  .tiBreak()
  .tiType("Some of the new <b>skills</b> that I've learned and used in the game are:")
  .tiBreak()
  .tiPause(1000)
  .tiType('HTML5,')
  .tiPause(600)
  .tiType(' CSS,')
  .tiPause(600)
  .tiType(' Bootstrap,')
  .tiPause(600)
  .tiType(' SASS,')
  .tiPause(600)
  .tiType(' JavaScript')
  .tiPause(600)
  .tiType(' and jQuery')
  .tiPause(1000)
  .tiDelete()
  .tiPause(500)
  .tiType('<h3>Enjoy!</h3>')
  .tiBreak()
  .tiPause(1000)
  .tiType('<h1>You may exit now</h1>');


$('#game-intro-btn').click ( function () {
     ion.sound.play("button_tiny");
    $('.game-intro').css('display','none');


    $('.gamePrompt').show();
    $("body > div:not('.gamePrompt') ").addClass('blur-body');


    $('.form-btn').click(function () {
      ion.sound.play("button_tiny");
        player1 = $('#redCar').val();
        player2 = $('#blueCar').val(); // 4
        myGlobalDiceRaceGame = new DiceRace(player1, player2);
        $('#red-car').html('Red car driver: ' + player1);
        $('#blue-car').html('Blue car driver: ' + player2);
        $('.gamePrompt').css('display', 'none');
        $("body > div:not('.gamePrompt') ").removeClass('blur-body');


        firstPlayer();
        var redCarPosition = 0;
        var blueCarPosition = 0;


          $('.btn').click(function () {
              ion.sound.play('roll-dice');
              var rollDice1 = myGlobalDiceRaceGame.rollDice1();
              var rollDice2 = myGlobalDiceRaceGame.rollDice2();
              checkDice1(rollDice1);
              checkDice2(rollDice2);

              checkCurrentPlayer();
              // animatePicture(redCarPosition, blueCarPosition);

              if (myGlobalDiceRaceGame.currentPlayer ===  myGlobalDiceRaceGame.player1) {
                  if (rollDice1 === rollDice2) {
                    redCarPosition += rollDice1 + rollDice2;
                    $('.red-car').css({'margin-left': redCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    doublePopUp();
                  }else {
                    redCarPosition += rollDice1 + rollDice2;
                    $('.red-car').css({'margin-left': redCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    myGlobalDiceRaceGame.currentPlayer = myGlobalDiceRaceGame.player2;
                  }
              }else {
                  if (rollDice1 === rollDice2) {
                    blueCarPosition += rollDice1 + rollDice2;
                    $('.blue-car').css({'margin-left': blueCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    doublePopUp();
                  }else {
                    blueCarPosition += rollDice1 + rollDice2;
                    $('.blue-car').css({'margin-left': blueCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    myGlobalDiceRaceGame.currentPlayer = myGlobalDiceRaceGame.player1;
                  }
              }
              checkWinner(redCarPosition, blueCarPosition);

          }); // GAME CLICK

      }); // FORM CLICK

}); // DOCUMENT.READY

});
    //===== END DOCUMENT.READY =====
    function animatePicture(redCarPosition, blueCarPosition) {
      if (redCarPosition > blueCarPosition){
          $('.funny-player1').show().attr('src', 'img/happy-face.jpg');
          $('.funny-player2').show().attr('src', 'img/crying-face.jpg');
      }else if (redCarPosition < blueCarPosition) {
          $('.funny-player2').show().attr('src', 'img/happy-face.jpg');
          $('.funny-player1').show().attr('src', 'img/crying-face.jpg');
      }else if (redCarPosition >= blueCarPosition) {

      }
      else if (redCarPosition === blueCarPosition) {

      }

    }

    function doublePopUp() {
      ion.sound.play("computer_error");
      $('#diceDouble').show().css({'transition-duration': '0.5s'});
      $("body > div:not('#diceDouble') ").addClass('blur-body');
      $('#doubleNum').html(rollDice1);
    }

    function closeBtn() {

      ion.sound.play('button_tiny');
      $('#diceDouble').hide();
      $("body > div:not('#diceDouble') ").removeClass('blur-body');
    }

    function checkWinner(a, b) {
      if (a >= 92) {
        ion.sound.play('winner-sound');
        $('#winner-container').show();
        $("body > div:not('#winner-container') ").addClass('blur-body');
      }
      if (b >= 92) {
        ion.sound.play('winner-sound');
        $('#winner-container').show();
        $('#winner-img').attr('src', 'img/winner-blue-car.png');
        $('#winner-text').html('Blue');
        $("body > div:not('#winner-container') ").addClass('blur-body');
      }
    }

    function firstPlayer() {
      if(myGlobalDiceRaceGame.currentPlayer === myGlobalDiceRaceGame.player1){
        $('.btn').addClass('btn-red');
        $('.btn').html('Is ' + myGlobalDiceRaceGame.currentPlayer + "'s turn");
      }
      else {
        $('.btn').addClass('btn-blue');
        $('.btn').html('Is ' + myGlobalDiceRaceGame.currentPlayer + "'s turn");
      }
    } //it will check who was choose to go first

    function checkCurrentPlayer() { //it will swich between players
      if (myGlobalDiceRaceGame.currentPlayer === myGlobalDiceRaceGame.player1) {
        $('.btn').html('Is ' + myGlobalDiceRaceGame.player2 + "'s turn");
        $('.btn').removeClass('btn-red');
        $('.btn').addClass('btn-blue');
      }
      if(myGlobalDiceRaceGame.currentPlayer === myGlobalDiceRaceGame.player2) {
        $('.btn').html('Is ' + myGlobalDiceRaceGame.player1 + "'s turn");
        $('.btn').removeClass('btn-blue');
        $('.btn').addClass('btn-red');
      }
    }

    function checkDice1(dice1) {
      if (dice1 === 6) {
        $('.dice-1').removeClass('active');
        $('#dot-1,#dot-3,#dot-4,#dot-6,#dot-7,#dot-9').addClass('active');
      }
      if (dice1 === 5) {
        $('.dice-1').removeClass('active');
        $('#dot-1,#dot-3,#dot-5,#dot-7,#dot-9').addClass('active');
      }
      if (dice1 === 4) {
        $('.dice-1').removeClass('active');
        $('#dot-1,#dot-3,#dot-7,#dot-9').addClass('active');
      }
      if (dice1 === 3) {
        $('.dice-1').removeClass('active');
        $('#dot-1,#dot-5,#dot-9').addClass('active');
      }
      if (dice1 === 2) {
        $('.dice-1').removeClass('active');
        $('#dot-1,#dot-9').addClass('active');
      }
      if (dice1 === 1) {
        $('.dice-1').removeClass('active');
        $('#dot-5').addClass('active');
      }
    } // it  //dice amout generated by

    function checkDice2(dice2) {
      if (dice2 === 6) {
        $('.dice-2').removeClass('active-2');
        $('#spot-1,#spot-3,#spot-4,#spot-6,#spot-7,#spot-9').addClass('active-2');
      }
      if (dice2 === 5) {
        $('.dice-2').removeClass('active-2');
        $('#spot-1,#spot-3,#spot-5,#spot-7,#spot-9').addClass('active-2');
      }
      if (dice2 === 4) {
        $('.dice-2').removeClass('active-2');
        $('#spot-1,#spot-3,#spot-7,#spot-9').addClass('active-2');
      }
      if (dice2 === 3) {
        $('.dice-2').removeClass('active-2');
        $('#spot-1,#spot-5,#spot-9').addClass('active-2');
      }
      if (dice2 === 2) {
        $('.dice-2').removeClass('active-2');
        $('#spot-1,#spot-9').addClass('active-2');
      }
      if (dice2 === 1) {
        $('.dice-2').removeClass('active-2');
        $('#spot-5').addClass('active-2');
      }
}
