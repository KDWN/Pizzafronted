// for debugging
var debug = false
window.debug = debug

export const pizzas = {
    //  pizza name (String) : pizza price (Number)
        "cheese" : 5,
        "pepperoni" : 8,
        "garlic cheese" : 7.5,
        "hawaiian" : 10,
        "margherita" : 10,
        "meat lovers" : 12.5
};

// calls pizzas for when we want to use it
export function getpizzas() {
    return pizzas;
}

if( JSON.parse(localStorage.getItem("orderedItems"))[0] ) {}
else {
    // holds what items have been ordered and all their information
    localStorage.setItem("orderList", JSON.stringify({}))
        // name : {cost : number, count : number}

    // holds the names of the ordered items without any excess data for quick checks
    localStorage.setItem("orderedItems", JSON.stringify([]));
        // Name (String);
}