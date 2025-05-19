import { getpizzas } from "./global.js";
var debug = JSON.parse(localStorage.getItem("debug"));

function checkValidity(item, count) {
    var cartItems = JSON.parse(localStorage.getItem("orderedItems")); // get the string version of the orderedItems array and then convert it back into an array
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    if(isNaN(count)){return 3}
    if(count % 1 != 0 ){return 1}
    if(cartItems.includes(item)){
        if(Number(cartInfo[item].count) + Number(count) <= 0){return 4}
        if(Number(cartInfo[item].count) + Number(count) > 100){return 5}
    } else {
        if(count < 0 ){return 2}
        if(count > 100){return 5}
    }
    return 0;
}

function checkPurchase(itemName){ // Check what and how many products the user wants to add to cart.
    if( JSON.parse(localStorage.getItem("orderedItems"))[0] ) { // checks if there is items in the cart
        if(debug){console.log("non-empty cart")}; // debug
        var cartItems = JSON.parse(localStorage.getItem("orderedItems")); // get the string version of the orderedItems array and then convert it back into an array
        var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    } else {
        if(debug){console.log("empty cart")}; // debug
        var cartItems = [];
        var cartInfo = {};
    }
    let failType = 0;
    let fails = ["", "Please input a whole number", "Please input a positive number", "Please input a number", "You can't have a negative amount of pizzas. \nPlease input a higher number", "We can't sell you more than 100 of one pizza type. \nPlease input a lower number"]
    let itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);
    if( itemCount == null || itemCount == "" || itemCount == 0) {return} // checks if input is empty
    failType = checkValidity(itemName.toLowerCase(), itemCount);
    while( failType != 0) { // repeats the question if there is an invalid input
        if(debug){console.log(failType)}
        alert(fails[failType]);
        itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);
        if( itemCount == null || itemCount == "" || itemCount == 0) {return}
        failType = checkValidity(itemName.toLowerCase(), itemCount);
    }
    if( confirm(`This will cost $${itemCount * getpizzas()[itemName.toLowerCase()]}.\nAre you sure you want to add to cart?`)) { // asks the user whether they want
    if(debug){console.log(localStorage.orderedItems.includes(itemName.toLowerCase()))}; // debug
    if(debug){console.log(`updated orderedItems - ${JSON.parse(localStorage.getItem("orderedItems"))}`)} // debug
    if(cartItems.includes(itemName.toLowerCase())){ // checks if the items
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