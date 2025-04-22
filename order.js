import { getpizzas } from "./global.js";



document.addEventListener("DOMContentLoaded", () => {   
    console.log(`${JSON.parse(localStorage.getItem("orderedItems"))}`)
});