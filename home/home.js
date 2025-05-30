import { getpizzas } from "../global/global.js";
var debug = JSON.parse(localStorage.getItem("debug"));

// Create menu component {

// Creates a GUI for each item that should be on the menu
function createMenu(item) {

    // Sets the HTML elements
    var newMenuItem = document.createElement("div");
    newMenuItem.className = "menuItem";
    var newName = document.createElement("h1");
    var newNameText = document.createTextNode(item);
    var newImg = document.createElement("img");

    // Makes sure the image can be generated (will give an error if it can't but it will work)
    newImg.src = `../images/${item.replace(" ", "-")}-pizza.png`;
    newImg.onerror = () => {
        newImg.src = "../images/unknown-pizza.png";
    }
    newImg.width = 175;

    // Attaches the HTML elements to the page
    newName.appendChild(newNameText);
    newMenuItem.appendChild(newName);
    newMenuItem.appendChild(newImg);
    document.getElementById("menuBox").appendChild(newMenuItem);
}

// End create menu component

// Add item component {

// Sends a prompt to the user after they click a menu item where they can then enter how much they want and then it
// Checks if the input obeys the rules (no floats, cannot total to more than 100, cannot go below 0, and only numbers)
// If the input is valid it adds an item to the orderedItems and the orderList if they do not already contain that item
// Otherwise it updates the item to increase/decrease the count and cost of the item
// However if the input is not valid it will just ask the prompt again unless the user inputs nothing, 0, or cancels then it will end the whole function

// Checks to make sure that the input obeys the rules of the ordering system
function checkValidity(item, count) { 

    // Convert orderList and orderedItems from string to object/array
    var cartItems = JSON.parse(localStorage.getItem("orderedItems"));
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 

    // Returns values based on if/what the user did wrong
    if(isNaN(count)) {return "Please input a number"}
    if(count % 1 !== 0 ) {return "Please input a whole number"}
    if(cartItems.includes(item)){
        if(Number(cartInfo[item].count) + Number(count) <= 0){return "You can't have a negative amount of pizzas. \nPlease input a higher number"}
        if(Number(cartInfo[item].count) + Number(count) > 100){return "We can't sell you more than 100 of one pizza type. \nPlease input a lower number"}
    } else {
        if(count < 0 ){return "Please input a positive number"}
        if(count > 100){return "We can't sell you more than 100 of one pizza type. \nPlease input a lower number"}
    }
    return "none";
}

// Check what and how many products the user wants to add to cart.
function checkPurchase(itemName){ 
    
    // Convert orderList and orderedItems from string to object/array
    var cartItems = JSON.parse(localStorage.getItem("orderedItems")); 
    var cartInfo = JSON.parse(localStorage.getItem("orderList"));
    let itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);

    // Checks if input is empty then ends the functions
    if( itemCount === null || itemCount === "" || Number(itemCount) === 0) {return} 
    
    let failType = "none";
    // Tells the user what they did wrong then repeats the question if there is an invalid input
    failType = checkValidity(itemName.toLowerCase(), itemCount);
    while( failType !== "none") { 
        if(debug){console.log(failType)} // debug
        alert(failType);
        itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);
        if( itemCount === null || itemCount === "" || Number(itemCount) === 0) {return}
        failType = checkValidity(itemName.toLowerCase(), itemCount);
    }
    
    // Ask the user whether they want to add the item to the cart
    if( confirm(`This will cost $${itemCount * getpizzas()[itemName.toLowerCase()]}.\nAre you sure you want to add to cart?`)) { 
    if(debug){console.log(localStorage.orderedItems.includes(itemName.toLowerCase()))}; // debug
    if(debug){console.log(`updated orderedItems - ${JSON.parse(localStorage.getItem("orderedItems"))}`)} // debug

    // Updates the already existing item if it is already in cart
    if(cartItems.includes(itemName.toLowerCase())){ 
        if(debug){console.log(`${itemName} in orderList`)}; // debug
        cartInfo[itemName.toLowerCase()].count += Number(itemCount);
        if(debug){console.log(`${cartInfo[itemName.toLowerCase()]["count"]}`)}; // debug
        cartInfo[itemName.toLowerCase()].cost = cartInfo[itemName.toLowerCase()].count * getpizzas()[itemName.toLowerCase()];
        if(debug){console.log("updating orderList")}; // debug
        if(debug){console.log(`updated cartInfo - ${cartInfo[itemName.toLowerCase()]["count"]}`)}; // debug
    }

    // Adds the item and the its info to the cart
    else {
        if(debug){console.log(`adding ${itemName} to orderList`)}  // debug
        cartInfo[itemName.toLowerCase()] = {"cost" : Number(itemCount * getpizzas()[itemName.toLowerCase()]), "count" : Number(itemCount)};
        cartItems.push(itemName.toLowerCase());
        if(debug){console.log(`updated cartItems - ${cartItems}`)}; // debug
        if(debug){console.log(`updated cartInfo - ${cartInfo[itemName.toLowerCase()]["count"]}`)}; // debug
    }
    
    // Convert the local info into localStorage info
    localStorage.setItem("orderList", JSON.stringify(cartInfo)); 
    localStorage.setItem("orderedItems", JSON.stringify(cartItems));
    if(debug){console.log(`updated orderedItems - ${JSON.parse(localStorage.getItem("orderedItems"))}`)}; // debug
    if(debug){console.log(`updated orderList - ${JSON.parse(localStorage.getItem("orderList"))[itemName.toLowerCase()]["count"]}`)}; // debug
    }
}

// Runs the functions declared above either when the page loads or when the associated item is clicked
document.addEventListener("DOMContentLoaded", () => {
    console.log("page loaded");

    // Add all the HTML items for the user to see when the page loads
    for(let pizza in getpizzas()) {
        if(debug){console.log(`Creating ${pizza} menu item`)}
        createMenu(pizza);
    };

    // Adds a check to each menu item so when they are clicked they run the checkPurchase function to add the item to the cart
    document.querySelectorAll(".menuItem").forEach(menuItem => {
        if(debug){console.log("adding lister")}; // debug  
        menuItem.addEventListener("click", function() {
            let itemName = this.querySelector("h1").textContent;
            if(debug){console.log("clicking")}; // debug
            if(debug){console.log(`debug - ${debug}`)}; // debug
            checkPurchase(itemName);
        });
    });
});

// End add item component }