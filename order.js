import { getpizzas } from "./global.js";
var debug = JSON.parse(localStorage.getItem("debug"));
var cartEmpty = false;

function addCartItem(name, cost, count) {
    if(debug){console.log(`name: ${name}, cost: ${cost}, count: ${count}`)} // debug
    var newItem = document.createElement("div");
    newItem.className = "cartItem";
    newItem.id = `${name}Pizza`
    var itemImg = document.createElement("img");
    itemImg.src = `${name.replace(" ", "-")}-pizza.png`;
    itemImg.width = 200;
    var newRight = document.createElement("div");
    newRight.className = "rightInfo";
    var newNameBox = document.createElement("div");
    newNameBox.className = "nameBox";
    var newName = document.createElement("h1");
    var newNameText = document.createTextNode(`${name} pizza`);
    var newBottom = document.createElement("div");
    newBottom.className = "bottomInfo";
    var newBotLeft = document.createElement("div");
    newBotLeft.className = "botLeftInfo";
    var newDecreaseBox = document.createElement("div");
    newDecreaseBox.className = "removeItem";
    var newDecrease = document.createElement("p");
    var newDecreaseText = document.createTextNode("-");
    var newCountBox = document.createElement("div");
    newCountBox.className = "countBox";
    var newCount = document.createElement("p");
    var newCountText = document.createTextNode(count);
    var newIncreaseBox = document.createElement("div");
    newIncreaseBox.className = "addItem";
    if ( count > 99 ) {
        newIncreaseBox.classList.add("fullItem");
    }
    var newIncrease = document.createElement("p");
    var newIncreaseText = document.createTextNode("+");
    var newCostBox = document.createElement("div");
    newCostBox.className = "subCostBox";
    var newCost = document.createElement("p");
    var newCostText = document.createTextNode(`$${cost}`);
    var newDeleteBox = document.createElement("div");
    var newBin = document.createElement("img");
    newBin.className = "rubbish";
    newBin.src = "trash-item.png";
    newBin.width = 50;
    newDecrease.appendChild(newDecreaseText)
    newDecreaseBox.appendChild(newDecrease)
    newBotLeft.appendChild(newDecreaseBox);
    newCount.appendChild(newCountText);
    newCountBox.appendChild(newCount);
    newBotLeft.appendChild(newCountBox);
    newIncrease.appendChild(newIncreaseText)
    newIncreaseBox.appendChild(newIncrease)
    newBotLeft.appendChild(newIncreaseBox);
    newCost.appendChild(newCostText);
    newCostBox.appendChild(newCost);
    newBottom.appendChild(newBotLeft);
    newBottom.appendChild(newCostBox);
    newDeleteBox.appendChild(newBin);
    newBottom.appendChild(newDeleteBox);
    newName.appendChild(newNameText);
    newNameBox.appendChild(newName);
    newRight.appendChild(newNameBox);
    newRight.appendChild(newBottom);
    newItem.appendChild(itemImg);
    newItem.appendChild(newRight);
    document.getElementById("cartBox").appendChild(newItem);
}

function removeCartItem(name) {     
    let cartItem = document.getElementById(`${name}Pizza`);
    if(debug){cartItem} // debug
    cartItem.remove();
}

function removeItem(item) {
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    var cartItems = JSON.parse(localStorage.getItem("orderedItems")); // get the string version of the orderedItems array and then convert it back into an array
    if(debug){console.log(`deleting ${item} from orderList`)}; // debug
    delete cartInfo[item];
    if(debug){console.log(`deleting ${item} from orderedItems`)}; // debug
    cartItems = cartItems.filter(kept => kept !== item);
    if(debug){console.log(`cartItems - ${cartItems}`)}; // debug
    removeCartItem(item);
    localStorage.setItem("orderList", JSON.stringify(cartInfo));
    localStorage.setItem("orderedItems", JSON.stringify(cartItems));
    updatePrice();
}

function updatePrice() {
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    var cartItems = JSON.parse(localStorage.getItem("orderedItems")); // get the string version of the orderedItems array and then convert it back into an array
    var totalCost = 0;
    var costText = document.getElementById("totalCostText");
    for ( let i in cartInfo ) {
        totalCost += cartInfo[i].cost;
    }
    try{
        cartInfo[cartItems[0]].cost;
        costText.innerHTML = `$${totalCost}`;
    }
    catch (error) {
        if(debug){console.log("empty-cart")} // debug
        document.getElementById("buyButton").className = "emptyCart";
        document.getElementById("clearBox").className = "emptyCart";
        costText.innerHTML = "Cart empty";
        cartEmpty = true;
    }
    if(debug){console.log(`cartEmpty - ${cartEmpty}`)} // debug
}

