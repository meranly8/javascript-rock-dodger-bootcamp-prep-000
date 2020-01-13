/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

      return (
        //The rock's left edge is < the DODGER's left edge, and the rock's right edge is > the DODGER's left edge
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        
        //The rock's left edge is > the DODGER's left edge, and the rock's right edge is < the DODGER's right edge
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerLeftEdge) ||
        
        //The rock's left edge is < the DODGER's right edge, and the rock's right edge is > the DODGER's right edge
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
        );
    }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;
  rock.style.top = top;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    // implement me!
    // (use the comments below to guide you!)

    
    GAME.appendChild(rock);
    
    
    //If a rock collides with the DODGER, we should call endGame().

     if (checkCollision(rock)) {
       return endGame();
     }
    //Otherwise, if the rock hasn't reached the bottom of the GAME, we want to move it again.

     if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock);
     } else {
       rock.remove();
     }
     
     return rock;

    //But if the rock *has* reached the bottom of the GAME, we should remove the rock from the DOM.
  }

  window.requestAnimationFrame(moveRock); // We should kick off the animation of the rock around here.
  
  ROCKS.push(rock); //Add the rock to ROCKS so that we can remove all rocks when there is a collision

  return rock; // Finally, return the rock element you've created.
}


function endGame() {
  clearInterval(gameInterval); //End the game by clearing `gameInterval`
  
  ROCKS.forEach(function(rock) {
    rock.remove(); //removing all ROCKS from the DOM
  });
  
  document.removeEventListener('keydown', moveDodger); //removing the `moveDodger` event listener
  
  return alert('YOU LOSE!'); //Finally, alert "YOU LOSE!" to the player.
}

function moveDodger(e) {
  // implement me!
  const code = e.which;
  if([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  if (code === LEFT_ARROW) { 
    moveDodgerLeft();
  } else if (code ===RIGHT_ARROW) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left);
     
     if (left > 0) {
       DODGER.style.left = `${left - 4}px`;
     }
   });
}

function moveDodgerRight() {
  
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left);
     
     if (left > 360) {
       DODGER.style.left = `${left + 4}px`;
     }
   });
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
