<script lang="ts">
    import type { logDOM } from "@testing-library/svelte";
    import {onMount} from "svelte";
    import {fetchPrice, price} from "../stores/price"

    export let value: number = 0;    
    let randomValue: number = 0;

    onMount(async () => {
        await fetchPrice();
    });

    function getRandomInt(min: number, max: number) {
		const positive = Math.random() > 0.5 ? 1 : -1;
		return positive * Math.floor(Math.random() * (max - min) + min);
	}

    function buttonClick() {
        randomValue = getRandomInt(1, 100);
        value += randomValue;
    }
</script>

<div>
    <button class="blue" on:click={buttonClick}>Click me</button>
    <span data-testid="value" class="{value < 0 ? "red":"green"}">{value}</span>
    <span data-testid="random-value" class="hidden">{randomValue}</span>
    <h2>Price comes here</h2>
    <p>{$price}</p>
</div>

<style>
    .hidden {
        display: none;
    }

    .red {
        background-color: red;
        color: white;
    }
    .green {
        background-color: green;
        color: yellow;
    }
    .blue {
        background-color: blue;
        color: white;
    }
</style>