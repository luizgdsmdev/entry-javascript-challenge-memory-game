

let squares__squareElement = document.querySelectorAll(".card-wrapper");

squares__squareElement.forEach(squareHtmlElement => {
    squareHtmlElement.addEventListener("click", (event) =>{
        event.stopImmediatePropagation();

        toggleTurnSquareClass(squareHtmlElement);
    });
});


let toggleTurnSquareClass = (htmlElement) =>{
    htmlElement.classList.toggle("show-card-verse");
}