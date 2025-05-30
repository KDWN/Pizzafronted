import { getpizzas } from "../global/global.js";
var debug = JSON.parse(localStorage.getItem("debug"));
var cartEmpty = false;
var address;


// Show cart component {

// Creates a GUI for each item in the cart
function addCartItem(name, cost, count) {
    if(debug){console.log(`name: ${name}, cost: ${cost}, count: ${count}`)} // debug
    
    // Sets the HTML elements
    var newItem = document.createElement("div");
    newItem.className = "cartItem";
    newItem.id = `${name}Pizza`
    var itemImg = document.createElement("img");
    
    // Makes sure the image can be generated
    itemImg.src = `../images/${name.replace(" ", "-")}-pizza.png`;
    itemImg.onerror = () => {
        itemImg.src = "../images/unknown-pizza.png";
    }

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
    var newCount = document.createElement("input");
    newCount.className = "countInput";
    newCount.value = count;
    newCount.id = `${name}Counter`;
    var newIncreaseBox = document.createElement("div");
    newIncreaseBox.className = "addItem";
    
    // Disables the increase item button if its more than 99
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
    
    // Attaches the HTML elements to the page
    newDecrease.appendChild(newDecreaseText)
    newDecreaseBox.appendChild(newDecrease)
    newBotLeft.appendChild(newDecreaseBox);
    newBotLeft.appendChild(newCount);
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

// End show cart component }

// Remove item component {

// Removes the GUI for the items
function removeCartItem(name) {
    let cartItem = document.getElementById(`${name}Pizza`);
    if(debug){cartItem} // debug
    cartItem.remove();
}

// Removes the item from the cart
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

// End remove item component }

// Updates the displayed price and check if the cart is empty
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
        if ( address ) {
            totalCost += 3;
        }
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

// Input count component {

// Changes the value of the item to whatever the user inputted
function inputCount(input) {

    // Convert orderList from string to object
    var cartInfo = JSON.parse(localStorage.getItem("orderList"));

    var valid = /[0-9]/g;
    var value = Number(String(input.value.match(valid)).replaceAll(",",""));
    if ( isNaN(value) ) {
        value = 0;
    }
    if(debug){console.log(`value - ${value}`)} // debug

    // Get important HTML elements
    if(debug){console.log(typeof(value))} // debug
    let thisItem = input.closest(".cartItem").id.replace("Pizza", "");
    if(debug){console.log(thisItem)}
    let thisBottom = input.closest(".bottomInfo");
    let thisBotLeft = input.closest(".botLeftInfo");
    let thisCostBox = thisBottom.childNodes[1];
    let thisCost = thisCostBox.childNodes[0];
    let thisAdder = thisBotLeft.childNodes[2];

    // Enables the increase item button
    if (thisAdder.classList.contains("fullItem")){
        thisAdder.classList.remove("fullItem");
    }

    // Rounds the value if the user inputs a float
    if ( value % 1 !== 0 ) {
        value = Math.round(value);
    }

    // Limit the value to 100 and disable increasing if over 100
    if ( value > 100 ) {
        input.value = 100;
        value = 100;
        if(!thisAdder.classList.contains("fullItem")){
            thisAdder.classList.add("fullItem");
        }
    }

    // End function if below 1
    if ( value <= 0 ) {
        if(confirm(`Are you sure you want to remove your ${thisItem} pizza(s) from the cart.`)) {
            removeItem(thisItem);
        }
        return;
    }

    // Update the shown value incase of an invalid input
    input.value = value;
    
    // Updates JS and HTML to match the input
    cartInfo[thisItem].count = value;
    cartInfo[thisItem].cost = cartInfo[thisItem].count * getpizzas()[thisItem];
    if(debug){console.log(cartInfo[thisItem].cost)} // debug
    thisCost.innerHTML = `$${cartInfo[thisItem].cost}`;
    localStorage.setItem("orderList", JSON.stringify(cartInfo));
}

// End input count component }

// Increase item component {

// Increments the inputed item's count by one
function increaseItem(item) {
   
    // Convert orderList from string to object
    var cartInfo = JSON.parse(localStorage.getItem("orderList"));

    // Get nessacary HTML elements
    let thisItem = item.closest(".cartItem");
    let thisBottom = item.closest(".bottomInfo");
    let thisBotLeft = item.closest(".botLeftInfo");
    let thisCount = thisBotLeft.childNodes[1];
    let thisCostBox = thisBottom.childNodes[1];
    let thisCost = thisCostBox.childNodes[0];

    // Checks if button is disabled
    if (item.classList.contains("fullItem")){
        return ;
    }

    // Increments item count by one
    cartInfo[thisItem.id.replace("Pizza", "")].count += 1;
    thisCount.value = cartInfo[thisItem.id.replace("Pizza", "")].count;
    cartInfo[thisItem.id.replace("Pizza", "")].cost += getpizzas()[thisItem.id.replace("Pizza", "")];
    thisCost.innerHTML = `$${cartInfo[thisItem.id.replace("Pizza", "")].cost}`;
    localStorage.setItem("orderList", JSON.stringify(cartInfo));
    updatePrice();
    if ( cartInfo[thisItem.id.replace("Pizza", "")].count > 99 ) {
        item.classList.add("fullItem");
    }
}

// End increase item component }

// Decrease item component {

// Decrements the inputed item's count by one and update the text of the items countBox
function decreaseItem(item) {
    // Convert orderList from string to object
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 

    // Get neccesary HTML elements
    let thisItem = item.closest(".cartItem");
    let thisBottom = item.closest(".bottomInfo");
    let thisBotLeft = item.closest(".botLeftInfo");
    let thisCount = thisBotLeft.childNodes[1];
    let thisCostBox = thisBottom.childNodes[1];
    let thisCost = thisCostBox.childNodes[0];
    let thisAdder = thisBotLeft.childNodes[2];

    // Re-enables the increase item button
    if (thisAdder.classList.contains("fullItem")){
        thisAdder.classList.remove("fullItem");
    }

    // Decrement item count by one and update the text of the items countBox
    if ( cartInfo[thisItem.id.replace("Pizza", "")].count - 1 !== 0 ) {
        cartInfo[thisItem.id.replace("Pizza", "")].count -= 1;
        thisCount.value = cartInfo[thisItem.id.replace("Pizza", "")].count;
        cartInfo[thisItem.id.replace("Pizza", "")].cost -= getpizzas()[thisItem.id.replace("Pizza", "")];
        thisCost.innerHTML = `$${cartInfo[thisItem.id.replace("Pizza", "")].cost}`;
        localStorage.setItem("orderList", JSON.stringify(cartInfo));
        updatePrice();
    } 
    
    // Removes the item if it reaches zero
    else {
        if(confirm(`Are you sure you want to remove your ${thisItem.id.replace("Pizza", "")} pizza from the cart.`)) {
            removeItem(thisItem.id.replace("Pizza", ""));
        }
    }
}

// End decrease item component }

// Complete purchase component {

// Confirm's whether the user wants to pay for the item's in cart then clears the cart if they do
function completePurchase() {
    // Convert orderList and orderedItems from string to object/array
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 

    // Calculate the the total price
    var totalCost = 0;
    for ( let i in cartInfo) {
        totalCost += cartInfo[i].cost;
    }
    if ( address ) {
        totalCost += 3;
    }

    // Reset the cart and alert the user if they confirm the purchase
    if(confirm(`Do you want to complete purchase \nThis will cost $${totalCost}`)){
        if ( address ) {
            alert(`We thank you for attempting to purchase on our demo website. \nIf we actually sold anything we would text you the estimated time until your pizza arrives and if anything goes worng. \nUnfourtunately this demo doesn't allow users to spend money so your pizza doesn't exist and won't be delivered to ${address}. \nHave a good day :)`);
        }
        else {
            alert("We thank you for attempting to purchase on our demo website. \nIf we actually sold anything we would text you the estimated time until your pizza is ready and if anything goes worng. \nUnfourtunately this demo doesn't allow users to spend money so your pizza doesn't exist and you can't pick it up. \nHave a good day :)");
        }
            for (let i in cartInfo) {
            if(debug){console.log("item removed")}; // debug
            removeItem(i);
        }
    }
}

// End complete purchase component }

// Personal data component {

// Validate the user's phone number input and add dashes to look pretty
function addPhoneNum(input) {
    var valid = /[0-9]/g;
    var value = input.value;
    var midput = String(value.replace("-", "").match(valid)).replaceAll(",","");
    var output = midput;

    if ( value[value.length] === "-" ) {
        midput = midput.slice(0, -1);
    }
    if(debug){console.log(`1 - ${midput}`)} // debug

    if ( output === "null" ) {
        return "";
    }
    
    if ( midput.length >= 4 ) {
        output = `${midput.substring(0,3)}-${midput.substring(3,6)}`;
        if(debug){console.log(`2 - ${output} l = ${midput.length}`)} // debug
    }
    if ( midput.length >= 7 ) {
        if(debug){console.log(`3 - ${output} l = ${midput.length}`)} // debug
        output = `${output}-${midput.substring(6)}`;
    }
    if ( midput.length > 10 ) {
        if(debug){console.log(`4 - ${output} l = ${midput.length}`)} // debug
        output = output.substring(0,10);
    }
    if(debug){console.log(`Output - ${output}`)} // debug
    return output;
}

// Create/remove the address box if the delivery box is checked
function checkDelivery() {
    let state = document.getElementById("deliverCheck").checked;
    let container = document.getElementById("purchaseBox");
    if(debug){console.log(`state - ${state}`)} // debug
    if ( state === true ) {

        // Set up the address input field
        let addressBox = document.createElement("div");
        addressBox.id = "addressBox";
        let addressInput = document.createElement("input");
        addressInput.id = "addressInput";
        addressInput.placeholder = "Address:";
        addressBox.appendChild(addressInput);
        addressInput.addEventListener("input", function(){
            if(debug){console.log(addressInput.value)}
            address = addressInput.value;
            updatePrice();
        });
        
        // Attach the address input field
        container.insertBefore(addressBox, container.childNodes[8]);
    }
    else {
        // removes the address input field
        let addressBox = document.getElementById("addressBox");
        addressBox.remove();
    }
}

// End personal data component }


// Runs all the functions declared above either when the page loads or when the associated button is clicked
document.addEventListener("DOMContentLoaded", () => {
    if(debug){console.log("page loaded")} // debug

    // Convert orderList from string to object
    var cartInfo = JSON.parse(localStorage.getItem("orderList")); 

    // Set the phone number for later
    var phoneNumber;
    
    // Add all the HTML items for the user to see when the page loads
    for (let i in cartInfo) {
        if(debug){console.log("item added")}; // debug
        addCartItem(i, cartInfo[i].cost, cartInfo[i].count);
    }
    updatePrice();
    
    if(debug){console.log("adding listner")} // debug
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

    if(debug){console.log("adding listner")} // debug
    // Add a check to the purchase button so that when clicked the user may complete the purchase and clear the cart
    document.querySelector("#buyButton").addEventListener("click", function() {
        if(!cartEmpty){
            completePurchase();
            cartInfo = JSON.parse(localStorage.getItem("orderList"));
        }
    });
    
    if(debug){console.log("adding listner")} // debug
    // Add a check to the phone input so that the phoneNumber changes to the user's input
    document.querySelector("#phoneInput").addEventListener("input", function() {
        if(debug){console.log(`input - ${this.value}`)} // debug
        phoneNumber = addPhoneNum(this);
        this.value = phoneNumber;
        if(debug){console.log(`value - ${this.value}`)} // debug
    });

    if(debug){console.log("adding listner")} // debug
    // Add a check that creates the address box and sets delivery to true when the checkbox is check
    document.querySelector("#deliverCheck").addEventListener("input", function() {
        checkDelivery();
        updatePrice();
    });

    // Add a check to each bin icon so that when clicked it removes the associated item
    document.querySelectorAll(".rubbish").forEach(bin => { 
        if(debug){console.log("adding listner")} // debug
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
        if(debug){console.log("adding listner")}; // debug
        adder.addEventListener("click", function() {
            increaseItem(this);
            cartInfo = JSON.parse(localStorage.getItem("orderList"));
        });
    });

    // Add a check to each decrease button so that when clicked it decrements the associated item's count by one
    document.querySelectorAll(".removeItem").forEach(reducer => {  
        if(debug){console.log("adding listner")}; // debug
        reducer.addEventListener("click", function() {
            decreaseItem(this);
            cartInfo = JSON.parse(localStorage.getItem("orderList"));
        });
    });

    // Add a check to each count input so that everything changes to account for the user's input
    document.querySelectorAll(".countInput").forEach(input => { 
        if(debug){console.log("adding listner")} // debug
        input.addEventListener("input", function() {
            if(debug){console.log(`input - ${this.value}`)} // debug
            inputCount(this);
            cartInfo = JSON.parse(localStorage.getItem("orderList"));
            
            // Make sure the value is always atleast 1
            if(Number(this.value) <= 0){
                this.value = 1;
            }
            
            // Round the value if the user inputs a float
            if (Number(this.value) % 1 !== 0){
                this.value = Math.round(Number(this.value));
            }
            
            if(debug){console.log(`value - ${this.value}`)} // debug
            updatePrice();
        });
    });
});