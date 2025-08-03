const state = {
    view:{
        emojis: ["🪭", "🤖", "🩰", "💼", "☂️", "💍"],
        htmlElements:{
            squares__squareElement: document.querySelectorAll(".card-wrapper"),
            squares__squareElementFliped: document.querySelectorAll(".show-card-verse"),
        }

    },
    values:{
        emojiController: [],
        squarePairs: {},
        flipController: [],
        squareIdController: [],
        usedIDs: [],
        lastIdVisited: [],
        movesController: null,
        gameWinController: null,
        initialTime: new Date(),
    },
    actions:{

    }
}



//Add the spin action for the HTML card element
let toggleTurnSquareClass = (htmlElement) =>{
    htmlElement.classList.toggle("show-card-verse");
}

//Generates random number list to further map emoji position
let randomPositionGen = (htmlElement) =>{

    //Creates random positions
    let positionTaken = [];
    do{
        let randomPosition = Math.floor(Math.random() * 12);
        positionTaken.includes(randomPosition) ? "" : positionTaken.push(randomPosition);
    }while(positionTaken.length < 12);

    //Create pairs for emoji insertion
    for(var i = 0; i < 6; i++){
        state.values.squarePairs[state.view.emojis[i]] = positionTaken.slice(-2);
        positionTaken.splice(positionTaken.length - 2, 2);
    }
} 

//Map random postiions to emoji
let emojiInsertionOnDOM = () => {
    //Calling in here to make sure the position generation occurs
    randomPositionGen();

    let emojiPairPosition = Object.entries(state.values.squarePairs);

    //Add the emoji pair to the DOM
    for(let [emoji, pairPosition] of emojiPairPosition){
        let position__0 = document.getElementById(pairPosition[0]);
        let position__1 = document.getElementById(pairPosition[1]);

        position__0.innerHTML = `${emoji}`;
        position__1.innerHTML = `${emoji}`;
    }

}

//"Logic for card flip counting, keeping only max of two cards flipped at time
let controllerForFlip = 0;
let flipController = (htmlElement) => {

    //Add the id of HTML element for frontEnd class control
    state.values.squareIdController.push(htmlElement.querySelectorAll(".card-back")[0].id);

    //Runs only for cards already flipped and reverse the state to normal
    let reverseFlippedCards = () =>{
        document.querySelectorAll(".show-card-verse").forEach(squareHtmlElement => {
            squareHtmlElement.classList.toggle("show-card-verse");
            state.values.flipController.splice(0, state.values.flipController.length)
            controllerForFlip = 1;
        });
    }

    //Verify if there are 2 cards already flipped
    controllerForFlip < 2 ? controllerForFlip += 1 : reverseFlippedCards();

    //Adding the emoji for validation of pair
    state.values.emojiController.push(htmlElement.querySelector(".card-back").innerHTML);

    //Check if there are two cards flipped and call for match verification
    controllerForFlip === 2 ? matchpairs() : "";
    
} 

//Check and apply different classes for matching pairs
let matchpairs = () =>{
    let rightCard_0 = document.getElementById(state.values.squareIdController[0]);
    let rightCard_1 = document.getElementById(state.values.squareIdController[1]);
    let verifyEmoji = state.values.emojiController[0] === state.values.emojiController[1];

    
    if(verifyEmoji && (rightCard_0 !== rightCard_1)){
        state.values.usedIDs.push(rightCard_0.id, rightCard_1.id);

        //CSS for visual feedback 
        rightCard_0.classList.add("right-pair");
        rightCard_1.classList.add("right-pair");
        rightCard_0.parentElement.classList.add("right-card-verse");
        rightCard_1.parentElement.classList.add("right-card-verse");

        //Adding the animation to make the right pairs
        rightCard_0.parentElement.classList.add("right-pair-disappear");
        rightCard_1.parentElement.classList.add("right-pair-disappear");
        
        state.values.gameWinController += 1;
        state.values.gameWinController === 6 ? userWonGame() : "";

        console.log(`Matching pairs: ${state.values.gameWinController}`)
        console.log(state.values.gameWinController === 6)
        

    }else{
        state.values.squareIdController.forEach(CardBackID => {
            let htmlCard = document.getElementById(CardBackID);
            htmlCard.classList.add("wrong-pair");
        });
    }

    state.values.squareIdController.splice(0, state.values.squareIdController.length);
    state.values.emojiController.splice(0, state.values.emojiController.length);
}


//Clear all wrong pair classes that could be at the HTML before validation
let clearWrongPairClasses = () =>{
    let wrongPairHtmlList = document.querySelectorAll(".wrong-pair");
    wrongPairHtmlList.forEach(htmlCard => {htmlCard.classList.remove("wrong-pair"); });
}


//Controlls the frontend for when the user wins the game
let userWonGame = () =>{
    let content__squaresFinal_screen = document.getElementById("content__squares-final_screen");
    let squares__final_screenTime = document.getElementById("squares__final_screen-time");
    let squares__final_screenMoves = document.getElementById("squares__final_screen-moves");

    

    squares__final_screenTime.innerText = `Total time: ${timeHandler()}`;
    squares__final_screenMoves.innerText = `Total moves: ${state.values.movesController}`
    
    //Controls 3s for enough time on frontend animation to occur before shows final score
    setTimeout(() => {
       content__squaresFinal_screen.style.display = "block"; 
    }, 3000);
}

//Handles game time for final screen
let timeHandler = () =>{
    let finalTime = new Date();
    totalTime = (finalTime - state.values.initialTime)/1000;

    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    let minutesF = String(minutes).padStart(2, '0');
    let secondsF = String(Math.floor(seconds)).padStart(2, '0');

    return `${minutesF}:${secondsF}`;
}


//Retrieve the HTML elements from DOM and ad the click actions
state.view.htmlElements.squares__squareElement.forEach(squareHtmlElement => {
    squareHtmlElement.addEventListener("click", (event) =>{
        event.stopImmediatePropagation();
        state.values.movesController += 1;
        
        //Validate if the card pair was not found (to block click on those already found)
        let blockClickOnFoundPairs = state.values.usedIDs.includes(squareHtmlElement.querySelectorAll(".card-back")[0].id)
        
        //to avoid double click on the same card
        let lastIdVisited = squareHtmlElement.querySelectorAll(".card-back")[0].id === state.values.lastIdVisited[0];
        state.values.lastIdVisited.pop();

        if(!blockClickOnFoundPairs && !lastIdVisited){
        clearWrongPairClasses();

        //Send the element ID for flip control, max of 2 cards per time (except when their the same emoji)
        flipController(squareHtmlElement);
        toggleTurnSquareClass(squareHtmlElement);
            
        }

        state.values.lastIdVisited.push(squareHtmlElement.querySelectorAll(".card-back")[0].id)

    });
});


let main = () =>{
    emojiInsertionOnDOM();
}

main();

//console.log(state.values.positionTaken.slice(-1,1))