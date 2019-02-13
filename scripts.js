    var modal;
    var btn;
    var span;

    var randomNumber = Math.floor(Math.random() * 99) + 1;
    var guesses = document.querySelector('#guesses');
    var lastResult = document.querySelector('#lastResult');
    var lowOrHi = document.querySelector('#lowOrHi');
    var win_display = document.querySelector('#wins');
    var loss_display = document.querySelector('#loss');

    var game_wins = 0;
    var game_losses = 0;

    var guessSubmit = document.querySelector('.guessSubmit');
    var guessField = document.querySelector('.guessField');

    var guessCount = 1;
    var resetButton = document.querySelector('#reset');
    resetButton.style.display = 'none';
    win_loss_display();
    guessField.focus();

    function win_loss_display() {
      win_display.innerHTML = 'Wins: ';
      win_display.innerHTML += game_wins;

      loss_display.innerHTML = 'Losses: ';
      loss_display.innerHTML += game_losses;
    }

    function modal_test() {
        modal = document.getElementById('myModal');
        btn = document.getElementById("modal_check");
        span = document.getElementsByClassName("close")[0];
        btn.onclick = function() {
          modal.style.display = "block";
        };
        span.onclick = function() {
          modal.style.display = "none";
        };
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
    }

    function checkGuess() {
      var userGuess = Number(guessField.value);

      if (userGuess > 99 || userGuess < 1) {
        modal_test();
      }
      else {
        modal = null;
        
        if (guessCount === 1) {
          guesses.innerHTML = 'Previous guesses: ';
        }
        guesses.innerHTML += userGuess + ' ';

        console.log('game_losses: ', game_losses);
        console.log('game_wins: ', game_wins);
        if (userGuess === randomNumber) {
          lastResult.innerHTML = 'Congratulations! You got it right!';
          lastResult.style.backgroundColor = 'green';
          lowOrHi.innerHTML = '';
          game_wins++;
          setGameOver();
        }
        else if (guessCount === 7) {
          lastResult.innerHTML = 'Sorry, you lost!';
          game_losses++;
          console.log('game_losses: ', game_losses);
          setGameOver();
        }
        else {
          lastResult.innerHTML = 'Wrong!';
          lastResult.style.backgroundColor = 'red';
          if (userGuess < randomNumber) {
            lowOrHi.innerHTML = 'Last guess was too low!';
          }
          else if (userGuess > randomNumber) {
            lowOrHi.innerHTML = 'Last guess was too high!';
          }
        }
        guessCount++;
        guessField.value = '';
        guessField.focus();
      }
    }

    guessSubmit.addEventListener('click', checkGuess);

    function setGameOver() {
      guessField.disabled = true;
      guessSubmit.disabled = true;
      resetButton.style.display = 'inline';
      resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
      guessCount = 1;

      var resetParas = document.querySelectorAll('.resultParas p');
      for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
      }

      resetButton.style.display = 'none';
      win_loss_display();

      guessField.disabled = false;
      guessSubmit.disabled = false;
      guessField.value = '';
      guessField.focus();

      lastResult.style.backgroundColor = 'white';

      randomNumber = Math.floor(Math.random() * 99) + 1;
    }
    