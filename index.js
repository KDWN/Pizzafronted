import { getpizzas } from "./global.js";

function checkPurchase(itemName){ // Check what and how many products the user wants to add to cart.
    if( JSON.parse(localStorage.getItem("orderedItems"))[0] ) { 
        if(debug){console.log("non-empty cart")}; // debug
        var cartItems = JSON.parse(localStorage.getItem("orderedItems")); // get the string version of the orderedItems array and then convert it back into an array
        var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    } else {
        if(debug){console.log("empty cart")}; // debug
        var cartItems = [];
        var cartInfo = {};
    }
    let itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);
    if( itemCount == null || itemCount == "" || itemCount == 0) {return} // checks if input is empty
    while(isNaN(itemCount) || itemCount % 1 != 0 || itemCount < 0) {
        alert("Please input a whole positive number");
        itemCount = prompt(`How many ${itemName} pizzas do you want to add to cart?`);
        if( itemCount == null || itemCount == "" || itemCount == 0) {return}
    }
    if( confirm(`This will cost $${itemCount * getpizzas()[itemName.toLowerCase()]}. Are you sure you want to add to cart?`)) {
        if(debug){console.log(localStorage.orderedItems.includes(itemName.toLowerCase()))}; // debug
        if(debug){console.log(`updated orderedItems - ${JSON.parse(localStorage.getItem("orderedItems"))}`)}
        if(cartItems.includes(itemName.toLowerCase())){
            if(debug){console.log(`${itemName} in orderList`)}; // debug
            cartInfo[itemName.toLowerCase()].count += Number(itemCount); // updating ordered item count in orderList for the users changes
            if(debug){console.log(`${cartInfo[itemName.toLowerCase()]["count"]}`)}; // debug
            cartInfo[itemName.toLowerCase()].cost = cartInfo[itemName.toLowerCase()].count * getpizzas()[itemName.toLowerCase()]; // updating ordered item cost in orderList for the users changes
            if(debug){console.log("updating orderList")}; // debug
            if(debug){console.log(`updated cartInfo - ${cartInfo[itemName.toLowerCase()]["count"]}`)}; // debug
        }
        else {
            if(debug){console.log(`adding ${itemName} to orderList`)}  // debug
            cartInfo[itemName.toLowerCase()] = {"cost" : Number(itemCount * getpizzas()[itemName.toLowerCase()]), "count" : Number(itemCount)}; // adding a new item to the orderList
            cartItems.push(itemName.toLowerCase()); // adding a new item to the orderedItems
            if(debug){console.log(`updated cartItems - ${cartItems}`)}; // debug
            if(debug){console.log(`updated cartInfo - ${cartInfo[itemName.toLowerCase()]["count"]}`)}; // debug
        }
        localStorage.setItem("orderList", JSON.stringify(cartInfo)); // converting the function specific info (cartInfo) into localStorage info (orderList)
        localStorage.setItem("orderedItems", JSON.stringify(cartItems)); // converting the function specific info (cartItems) into localStorage info (orderItems)
        if(debug){console.log(`updated orderedItems - ${JSON.parse(localStorage.getItem("orderedItems"))}`)}; // debug
        if(debug){console.log(`updated orderList - ${JSON.parse(localStorage.getItem("orderList"))[itemName.toLowerCase()]["count"]}`)}; // debug
    }
}

document.addEventListener("DOMContentLoaded", () => { // checks if page content is loaded
    console.log("page loaded");
    document.querySelectorAll(".menuItem").forEach(menuItem => { // creates a nodeList for each element with the menuitem class referred to as menuItem (like iterating through an array)
        if(debug){console.log("adding lister")}; // debug
        menuItem.addEventListener("click", function() { // adds a check to the current menuItem that checks whenever it is clicked
            let itemName = this.querySelector("h1").textContent; // searches for the h1 element within the text of the div to find the name which is then called with itemName
            if(debug){console.log("clicking")}; // debug
            if(debug){console.log(`debug - ${debug}`)}; // debug
            checkPurchase(itemName); // runs checkPurchase()
        });
    });
});