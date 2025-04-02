// for debugging
var debug = false
window.debug = debug

export const pizzas = {
    //  pizza name : pizza price
        "cheese" : 5,
        "pepperoni" : 8,
        "garlic cheese" : 7.5,
        "haiiwaian" : 10,
        "margherita" : 10,
        "meat lovers" : 12.5
};

// calls pizzas for when we want to use it
export function getpizzas() {
    return pizzas;
}

var orderList = {
    // {name : string, cost : number, count : number}
    // [name, cost, count]
    // *name : {cost : number, count : number}*
}

window.orderList = orderList

var orderedItems = [
    // Name
]

window.orderedItems = orderedItems