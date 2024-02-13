class Popup {
  constructor(player) {
    this.popupDiv = document.createElement('div');
    this.popupDiv.setAttribute('class', 'popup');
    

    document.body.appendChild(this.popupDiv);

    this.result = 0;
    this.timer = 0;
    this.player = player;
    this.score = player.score;

    this.isTimeReduction = false;
  }
  
  getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateQuestion() {
    const isMultiplication = Math.random() < 0.5;
    const num1 = isMultiplication ? this.getRandomNumber(1, 12) : this.getRandomNumber(100, 999);
    const num2 = this.getRandomNumber(1, isMultiplication ? 12 : 999);
    const operator = isMultiplication ? 'x' : '+';

    this.result = isMultiplication ? num1 * num2 : num1 + num2;
    this.displayQuestion(`${num1} ${operator} ${num2}`);
  }

  displayQuestion(question) {
  //   this.answerInput.value = '';
    this.popupDiv.innerHTML = '';
    const paragraphElement = document.createElement('p');

    // Set the text content for the paragraph
    paragraphElement.textContent = question;

    // Append the paragraph element to the popup
    this.popupDiv.appendChild(paragraphElement);


    this.answerInput = document.createElement('input');
    this.answerInput.setAttribute('class', 'popup-input');
    this.answerInput.setAttribute('placeholder', 'Enter your answer: ');
    this.popupDiv.appendChild(this.answerInput);

    this.timerElement = document.createElement('div');
    this.timerElement.setAttribute('class', 'popup-timer');
    this.popupDiv.appendChild(this.timerElement);

    this.resultDisplay = document.createElement('div')
    this.resultDisplay.setAttribute('class','result')
    this.popupDiv.appendChild(this.resultDisplay)

    
    const timerDuration = 10;
    this.startTimer(timerDuration);
    this.isPopupActive = true;
  }

  startTimer(duration) {
    this.timer = duration;
    this.updateTimer();
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.updateTimer();

      if (this.timer == 0) {
        clearInterval(this.timerInterval);
        this.checkAnswer();
      }
    }, 1000);
  }

  updateTimer() {
    this.timerElement.textContent = this.timer;
  }

  checkAnswer() {
    const userAnswer = parseInt(this.answerInput.value, 10);
    if (userAnswer === this.result) {
      this.resultDisplay.style.display = 'block';
      this.resultDisplay.style.backgroundColor = 'green';
      this.resultDisplay.textContent = 'Correct!';
      if (this.chooseBoost() === 'double') {
        this.player.score *= 2;
      }
    } else {
      this.resultDisplay.style.display = 'block';
      this.resultDisplay.style.backgroundColor = 'red';
      this.resultDisplay.textContent = `Correct answer: ${this.result}`
    }
    setTimeout(() => {
      this.closePopup();
    },2000);
  }

  onClose(callback) {
      this.onCloseCallback = callback;
    }
  
  closePopup() {
      this.popupDiv.style.display = 'none';
  
      if (typeof this.onCloseCallback === 'function') {
        this.onCloseCallback();
      }

      this.player.score = this.score; // Update the player's score
    }

  returnScore(){
      return this.player.score;
  }

  getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
      }

  displayMessage(message){
      this.boostType = document.createElement('div');
      document.body.appendChild(this.boostType)
      this.boostType.setAttribute('class','boostOrPenalty');
      this.boostType.innerHTML = message;
      this.boostType.style.display = 'block';
      setTimeout(() => {
          this.boostType.style.display = 'none';
      }, 3000);
  }

  chooseBoost(){
      let randNum = this.getRandomNumber(1,2);
      if(randNum < 5){
          this.displayMessage('Your score has been doubled!');
          return 'double';
      }
      else{
          return '';
      }
  } }


  export default Popup
