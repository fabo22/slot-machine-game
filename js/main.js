/* Psuedocode:
This program will display a slot machine with multiple buttons that a user can click. 
IF the Spin button is clicked by the user, the slots will 'spin' and each slot will display a randomized image. 
IF all three images are the same, the user will receive a certain amount of 'Tokens' depending on the value of the image they matched. 
IF none of the image values match, the user will lose a token.
IF the user has lost all their tokens, a message will appear stating they have gone Bankrupt and a Play Again button will apear
IF the user clicks the Play Again button, the program will run again from the beginning
 */

/*----- constants -----*/
const imageLookup = {
    sevenUrl: 'images/seven.png',
    diamondUrl: 'images/diamond.png',
    dollarSignUrl: 'images/dollar-sign.png',
    barUrl: 'images/bar.png',
    bananaUrl: 'images/banana.png',
    lemonUrl: 'images/lemon.png',
    watermelonUrl: 'images/watermelon.png',
    cherriesUrl: 'images/cherries.png',
    grapeUrl: 'images/grape.png'
};

const tokenValue = {
    seven: 100,
    diamond: 50,
    dollarSign: 25,
    bar: 15,
    banana: 10,
    lemon: 8,
    watermelon: 6,
    cherries: 4,
    grape: 2
}

let urlArray;
/*----- app's state (variables) -----*/
let tokens;
let multiplier;
let imageState;
/*----- cached element references -----*/

const slotElements = {
    slotOneImg: document.querySelector('#slot1 img'),
    slotTwoImg: document.querySelector('#slot2 img'),
    slotThreeImg: document.querySelector('#slot3 img')
}

const tokensEle = document.querySelector('#token');

const spinButton = document.querySelector('#spin');

const resetButton = document.querySelector('#play-again');

const message = document.querySelector('h2');

const timesOne = document.querySelector('#times-one');

const timesTwo = document.querySelector('#times-two');

const timesThree = document.querySelector('#times-three');

const multiMessage = document.querySelector('#multiplier');

const mainEle = document.querySelector('main');

const rulesEle = document.querySelector('#rules');

const rulesButton = document.querySelector('#rules-button');
/*----- event listeners -----*/
function spinner() {
    spinButton.addEventListener('click', function stopper(e) {
        
        if (multiplier === 1) {
            if (tokens >= 1) {
                tokensEle.textContent = tokens -= 1;
                renderSlotImg();
            }; 
        };
        if (multiplier === 2) {
            if (tokens >= 2) {
                tokensEle.textContent = tokens -= 2;
                renderSlotImg();
            };
        };
        if (multiplier === 3) {
            if (tokens >= 3) {
                tokensEle.textContent = tokens -= 3;
                renderSlotImg();  
            };
        };  

        if (tokens < 20) mainEle.style.backgroundColor = '#55ab55';
        if (tokens >= 20 && tokens < 40) mainEle.style.backgroundColor = '#88ddfc';
        if (tokens >= 40 && tokens < 75) mainEle.style.backgroundColor = '##b690de';
        if (tokens >= 75 && tokens < 150) mainEle.style.backgroundColor = '#c93333';
        if (tokens >= 150) mainEle.style.backgroundColor = 'gold';

    })};  
    
    timesOne.addEventListener('click', function() {
        timesOne.style.visibility = 'hidden';
        timesThree.style.visibility = 'visible';
        timesTwo.style.visibility = 'visible';
        if (multiplier === 2 || multiplier === 3) {
        multiMessage.textContent = `1 Token(s)`;
        multiplier = 1;
    };
});

timesTwo.addEventListener('click', function() {
    timesTwo.style.visibility = 'hidden';
    timesOne.style.visibility = 'visible';
    timesThree.style.visibility = 'visible';
    if (multiplier === 1 || multiplier === 3) {
        multiMessage.textContent = `2 Token(s)`;
        multiplier = 2;
    };
});

timesThree.addEventListener('click', function() {
    timesThree.style.visibility = 'hidden';
    timesTwo.style.visibility = 'visible';
    timesOne.style.visibility = 'visible';
    if (multiplier === 1 || multiplier === 2) {
        multiMessage.textContent = `3 Token(s)`;
        multiplier = 3;
    };
});

rulesButton.addEventListener('click', function() {
    imageStateFunc();
});

spinButton.addEventListener('mouseover', function(e) {e.target.style.backgroundColor = '#005e13';});
spinButton.addEventListener('mouseout', function(e) {e.target.style.backgroundColor = 'green';});

timesOne.addEventListener('mouseover', function(e) {e.target.style.backgroundColor = '#67acc5';});
timesOne.addEventListener('mouseout', function(e) {e.target.style.backgroundColor = '#88ddfc';});

timesTwo.addEventListener('mouseover', function(e) {e.target.style.backgroundColor = '#8965af';});
timesTwo.addEventListener('mouseout', function(e) {e.target.style.backgroundColor = '#B690DE';});

