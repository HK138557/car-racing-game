import Popup from './popup.js';


const scoreElement = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const ClickToStart = document.querySelector('.ClickToStart');



let popupDifficulty = '';
ClickToStart.addEventListener('click', Start);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);
let keys = {
ArrowUp: false,
ArrowDown: false,
ArrowLeft: false,
ArrowRight: false,
}
let player = {
speed: 4,
score: 0,
};
function keydown(e) {
keys[e.key] = true
}
function keyup(e) {
keys[e.key] = false;
}

let isPopupDisplayed = false;

// starting the game
function Start() {

switch (difficulty) {
    case 'easy':
        // Set background and popup difficulty for easy track
        document.body.style.backgroundImage = "url('/static/images/grass.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        popupDifficulty = 'easy';
        break;
    case 'medium':
        // Set background and popup difficulty for medium track
        document.body.style.backgroundImage = "url('/static/images/river.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        popupDifficulty = 'medium';
        break;
    case 'hard':
        // Set background and popup difficulty for hard track
        document.body.style.backgroundImage = "url('/static/images/city.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        popupDifficulty = 'difficult';
        break;
    default:
        // Handle default case or redirect to an error page
        break;
}
gameArea.innerHTML = "";
isPopupDisplayed = false;
startScreen.classList.add('hide');
player.isStart = true;
player.score = 0;
Animation()
}


function Resume(speed, updatedScore){
gameArea.innerHTML = '';
isPopupDisplayed = false;
player.isStart = true;
player.score = updatedScore;
scoreElement.innerHTML = "Score" + ":" + (updatedScore);
// Adjust the speed based on the original speed and the given speed parameter
player.speed = Math.max(player.speed, speed);

Animation();
}



function Animation(){
window.requestAnimationFrame(Play);
// creating the road lines
for (let i = 0; i < 5; i++) {
let roadLines = document.createElement('div');
roadLines.setAttribute('class', 'roadLines');
roadLines.y = (i * 140);
roadLines.style.top = roadLines.y + "px";
gameArea.appendChild(roadLines);
}
// creating the opponents car
for (let i = 0; i < 3; i++) {
let Opponents = document.createElement('div');
Opponents.setAttribute('class', 'Opponents');
Opponents.y = ((i) * -300);
Opponents.style.top = Opponents.y + "px";
gameArea.appendChild(Opponents);
Opponents.style.left = Math.floor(Math.random() * 350) + "px";
Opponents.style.backgroundColor=randomColor();
}
let car = document.createElement('div');
car.setAttribute('class', 'car');
gameArea.appendChild(car);
player.x = car.offsetLeft;
player.y = car.offsetTop - 100;
}


function randomColor(){
function c(){
let hex=Math.floor(Math.random()*256).toString(16);
return ("0"+String(hex)).substr(-2);
}
return "#"+c()+c()+c();
}


//play the game

let AnimationLimit = generateRandomInteger(300,500);
let animationNumber = 0;

function Play() {
let car = document.querySelector('.car');
let road = gameArea.getBoundingClientRect();
if (player.isStart && !isPopupDisplayed) {
moveLines();
moveOpponents(car);
if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
if (keys.ArrowDown && player.y < (road.height - 75)) { player.y += player.speed }
if (keys.ArrowRight && player.x < 350) { player.x += player.speed }
if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
car.style.top = player.y + "px";
car.style.left = player.x + "px";


// Increment animationNumber with each frame
animationNumber++;

// Check if animationNumber is equal to AnimationLimit
if (animationNumber === AnimationLimit) {
  createPopup(player.speed);

  // Generate a new random AnimationLimit
  AnimationLimit = generateRandomInteger(750, 1250);
  
  // Reset animationNumber to 0
  animationNumber = 0;

  isPopupDisplayed = false;
} 


window.setTimeout(() => {
  scoreElement.innerHTML = "Score" + ":" + (player.score);
}, 0);

if(animationNumber % 2 == 0){
  player.score++;
  player.speed += 0.005;
}

window.requestAnimationFrame(Play); 
}}


function createPopup(speed){
if (!isPopupDisplayed){
isPopupDisplayed = true;
player.isStart = false;

const popup = new Popup(player); // Pass the player object to the Popup constructor
popup.generateQuestion();


popup.onClose(() => {
let updatedScore = popup.returnScore();
console.log(updatedScore);
Resume(speed, updatedScore);
})
}}

function generateRandomInteger(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}



function moveLines() {
let roadLines = document.querySelectorAll('.roadLines');
if(!isPopupDisplayed){
roadLines.forEach(function (item) {
{
if (item.y >= 700)
item.y -= 700;
item.y += player.speed;
item.style.top = item.y + "px";
}})}}

function moveOpponents(car) {
let Opponents = document.querySelectorAll('.Opponents');
if(!isPopupDisplayed){

Opponents.forEach(function (item) {
if (isCollide(car, item)) {
endGame();                  
}
if (item.y >= 750) {
item.y -= 900;
item.style.left = Math.floor(Math.random() * 350) + "px";
}
item.y += (0.5 * player.speed);
item.style.top = item.y + "px";
})
}}


//check whether the cars collide or not
function isCollide(player, opponent) {
let playerRect = player.getBoundingClientRect();
let opponentRect = opponent.getBoundingClientRect();
return !((playerRect.top > opponentRect.bottom) || (playerRect.bottom < opponentRect.top) || (playerRect.right < opponentRect.left) || (playerRect.left > opponentRect.right))
}

//end the game
function endGame() {
animationNumber = 0;
player.isStart = false;
player.speed = 4;
startScreen.classList.remove('hide');
}














