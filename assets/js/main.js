"use strict";

const radioBtns = document.querySelectorAll(".radio_container input[type='radio']");
const customRadioBtn = document.querySelector("#rounds_custom");
const radioBtnContainer = document.querySelector(".radio_container");
const customInput = document.querySelector("#custom_input");
const guessForm = document.querySelector(".guess_form");
const guessBtn = document.querySelector(".guess_btn");
const userGuess = document.querySelector("#user_number");
const resetBtn = document.querySelector(".reset_btn");

const roundsOutput = document.querySelector(".rounds_output");
const tipsOutput = document.querySelector(".tip_output");

let maxRounds = 0;
let roundsCounter = 0;
let CompChoice;
const gameFunction = (event) => {
  const userNumber = Number(userGuess.value);
  event.preventDefault();
  getRounds();
  let gameOver = checkGameOver(userNumber);
  if (gameOver) {
    return;
  }
  roundsCounter++;
  changeRoundsOutput();
  if (roundsCounter === 1) {
    CompChoice = Math.floor(Math.random() * 99 + 1);
  }
  tipOutput(userNumber);
  gameOver = checkGameOver(userNumber);
  if (gameOver) {
    resetBtn.classList.remove("hidden");
  }
};

const checkGameOver = (userNumber) => {
  if (maxRounds === 0 || roundsCounter === maxRounds || !userNumber || userNumber === CompChoice || maxRounds < 1) {
    return true;
  } else {
    return false;
  }
};

const tipOutput = (userNumber) => {
  if (userNumber > CompChoice) {
    tipsOutput.innerHTML += `<p>${roundsCounter}. You need to guess lower than ${userNumber}</p>`;
  } else if (userNumber < CompChoice) {
    tipsOutput.innerHTML += `<p>${roundsCounter}. You need to guess higher than ${userNumber}</p>`;
  } else if (userNumber === CompChoice) {
    tipsOutput.innerHTML += `<p>Yes!!! You got me in ${roundsCounter} guesses. I'm ${CompChoice}. You win!!!</p>`;
  } else if (roundsCounter === maxRounds) {
    tipsOutput.innerHTML += `<p>Oh no. You didn't got me in ${maxRounds} rounds. I'm ${CompChoice}.</p>`;
  }
};

const changeRoundsOutput = () => {
  if (roundsCounter === 1) {
    radioBtnContainer.classList.add("hidden");
    roundsOutput.classList.remove("hidden");
  }
  roundsOutput.textContent = `${roundsCounter} / ${maxRounds}`;
};

const getRounds = () => {
  radioBtns.forEach((button) => {
    if (button.checked && button.value === "custom") {
      maxRounds = Number(customInput.value);
    } else if (button.checked) {
      maxRounds = Number(button.value);
    }
  });
};

const showCustomRounds = () => {
  customInput.classList.remove("hidden");
};
const hideCustomRounds = () => {
  customInput.classList.add("hidden");
};

const reset = () => {
  radioBtnContainer.classList.remove("hidden");
  roundsOutput.classList.add("hidden");
  roundsCounter = 0;
  tipsOutput.textContent = "";
  userGuess.value = "";
  resetBtn.classList.add("hidden");
};

radioBtns.forEach((button, i) => {
  if (i < 3) {
    button.addEventListener("change", hideCustomRounds);
  }
});

customRadioBtn.addEventListener("change", showCustomRounds);

guessBtn.addEventListener("click", gameFunction);

resetBtn.addEventListener("click", reset);