function increaseItem(item) {
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    let thisItem = item.closest(".cartItem");
    let thisBottom = item.closest(".bottomInfo");
    let thisBotLeft = item.closest(".botLeftInfo");
    let thisCountBox = thisBotLeft.childNodes[1];
    let thisCount = thisCountBox.childNodes[0];
    let thisCostBox = thisBottom.childNodes[1];
    let thisCost = thisCostBox.childNodes[0];
    if (item.classList.contains("fullItem")){
        return ;
    }
    cartInfo[thisItem.id.replace("Pizza", "")].count += 1;
    thisCount.innerHTML = cartInfo[thisItem.id.replace("Pizza", "")].count;
    cartInfo[thisItem.id.replace("Pizza", "")].cost += getpizzas()[thisItem.id.replace("Pizza", "")];
    thisCost.innerHTML = `$${cartInfo[thisItem.id.replace("Pizza", "")].cost}`;
    localStorage.setItem("orderList", JSON.stringify(cartInfo));
    updatePrice();
    if ( cartInfo[thisItem.id.replace("Pizza", "")].count > 99 ) {
        item.classList.add("fullItem");
    }
}

function decreaseItem(item) {
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    let thisItem = item.closest(".cartItem");
    let thisBottom = item.closest(".bottomInfo");
    let thisBotLeft = item.closest(".botLeftInfo");
    let thisCountBox = thisBotLeft.childNodes[1];
    let thisCount = thisCountBox.childNodes[0];
    let thisCostBox = thisBottom.childNodes[1];
    let thisCost = thisCostBox.childNodes[0];
    let thisAdder = thisBotLeft.childNodes[2];
    if (thisAdder.classList.contains("fullItem")){
        thisAdder.classList.remove("fullItem");
    }
    if ( cartInfo[thisItem.id.replace("Pizza", "")].count - 1 != 0 ) {
        cartInfo[thisItem.id.replace("Pizza", "")].count -= 1;
        thisCount.innerHTML = cartInfo[thisItem.id.replace("Pizza", "")].count;
        cartInfo[thisItem.id.replace("Pizza", "")].cost -= getpizzas()[thisItem.id.replace("Pizza", "")];
        thisCost.innerHTML = `$${cartInfo[thisItem.id.replace("Pizza", "")].cost}`;
        localStorage.setItem("orderList", JSON.stringify(cartInfo));
        updatePrice();
    } else {
        if(confirm(`Are you sure you want to remove your ${thisItem.id.replace("Pizza", "")} pizza from the cart.`)) {
            removeItem(thisItem.id.replace("Pizza", ""));
        }
    }
}

function completePurchase() {
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    var totalCost = 0;
    for ( let i in cartInfo) {
        totalCost += cartInfo[i].cost;
    }
    if(confirm(`Do you want to complete purchase \nThis will cost $${totalCost}`)){
        for (let i in cartInfo) {
            if(debug){console.log("item removed")}; // debug
            removeItem(i);
        }
        alert(`We thank you for attempting to purchase on our demo website. 
Unfourtunately this demo doesn't allow user's to spend money so your pizza doesn't exist and won't arrive. 
Have a good day :)`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("page loaded");

    var cartItems = JSON.parse(localStorage.getItem("orderedItems")); // get the string version of the orderedItems array and then convert it back into an array
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
    

    for (let i in cartInfo) {
        if(debug){console.log("item added")}; // debug
        addCartItem(i, cartInfo[i].cost, cartInfo[i].count);
    }
    updatePrice();
    
    document.querySelector("#clearBox").addEventListener("click", function() {
        if(!cartEmpty){
            for (let i in cartInfo) {
                if(debug){console.log("item removed")}; // debug
                removeItem(i);
                cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
            }
        }
    });

    document.querySelector("#buyButton").addEventListener("click", function() {
        if(!cartEmpty){
            completePurchase();
            cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
        }
    });

    document.querySelectorAll(".rubbish").forEach(bin => { // creates a nodeList for each element with the menuitem class referred to as menuItem (like iterating through an array)
        if(debug){console.log("adding lister")};
        bin.addEventListener("click", function() {
            let thisItem = this.closest(".cartItem");
            if(confirm(`Are you sure you want to remove your ${thisItem.id.replace("Pizza", "")} pizza(s) from the cart.`)) {
                removeItem(thisItem.id.replace("Pizza", ""));
                cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
            }
        });
    });

    document.querySelectorAll(".addItem").forEach(adder => { // creates a nodeList for each element with the menuitem class referred to as menuItem (like iterating through an array)
        adder.addEventListener("click", function() {
            increaseItem(this);
            cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
        });
    });

    document.querySelectorAll(".removeItem").forEach(reducer => { // creates a nodeList for each element with the menuitem class referred to as menuItem (like iterating through an array)
        reducer.addEventListener("click", function() {
            decreaseItem(this);
            cartInfo = JSON.parse(localStorage.getItem("orderList")); // get the string version of the orderList object and then convert it back into an object
        });
    });
});