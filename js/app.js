
var myGlobalDiceRaceGame;
ion.sound({
  sounds: [{name: "winner-sound", volume: 1},{name: "go"},{name: "oh-no", volume: 0.2 },{name: "woo-hoo"},{name: "count-down-fix"},{name: "dice-race", volume: 1.0, loop: true},{name: "snap"},{name: "button_tiny"  },{name: "intro"}, {name: "computer_error"}, {name: "roll-dice"}],
  path: "js/sounds/",
  preload: true
});
//=====================
//DOCUMENT READY
//=====================
$(document).ready(function () {


  // =====================
  // INTRO
  // =====================

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
    ion.sound.stop('intro');
    ion.sound.play('dice-race',{volume: 0.2});
    ion.sound.play("button_tiny");
    $('.game-intro').css('display','none');
    $('.gamePrompt').show();
    $("body > div:not('.gamePrompt') ").addClass('blur-body');

    //=====================
    //PICK A CAR
    //=====================

    $('.form-btn').click(function () {
        $("body > div:not('.gamePrompt') ").removeClass('blur-body');
      $('.countDown').show();
      $("body > div:not('.countDown') ").addClass('blur-body');

      $(function () {

        var ourCountDown = setInterval(function () {
          ion.sound.stop('dice-race');
          var counter = parseInt($('.countDown').html());
          if (counter !== 0) {
            $('.countDown').html(counter - 1);
            ion.sound.play('count-down-fix');
          } else {
            clearInterval(ourCountDown);
            $("body > div:not('.countDown') ").removeClass('blur-body');
            $('.countDown').fadeOut(1000);
            ion.sound.stop('count-down-fix');
            ion.sound.play('dice-race');
          }
        }, 1000);
        setTimeout(function(){
          ion.sound.play('go');
          $(".go-div").show().delay(1000).fadeOut(500);
        }, 5000);

      });




      ion.sound.play("button_tiny");
        player1 = $('#redCar').val();
        player2 = $('#blueCar').val(); // 4
        myGlobalDiceRaceGame = new DiceRace(player1, player2);
        $('#red-car').html('Red car driver: ' + player1);
        $('#blue-car').html('Blue car driver: ' + player2);
        $('.gamePrompt').css('display', 'none');


        var card1 = 'Yey you got 2x roll value';
        var card2 = 'You have to go Back';
        var card3 = 'Sorry! you got nothing';
        var cardPicked;

      $('.card-div').click(function () {
          var x = Math.floor(Math.random(1) * 10);

          if (x <= 3 && x >= 0) {
              $('.card-div').removeClass('card-background');
              $('#card-item').html(card1);
              cardPicked = card1;
          } if (x >= 4 && x <= 6) {
              $('.card-div').removeClass('card-background');
              $('#card-item').html(card2);
              cardPicked = card2;
          } if(x >= 7 && x <= 10 ) {
              $('.card-div').removeClass('card-background');
              $('#card-item').html(card3);
              cardPicked = card3;
          }
            console.log("card picked is: " + cardPicked);
            return cardPicked;
        });

        //=====================
        //ROLL DICE
        //=====================
        firstPlayer();
        var num;
        var redCarPosition = 0;
        var blueCarPosition = 0;


          $('.btn').click(function () {




              ion.sound.play('roll-dice');
              $('.card-div').addClass('card-background');
              $('#card-item').html('');
              var rollDice1 = myGlobalDiceRaceGame.rollDice1();
              var rollDice2 = myGlobalDiceRaceGame.rollDice2();
              checkDice1(rollDice1);
              checkDice2(rollDice2);
              checkCurrentPlayer();
              animatePicture(redCarPosition, blueCarPosition);

              if (myGlobalDiceRaceGame.currentPlayer ===  myGlobalDiceRaceGame.player1) {

                    if (cardPicked === card1) {
                    ion.sound.play('woo-hoo');
                    redCarPosition += rollDice1 + rollDice2;
                    redCarPosition += 5;
                    $('.red-car').css({'margin-left': redCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    cardPicked = '';
                   }
                  if (cardPicked === card2) {
                    ion.sound.play('oh-no');
                    redCarPosition -= (rollDice1 + rollDice2);
                    $('.red-car').css({'margin-left': redCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    cardPicked = '';
                    myGlobalDiceRaceGame.currentPlayer = myGlobalDiceRaceGame.player2;
                  }
                    else if (rollDice1 === rollDice2) {
                    ion.sound.play('woo-hoo');
                    redCarPosition += (rollDice1 + rollDice2);
                    $('.red-car').css({'margin-left': redCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    doublePopUp(rollDice1);
                    $('.btn').removeClass('btn-blue');
                    $('.btn').addClass('btn-red');
                  }
                   else {
                    redCarPosition += rollDice1 + rollDice2;
                    $('.red-car').css({'margin-left': redCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    myGlobalDiceRaceGame.currentPlayer = myGlobalDiceRaceGame.player2;
                  }

                }


              //======================= if ENDS ====================
              else {
                    if (cardPicked === card1) {
                    ion.sound.play('woo-hoo');
                    blueCarPosition += rollDice1 + rollDice2;
                    blueCarPosition += 5;
                    $('.blue-car').css({'margin-left': blueCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    cardPicked = '';
                   }
                   if (cardPicked === card2) {
                    ion.sound.play('oh-no');
                    blueCarPosition -= (rollDice1 + rollDice2);
                   $('.blue-car').css({'margin-left': blueCarPosition + '%', 'transition-duration': '0.8s'});
                   animatePicture(redCarPosition, blueCarPosition);
                   cardPicked = '';
                   myGlobalDiceRaceGame.currentPlayer = myGlobalDiceRaceGame.player1;
                 }
                  else if (rollDice1 === rollDice2) {
                    ion.sound.play('woo-hoo');
                    blueCarPosition += rollDice1 + rollDice2;
                    $('.blue-car').css({'margin-left': blueCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    doublePopUp(rollDice1);
                    $('.btn').removeClass('btn-red');
                    $('.btn').addClass('btn-blue');
                  }
                  else {
                    blueCarPosition += rollDice1 + rollDice2;
                    $('.blue-car').css({'margin-left': blueCarPosition + '%', 'transition-duration': '0.8s'});
                    animatePicture(redCarPosition, blueCarPosition);
                    myGlobalDiceRaceGame.currentPlayer = myGlobalDiceRaceGame.player1;
                  }
              } // ====================== else ENDS =======================
              checkWinner(redCarPosition, blueCarPosition);
              showCard(redCarPosition, blueCarPosition);

          }); // GAME CLICK

      }); // FORM CLICK

}); // DOCUMENT.READY

});//=====================
  //ENDS DOCUMENT READY
  //=====================



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

    function doublePopUp(rollDice1) {
      ion.sound.play('dice-race', {volume: 0.1});
      ion.sound.play("computer_error");
      $('#diceDouble').show().css({'transition-duration': '0.5s'});
      $("body > div:not('#diceDouble') ").addClass('blur-body');
      $('#doubleNum').html(rollDice1);
    }

    function closeBtn() {
      ion.sound.play('button_tiny');
      ion.sound.play('dice-race');
      $('#diceDouble').hide();
      $("body > div:not('#diceDouble') ").removeClass('blur-body');
    }

    function showCard(a,b) {
      if(a >= 25 || b >= 25) {
        $('.card-div').addClass('card');
      }
    }

    function checkWinner(a, b) {
      if (a >= 92) {

        ion.sound.stop('dice-race');
        ion.sound.play('winner-sound');
        $('#winner-container').show();
        $("body > div:not('#winner-container') ").addClass('blur-body');
      }
      if (b >= 92) {
        ion.sound.stop('dice-race');
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
