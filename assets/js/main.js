const state = {
    view:{
        emojis: ["🪭", "🤖", "🩰", "💼", "☂️", "💍"],
        htmlElements:{
            squares__squareElement: document.querySelectorAll(".card-wrapper"),
            squares__squareElementFliped: document.querySelectorAll(".show-card-verse"),
        }

    },
    values:{
        sortedEmojiPosition: [],
        squarePairs: {},
        flipController: []
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

        position__0.innerHTML = `<p>${emoji}</p>`;
        position__1.innerHTML = `<p>${emoji}</p>`;
    }

}

let controllerForFlip = 0;
let flipController = (htmlElement) => {
    let backCardViewID = htmlElement.querySelector(".card-back").id;

    //Verify if there are 2 cards already flipped
    if(controllerForFlip < 2){
        state.values.flipController.push(backCardViewID);
        controllerForFlip += 1;
    }else{
        //Runs only for cards already flipped and reverse the state to normal
        document.querySelectorAll(".show-card-verse").forEach(squareHtmlElement => {
            squareHtmlElement.classList.toggle("show-card-verse");
            state.values.flipController.splice(0, state.values.flipController.length)
            controllerForFlip = 1;
        });
    }
    
}













//Retrieve the HTML elements from DOM and ad the click actions
state.view.htmlElements.squares__squareElement.forEach(squareHtmlElement => {
    squareHtmlElement.addEventListener("click", (event) =>{
        event.stopImmediatePropagation();
        flipController(squareHtmlElement);//Send the element ID for flip control, max of 2 cards per time (except when their the same emoji)

        toggleTurnSquareClass(squareHtmlElement);
    });
});


state.view.emojis.map((emojiElement) => {
    
});


let main = () =>{
    emojiInsertionOnDOM();
}

main();

//console.log(state.values.positionTaken.slice(-1,1))