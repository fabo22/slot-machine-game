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
    diamond: 25,
    dollarSign: 20,
    bar: 15,
    banana: 10,
    lemon: 8,
    watermelon: 6,
    cherries: 4,
    grape: 2
}

/*----- app's state (variables) -----*/
let urlArray;
let tokens;
let multiplier;
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
/*----- event listeners -----*/
function spinner() {
    spinButton.addEventListener('click', function stopper(e) {
        
        if (multiplier === 1) {
            if (tokens > 1) {
                tokensEle.textContent = tokens -= 1;
                renderSlotImg();
            } else if (tokens === 1) {
                spinButton.removeEventListener('click', stopper, false);
                resetButton.style.visibility = 'visible';
                tokensEle.textContent = tokens -= 1;
                message.textContent = 'You lose!'; 
                renderSlotImg();
            };
         };
        if (multiplier === 2) {
            if (tokens > 2) {
                tokensEle.textContent = tokens -= 2;
                renderSlotImg();
            } else if (tokens === 2) {
                spinButton.removeEventListener('click', stopper, false);
                resetButton.style.visibility = 'visible';
                tokensEle.textContent = tokens -= 2;
                message.textContent = 'You lose!'; 
                timesTwo.removeEventListener('click', stopper, false);
                renderSlotImg();
            };
        };
        if (multiplier === 3) {
            if (tokens > 3) {
                tokensEle.textContent = tokens -= 3;
                renderSlotImg();
            } else if (tokens === 3) {
                spinButton.removeEventListener('click', stopper, false);
                resetButton.style.visibility = 'visible';
                tokensEle.textContent = tokens -= 3;
                message.textContent = 'You lose!'; 
                timesThree.removeEventListener('click', stopper, false);
                renderSlotImg();
            };
        };
        
    });}  
    
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

spinButton.addEventListener('mouseover', function(e) {e.target.style.backgroundColor = 'blue';});
spinButton.addEventListener('mouseout', function(e) {e.target.style.backgroundColor = 'white';});

timesOne.addEventListener('mouseover', function(e) {e.target.style.backgroundColor = 'blue';});
timesOne.addEventListener('mouseout', function(e) {e.target.style.backgroundColor = 'white';});

timesTwo.addEventListener('mouseover', function(e) {e.target.style.backgroundColor = 'blue';});
timesTwo.addEventListener('mouseout', function(e) {e.target.style.backgroundColor = 'white';});

timesThree.addEventListener('mouseover', function(e) {e.target.style.backgroundColor = 'blue';});
timesThree.addEventListener('mouseout', function(e) {e.target.style.backgroundColor = 'white';});

resetButton.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    tokens = 15; //start out with 15 tokens
    urlArray = Object.values(imageLookup); //makes a new array of the values from my image object
    resetButton.style.visibility = 'hidden';
    timesOne.style.visibility = 'hidden';
    timesTwo.style.visibility = 'visible';
    timesThree.style.visibility = 'visible';
    multiplier = 1; //going to start at x1
    multiMessage.textContent = `1 Token(s)`;
    spinner();
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
        message.textContent = 'Click to Spin!';
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


render();