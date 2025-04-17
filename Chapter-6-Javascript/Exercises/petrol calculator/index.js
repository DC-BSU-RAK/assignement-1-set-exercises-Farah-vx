// when the window finishes loading, this runs
window.onload = () => {
    // selects all input elements on the page
    const inputs = document.querySelectorAll("input");

    // attaches a click event listener to the button to trigger the calculation
    button.addEventListener("click", calculate);
}

// function that calculates the total amount
function calculate () {
    // gets the value from the petrol price input
    const Petrol_Price = document.querySelector('#Petrol_Price').value;

    // gets the value from the liters input
    const liters = document.querySelector('#liters').value;

    // if either input is empty, stop the function from running
    if (!Petrol_Price || !liters) return;

    // calculates the total cost by multiplying the price and litres
    const total = Petrol_Price * liters;

    // formats the total to two decimal places with AED currency
    const formated = `AED ${total.toFixed(2)}`;

    // updates the text inside the span with the total amount (note: not using formatted version here)
    document.querySelector('#totalAmount').innerText = Petrol_Price * liters;
}
