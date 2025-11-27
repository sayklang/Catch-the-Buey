const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timeLeftDisplay = document.getElementById('time-left');
let lastHole;
let timeUp = false;
let score = 0;
let countdown;

// ฟังก์ชันสุ่มเวลาที่น้องจะโผล่ขึ้นมา
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// ฟังก์ชันสุ่มหลุม (ไม่ให้ซ้ำหลุมเดิม)
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// ฟังก์ชันสั่งให้น้องโผล่
function peep() {
  const time = randomTime(400, 1000); // ความเร็ว (ms)
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
  let timeLeft = 10; // เวลาเล่นเกม (วินาที)
  timeLeftDisplay.textContent = `เวลา: ${timeLeft} วินาที`;
  
  peep();
  
  // ตัวนับถอยหลัง
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

// ฟังก์ชันเมื่อคลิกโดนน้อง (ตีหัวแตก!)
function bonk(e) {
  if(!e.isTrusted) return; // ป้องกันการโกง
  score++;
  this.parentNode.classList.remove('up'); // น้องมุดลงทันที
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));