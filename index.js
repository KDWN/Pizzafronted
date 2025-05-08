import { getpizzas } from "./global.js";

export function checkPurchase(itemName){ // Check what and how many products the user wants to purchase.
    let itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);
    if( itemCount == null || itemCount == "") {return} // checks if input is empty
    while(isNaN(itemCount) || itemCount % 1 != 0) {
        alert("Please input a whole number");
        itemCount = prompt(`How many ${itemName} pizzas do you want to add to cart?`);
    }
    if( confirm(`This will cost $${itemCount * getpizzas()[itemName.toLowerCase()]}. Are you sure you want to add to cart?`)) {
        if(debug){console.log(localStorage.orderedItems.includes(itemName.toLowerCase()))}; // debug
        if(debug){console.log(`updated orderedItems - ${JSON.parse(localStorage.getItem("orderedItems"))}`)}
        if( JSON.parse(localStorage.getItem("orderedItems"))[0] ) { 
            if(debug){console.log("non-empty cart")};
            var cartItems = JSON.parse(localStorage.getItem("orderedItems")); // get the string version of the orderedItems array and then convert it back into an array
            var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
        } else {
            if(debug){console.log("empty cart")};
            var cartItems = [];
            var cartInfo = {};
        }
        if(localStorage.orderedItems.includes(itemName.toLowerCase())){
            if(debug){console.log(`${itemName} in orderList`)}; // debug
            cartInfo[itemName.toLowerCase()].count += Number(itemCount);
            if(debug){console.log(`${cartInfo[itemName.toLowerCase()]["count"]}`)}; // debug
            cartInfo[itemName.toLowerCase()].cost = cartInfo[itemName.toLowerCase()].count * getpizzas()[itemName.toLowerCase()];
            if(debug){console.log("updating orderList")}; // updating ordered item in orderList for new items added
            if(debug){console.log(`updated cartInfo - ${cartInfo[itemName.toLowerCase()]["count"]}`)}; // debug
        }
        else {
            if(debug){console.log(`adding ${itemName} to orderList`)} // adding a new item to the orderList
            cartInfo[itemName.toLowerCase()] = {"cost" : Number(itemCount * getpizzas()[itemName.toLowerCase()]), "count" : Number(itemCount)};
            cartItems.push(itemName.toLowerCase());
            if(debug){console.log(`updated cartItems - ${cartItems}`)};
            if(debug){console.log(`updated cartInfo - ${cartInfo[itemName.toLowerCase()]["count"]}`)};
        }
        localStorage.setItem("orderList", JSON.stringify(cartInfo));
        localStorage.setItem("orderedItems", JSON.stringify(cartItems));
        if(debug){console.log(`updated orderedItems - ${JSON.parse(localStorage.getItem("orderedItems"))}`)};
        if(debug){console.log(`updated orderList - ${JSON.parse(localStorage.getItem("orderList"))[itemName.toLowerCase()]["count"]}`)};
    }
}

document.addEventListener("DOMContentLoaded", () => { // checks if page content is loaded
    console.log("page loaded");
    document.querySelectorAll(".menuItem").forEach(menuItem => { // creates a nodeList for each element with the menuitem class referred to as menuItem (like iterating through an array)
        if(debug){console.log("adding lister")};
        menuItem.addEventListener("click", function() { // adds a check to the current menuItem that checks whenever it is clicked
            let itemName = this.querySelector("h1").textContent; // searches for the h1 element within the text of the div to find the name which is then called with itemName
            if(debug){console.log("clicking")};
            if(debug){console.log(`debug - ${debug}`)};
            checkPurchase(itemName); // runs checkPurchase()
        });
    });
});