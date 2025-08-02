const state = {
    view:{
        emojis: ["🪭", "👑", "🩰", "💼", "☂️", "💍"],
        htmlElements:{
            squares__squareElement: document.querySelectorAll(".card-wrapper"),
        }

    },
    values:{
        sortedEmojiPosition: [],
        squarePairs: {},
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
let mapEmojiPostion = () => {

} 













//Retrieve the HTML elements from DOM and ad the click actions
state.view.htmlElements.squares__squareElement.forEach(squareHtmlElement => {
    squareHtmlElement.addEventListener("click", (event) =>{
        event.stopImmediatePropagation();

        toggleTurnSquareClass(squareHtmlElement);
        randomEmojiInsertion(squareHtmlElement);
    });
});


state.view.emojis.map((emojiElement) => {
    
});


let main = () =>{
    randomPositionGen();
}

main();

//console.log(state.values.positionTaken.slice(-1,1))