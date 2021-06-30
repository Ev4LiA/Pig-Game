'use strict';

let currentValue, activePlayer, score, status;

const init = () => {
  $('#score--0').text(0);
  $('#score--1').text(0);

  $('#current--0').text(0);
  $('#current--1').text(0);

  currentValue = 0;
  activePlayer = 0;
  score = [0, 0];
  status = true;

  $('img').addClass('hidden');
  $('.player--0').addClass('player--active');
  $('.player--1').removeClass('player--active');
  $('.player--0').removeClass('player--winner');
  $('.player--1').removeClass('player--winner');
};

init();

const switchPlayer = () => {
  $(`#current--${activePlayer}`).text(0);
  $('.player--0').toggleClass('player--active');
  $('.player--1').toggleClass('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentValue = 0;
};

$('.btn--roll').on('click', function () {
  if (status) {
    let dice = Math.floor(Math.random() * 6) + 1;

    $('img').removeClass('hidden');
    $('img').attr('src', `dice-${dice}.png`);

    if (dice !== 1) {
      currentValue += dice;
      $(`#current--${activePlayer}`).text(currentValue);
    }
    // Switch player
    else {
      switchPlayer();
    }
  }
});

$('.btn--hold').on('click', function () {
  if (status) {
    score[activePlayer] += currentValue;
    $(`#score--${activePlayer}`).text(score[activePlayer]);

    if (score[activePlayer] >= 100) {
      status = false;
      $(`.player--${activePlayer}`).addClass('player--winner');
      $(`.player--${activePlayer}`).removeClass('player--active');
    } else {
      switchPlayer();
    }
  }
});

$('.btn--new').on('click', init);
