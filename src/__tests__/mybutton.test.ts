/**
 * @jest-environment jsdom
 */

 import '@testing-library/jest-dom'
 import MyButton from '../lib/mybutton.svelte';
 import { render, fireEvent } from '@testing-library/svelte';

test("Button exists", () => {
    const {getByRole} = render(MyButton);
    const button = getByRole("button");
    expect(button).toBeVisible();
})

test("Button and Value are in the document", () => {
    const myButton = render(MyButton);

    const button = myButton.getByRole("button");
    expect(button).toBeVisible();

    const textValue = myButton.getByTestId("value");
    expect(textValue).toBeVisible();
})

test("Color is blue", () => {
    const myButton = render(MyButton);
    const button = myButton.getByRole("button");
    expect(button).toHaveClass("blue");
})

test("Color value red if < 0", () => {
    const myButton = render(MyButton, {value: -1});
    const textValue = myButton.getByTestId("value");
    expect(textValue).toHaveTextContent("-1");
    expect(textValue).toHaveStyle(`
        background-color:red;
        color:white;
    `)
})

test("Color value green if >= 0", () => {
    const myButton = render(MyButton, {value: 1});
    const textValue = myButton.getByTestId("value");
    expect(textValue).toHaveTextContent("1");
    expect(textValue).toHaveStyle(`
        background-color:green;
        color:yellow;
    `);
})

test("Random number on Click", async () => {
    const myButton = render(MyButton);
    const button = myButton.getByRole("button");
    await fireEvent.click(button);

    const randomNumber = myButton.getByTestId("random-value");
    expect(randomNumber).toBeInTheDocument();
    expect(randomNumber).not.toBeVisible();
    expect(randomNumber).toHaveTextContent(/(.|\s)*\S(.|\s)*/);  
})

test("Change value on Click", async () => {
    const myButton = render(MyButton);
    const button = myButton.getByRole("button");
    const valueOriginal = parseInt(myButton.getByTestId("value").textContent);

    await fireEvent.click(button);

    const randomNumber = parseInt(myButton.getByTestId("random-value").textContent);
    const valueResult = myButton.getByTestId("value");

    const valueExpected = valueOriginal + randomNumber;
    expect(valueResult).toHaveTextContent(`${valueExpected}`);
})