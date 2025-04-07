import { getpizzas } from "./global.js";

export function checkPurchase(itemName){ // Check what and how many products the user wants to purchase.
    let itemCount = prompt(`How many ${itemName} pizzas do you want to purchase?`);
    if( itemCount == null || itemCount == "") {return} // checks if input is empty
    while(isNaN(itemCount) || itemCount % 1 != 0) {
        alert("Please input a whole number");
        itemCount = prompt(`How many ${itemName} pizzas do you want to add to cart?`);
    }
    confirm(`This will cost $${itemCount * getpizzas()[itemName.toLowerCase()]}. Are you sure you want to add to cart?`);
    if(debug){console.log(orderedItems.includes(itemName.toLowerCase()))};
    if(orderedItems.includes(itemName.toLowerCase())){
        if(debug){console.log(`${itemName} in orderList`)}
        orderList[itemName.toLowerCase()].count += Number(itemCount);
        if(debug){typeof orderList[itemName.toLowerCase()].count}
        orderList[itemName.toLowerCase()].cost = orderList[itemName.toLowerCase()].count * getpizzas()[itemName.toLowerCase()];
        if(debug){console.log("updating orderList")} // updating ordered item in orderList for new items added
        if(debug){console.log(`updated orderList - ${orderList[itemName.toLowerCase()]["count"]}`)}
    }
    else {
        if(debug){console.log(`adding ${itemName} to orderList`)} // adding a new item to the orderList
        orderList[itemName.toLowerCase()] = {"cost" : Number(itemCount * getpizzas()[itemName.toLowerCase()]), "count" : Number(itemCount)};
        orderedItems.push(itemName.toLowerCase());
        if(debug){console.log(`updated orderedItems - ${orderedItems}`)}
        if(debug){console.log(`updated orderList - ${orderList[itemName.toLowerCase()]["count"]}`)}
    }
}

document.addEventListener("DOMContentLoaded", () => { // checks if page content is loaded
    if(debug){console.log("page loaded")}
    document.querySelectorAll(".menuitem").forEach(menuItem => { // creates a nodeList for each element with the menuitem class referred to as menuItem (like iterating through an array)
        if(debug){console.log("adding lister")}
        menuItem.addEventListener("click", function() { // adds a check to the current menuItem that checks whenever it is clicked
            let itemName = this.querySelector("h1").textContent; // searches for the h1 element within the text of the div to find the name which is then called with itemName
            if(debug){console.log("clicking")}
            if(debug){console.log(`debug - ${debug}`)}
            checkPurchase(itemName); // runs checkPurchase()
        });
    });
});