// for debugging
try { JSON.parse(localStorage.getItem("debug"))}
catch {
    localStorage.setItem("debug", JSON.stringify(false));
}

export const pizzas = {
    //  pizza name (String) : pizza price (Number)
        "cheese" : 5,
        "pepperoni" : 8,
        "garlic cheese" : 7.5,
        "hawaiian" : 10,
        "margherita" : 10,
        "meat lovers" : 12.5
}

// calls pizzas for when we want to use it
export function getpizzas() {
    return pizzas;
}

// Checks if the variables exist in localStorage, then creates them if they don't
try { JSON.parse(localStorage.getItem("orderedItems"))[0] }
catch {
    // holds what items have been ordered and all their information
    localStorage.setItem("orderList", JSON.stringify({}));
        // name : {cost : number, count : number}

    // holds the names of the ordered items without any excess data for quick checks
    localStorage.setItem("orderedItems", JSON.stringify([]));
        // Name (String);
}