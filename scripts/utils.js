//collision detect
function detectCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
    rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
    rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
    rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

//game timer
let timer = 10;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#Timer").innerHTML = timer;
  }

  if (timer === 0) {
    checkWinner({ player, enemy, timerId });
  }
}

  // FIXIT: timerId dosent seem to work, the timer dosent stop after the death
function checkWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#displayText").innerHTML = "Tie!";
  } else if (player.health > enemy.health) {
    document.querySelector("#displayText").innerHTML = "player 1 Win";
  } else {
    document.querySelector("#displayText").innerHTML = "player 2 Win";
  }
}
