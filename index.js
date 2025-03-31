import { getpizzas } from "./global.js";

export function checkPurchase(itemName){ // Check what and how many products the user wants to purchase.
    let itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);
    if( itemCount == null || itemCount == "") {return} // checks if input is empty
    while(isNaN(itemCount) || itemCount % 1 != 0) {
        alert("Please input a whole number");
        itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);
    }
    confirm(`This will cost $${itemCount * getpizzas()[itemName.toLowerCase()]}. Are you sure you want to purchase?`);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menuitem").forEach(x => {
        if(debug){console.log("adding lister")};
        x.addEventListener("click", function() {
            let itemName = this.querySelector("h1").textContent;
            if(debug){console.log("clicking")};
            if(debug){debug}
            checkPurchase(itemName);
        });
    });
});