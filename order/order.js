import { getpizzas } from "../global/global.js";
var debug = JSON.parse(localStorage.getItem("debug"));
var cartEmpty = false;


// Show cart component {

// Creates a GUI for each item in the cart
function addCartItem(name, cost, count) {
    if(debug){console.log(`name: ${name}, cost: ${cost}, count: ${count}`)} // debug
    var newItem = document.createElement("div");
    newItem.className = "cartItem";
    newItem.id = `${name}Pizza`
    var itemImg = document.createElement("img");
    itemImg.src = `../images/${name.replace(" ", "-")}-pizza.png`;
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
    // Disables the button if its more than 99
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
    newBin.src = "../images/trash-item.png";
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

// }

// Remove item component {

// Removes the GUI for the items
function removeCartItem(name) {     
    let cartItem = document.getElementById(`${name}Pizza`);
    if(debug){cartItem} // debug
    cartItem.remove();
}

function removeItem(item) {
    
    // Convert orderList and orderedItems from string to object/array
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 
    var cartItems = JSON.parse(localStorage.getItem("orderedItems"));
    
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

// }

function updatePrice() {
    
    // Convert orderList and orderedItems from string to object/array
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 
    var cartItems = JSON.parse(localStorage.getItem("orderedItems")); 
    
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

// Increase item component {

function increaseItem(item) {
    // Convert orderList from string to object
    var cartInfo = JSON.parse(localStorage.getItem("orderList"));

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

// }

// Decrease item component {

function decreaseItem(item) {
    // Convert orderList from string to object
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 

    // Get all the impoortant HTML elements
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

    // Update the text of the items countBox
    if ( cartInfo[thisItem.id.replace("Pizza", "")].count - 1 !== 0 ) {
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

// }

// Complete purchase component {

function completePurchase() {
    // Convert orderList and orderedItems from string to object/array
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 
    
    // Calculate the the total price
    var totalCost = 0;
    for ( let i in cartInfo) {
        totalCost += cartInfo[i].cost;
    }

    // Reset the cart if the user's confirms
    if(confirm(`Do you want to complete purchase \nThis will cost $${totalCost}`)){
        for (let i in cartInfo) {
            if(debug){console.log("item removed")}; // debug
            removeItem(i);
        }
        alert("We thank you for attempting to purchase on our demo website. \nUnfourtunately this demo doesn't allow user's to spend money so your pizza doesn't exist and won't arrive. \nHave a good day :)");
    }
}

// }

// Runs all the functions declared above either when the page loads or when the associated button is clicked
document.addEventListener("DOMContentLoaded", () => {
    if(debug){console.log("page loaded")} // debug

    // Convert orderList and orderedItems from string to object/array
    var cartItems = JSON.parse(localStorage.getItem("orderedItems")); 
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 

    // Add all the HTML items for the user to see when the page loads
    for (let i in cartInfo) {
        if(debug){console.log("item added")}; // debug
        addCartItem(i, cartInfo[i].cost, cartInfo[i].count);
    }
    updatePrice();
    
    // Add a check to the clear button so that when clicked the cart is emptied
    document.querySelector("#clearBox").addEventListener("click", function() {
        if(!cartEmpty){
            for (let i in cartInfo) {
                if(debug){console.log("item removed")}; // debug
                removeItem(i);
                cartInfo = JSON.parse(localStorage.getItem("orderList"));
            }
        }
    });

    // Add a check to the purchase button so that when clicked the user may complete the purchase and clear the cart
    document.querySelector("#buyButton").addEventListener("click", function() {
        if(!cartEmpty){
            completePurchase();
            cartInfo = JSON.parse(localStorage.getItem("orderList"));
        }
    });

    // Add a check to each bin icon so that when clicked it removes the associated item
    document.querySelectorAll(".rubbish").forEach(bin => { 
        if(debug){console.log("adding lister")};
        bin.addEventListener("click", function() {
            let thisItem = this.closest(".cartItem");
            if(confirm(`Are you sure you want to remove your ${thisItem.id.replace("Pizza", "")} pizza(s) from the cart.`)) {
                removeItem(thisItem.id.replace("Pizza", ""));
                cartInfo = JSON.parse(localStorage.getItem("orderList"));
            }
        });
    });

    // Add a check to each increase button so that when clicked it increments the associated item's count by one
    document.querySelectorAll(".addItem").forEach(adder => { 
        adder.addEventListener("click", function() {
            increaseItem(this);
            cartInfo = JSON.parse(localStorage.getItem("orderList"));
        });
    });

    // Add a check to each decrease button so that when clicked it decrements the associated item's count by one
    document.querySelectorAll(".removeItem").forEach(reducer => { 
        reducer.addEventListener("click", function() {
            decreaseItem(this);
            cartInfo = JSON.parse(localStorage.getItem("orderList"));
        });
    });
});