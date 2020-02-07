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
let randArray;
/*----- cached element references -----*/

const slotElements = {
    slotOneImg: document.querySelector('#slot1 img'),
    slotTwoImg: document.querySelector('#slot2 img'),
    slotThreeImg: document.querySelector('#slot3 img')
}

/*----- event listeners -----*/

/*----- functions -----*/
function init() {
    urlArray = Object.values(imageLookup); //makes a new array of the values from my image object
    console.log(urlArray);
    randArray = urlArray[Math.floor(Math.random() * urlArray.length)];//grabbing a random url based on index
}

init();

function render() {
    renderSlotImg();
}

function renderSlotImg() {
    for (let imageEle in slotElements) {
        slotElements[imageEle].src = randArray;
    };
}

function randIdx() {
    
}
render();