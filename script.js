const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timeLeftDisplay = document.getElementById('time-left');
let lastHole;
let timeUp = false;
let score = 0;
let countdown;


window.addEventListener('mousedown', () => {
    document.body.classList.add('grabbing');
});

window.addEventListener('mouseup', () => {
    document.body.classList.remove('grabbing');
});


function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(400, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
 
  let timeLeft = 30; 
  timeLeftDisplay.textContent = `เวลา: ${timeLeft} วินาที`;
  
  peep();
  
  countdown = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = `เวลา: ${timeLeft} วินาที`;
    if(timeLeft <= 0) {
      clearInterval(countdown);
      timeUp = true;
      alert("หมดเวลา! คุณจับน้องได้ " + score + " ตัว 🦎");
    }
  }, 1000);
}


function showPlusOne(x, y) {
    const plusOne = document.createElement('div');
    plusOne.innerText = '+1';
    plusOne.classList.add('plus-one');
    
  
    plusOne.style.left = x + 'px';
    plusOne.style.top = y + 'px';
    
    document.body.appendChild(plusOne);

   
    setTimeout(() => {
        plusOne.remove();
    }, 800);
}

function bonk(e) {
  if(!e.isTrusted) return;
  score++;
  if(!this.parentNode.classList.contains('up')) return;
  this.parentNode.classList.remove('up'); 
  scoreBoard.textContent = score;


  showPlusOne(e.pageX, e.pageY);
}

moles.forEach(mole => mole.addEventListener('click', bonk));