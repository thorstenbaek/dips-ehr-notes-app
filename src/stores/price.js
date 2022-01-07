import { writable } from "svelte/store";

export const price = writable("");

export const fetchPrice = async () => {

    const response = await fetch(`http://localhost:3000/price.json`, {method: "GET"});
    if (response.ok) {
        const data = await response.json();
        price.set(data.price);
    }
}