timesThree.addEventListener('mouseover', function(e) {e.target.style.backgroundColor = '#8b1b1b';});
timesThree.addEventListener('mouseout', function(e) {e.target.style.backgroundColor = '#c93333';});

resetButton.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    tokens = 12; //start out with 15 tokens
    urlArray = Object.values(imageLookup); //makes a new array of the values from my image object
    resetButton.style.visibility = 'hidden';
    rulesEle.style.visibility = 'visible';
    timesOne.style.visibility = 'hidden';
    timesTwo.style.visibility = 'visible';
    timesThree.style.visibility = 'visible';
    multiplier = 1; //going to start at x1
    multiMessage.textContent = `1 Token(s)`;
    message.style.color = 'gold';
    render();
    console.log(slotElements);
}


function win() {
    if (slotElements.slotOneImg.outerHTML === '<img src="images/seven.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/seven.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/seven.png">') {
        tokensEle.textContent = tokens += tokenValue.seven * multiplier;
        message.textContent = `Jackpot! ${tokenValue.seven * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg.outerHTML === '<img src="images/diamond.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/diamond.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/diamond.png">') {
        tokensEle.textContent = tokens += tokenValue.diamond * multiplier;
        message.textContent = `${tokenValue.diamond * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg.outerHTML === '<img src="images/dollar-sign.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/dollar-sign.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/dollar-sign.png">') {
        tokensEle.textContent = tokens += tokenValue.dollarSign * multiplier;
        message.textContent = `${tokenValue.dollarSign * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg.outerHTML === '<img src="images/bar.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/bar.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/bar.png">') {
        tokensEle.textContent = tokens += tokenValue.bar * multiplier;
        message.textContent = `${tokenValue.bar * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg.outerHTML === '<img src="images/lemon.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/lemon.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/lemon.png">') {
        tokensEle.textContent = tokens += tokenValue.lemon * multiplier;
        message.textContent = `${tokenValue.lemon * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg.outerHTML === '<img src="images/banana.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/banana.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/banana.png">') {
        tokensEle.textContent = tokens += tokenValue.banana * multiplier;
        message.textContent = `${tokenValue.banana * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg.outerHTML === '<img src="images/watermelon.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/watermelon.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/watermelon.png">') {
        tokensEle.textContent = tokens += tokenValue.watermelon * multiplier;
        message.textContent = `${tokenValue.watermelon * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg.outerHTML === '<img src="images/cherries.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/cherries.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/cherries.png">') {
        tokensEle.textContent = tokens += tokenValue.cherries * multiplier;
        message.textContent = `${tokenValue.cherries * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg.outerHTML === '<img src="images/grape.png">' && slotElements.slotTwoImg.outerHTML === '<img src="images/grape.png">' && slotElements.slotThreeImg.outerHTML === '<img src="images/grape.png">') {
        tokensEle.textContent = tokens += tokenValue.grape * multiplier;
        message.textContent = `${tokenValue.grape * multiplier} Tokens won!`;
    } else if (slotElements.slotOneImg != slotElements.slotTwoImg && tokens > 0) {
        message.textContent = 'Click the Spin Button!';
    } else if (slotElements.slotOneImg != slotElements.slotTwoImg && tokens === 0) {
        message.textContent = 'You Lose!';
        message.style.color = 'red';
        resetButton.style.visibility = 'visible';
    };
}

function render() {
    renderSlotImg();
}

function renderSlotImg() {
        slotElements.slotOneImg.src = probabilities();
        slotElements.slotTwoImg.src = probabilities();
        slotElements.slotThreeImg.src = probabilities();
        win();
        tokensEle.textContent = tokens;
}

function probabilities() { //instead of grabbing random index, im assigning each index a range to give them higher or lower odds
    const prob = Math.floor(Math.random() * 270);
    console.log(prob);
    if (prob <= 6)  {
        return urlArray[7]; //seven
    } else if (prob > 6 && prob <= 19)  {
        return urlArray[3]; //diamond
    } else if (prob > 19 && prob <= 35)  {
        return urlArray[4]; //dollar
    } else if (prob > 35 && prob <= 54)  {
        return urlArray[1]; //bar
    } else if (prob > 54 && prob <= 81)  {
        return urlArray[6]; //lemon
    } else if (prob > 81 && prob <= 112)  {
        return urlArray[0]; //banana
    } else if (prob > 112 && prob <= 146)  {
        return urlArray[8]; //watermelon
    } else if (prob > 146 && prob <= 200)  {
        return urlArray[2]; //cherries
    } else if (prob > 200 && prob <= 270)  {
        return urlArray[5]; //grape
    };   
}

function imageStateFunc() {
    if (rulesEle.style.display === "none") {
        rulesEle.style.display = "block";
      } else {
        rulesEle.style.display = "none";
      };
}

spinner();
render();