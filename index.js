import { defpizzas } from "./global";

//var menuitems = document.getElementById("cheese")

//menuitems.addEventListener("click", () => checkPurchase("cheese"))


export function checkPurchase(itemName){ // Check what and how many products the user wants to purchase.
    
    var item = document.getElementsByClassName("menu")
    var itemCount = prompt("How many " + itemName + " pizzas do you want to purchase?");
    if( itemCount == null || itemCount == "") {return} // checks if input is empty
    while(isNaN(itemCount) || itemCount % 1 != 0) {
        alert("Please input a whole number");
        itemCount = prompt("How many " + itemName + " pizzas do you want to purchase?");
    }
    confirm("This will cost $" + itemCount + " are you sure you want to purchase");
    alert(defpizzas())
}

