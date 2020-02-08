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
    bananaUrl: 'images/banana.png',
    barUrl: 'images/bar.png',
    cherriesUrl: 'images/cherries.png',
    diamondUrl: 'images/diamond.png',
    dollarSignUrl: 'images/dollar-sign.png',
    grapeUrl: 'images/grape.png',
    lemonUrl: 'images/lemon.png',
    sevenUrl: 'images/seven.png',
    watermelonUrl: 'images/watermelon.png'
};

/*----- app's state (variables) -----*/
let urlArray;
let tokens;
 
/*----- cached element references -----*/

const slotElements = {
    slotOneImg: document.querySelector('#slot1 img'),
    slotTwoImg: document.querySelector('#slot2 img'),
    slotThreeImg: document.querySelector('#slot3 img')
}

const tokensEle = document.querySelector('#token');
console.log(tokensEle);
/*----- event listeners -----*/
const spinButton = document.querySelector('#spin');
spinButton.addEventListener('click', (e) => {
    renderSlotImg();
    if (tokens > 0) tokensEle.textContent = tokens -= 1;
});

document.querySelector('#play-again').addEventListener('click', init);
/*----- functions -----*/
function init() {
    tokens = 15; //start out with 15 tokens
    urlArray = Object.values(imageLookup); //makes a new array of the values from my image object
    //randArray = urlArray[Math.floor(Math.random() * urlArray.length)];//grabbing a random url based on index
    render();
}

init();

function render() {
    renderSlotImg();
}

function renderSlotImg() {
    for (let imageEle in slotElements) {
        slotElements.slotOneImg.src = probabilities();
        slotElements.slotTwoImg.src = probabilities();
        slotElements.slotThreeImg.src = probabilities();
        console.log(slotElements.slotOneImg.src);
    };
    tokensEle.textContent = tokens;
}

function probabilities() { //instead of grabbing random index, im assigning each index a range to give them higher or lower odds
    const prob = Math.floor(Math.random() * 1000);
    console.log(prob);
    if (prob <= 10)  {
        return urlArray[7];
    } else if (prob > 10 && prob <= 60)  {
        return urlArray[3];
    } else if (prob > 60 && prob <= 130)  {
        return urlArray[4];
    } else if (prob > 130 && prob <= 210)  {
        return urlArray[1];
    } else if (prob > 210 && prob <= 310)  {
        return urlArray[6];
    } else if (prob > 310 && prob <= 440)  {
        return urlArray[0];
    } else if (prob > 440 && prob <= 590)  {
        return urlArray[8];
    } else if (prob > 590 && prob <= 770)  {
        return urlArray[2];
    } else if (prob > 770 && prob <= 1000)  {
        return urlArray[5];
    };
    
}


render();