let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

// Add number to display
function appendNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (number === "." && currentNumber === "") {
        currentNumber = "0.";
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

// Select operator
function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;

    previousNumber = currentNumber;
    currentNumber = "";

    updateDisplay();
}

// Calculate result
function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === "") {
        return;
    }

    let previous = parseFloat(previousNumber);
    let current = parseFloat(currentNumber);
    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentDisplay.innerText = "Error";
                previousDisplay.innerText = "Cannot divide by zero";
                currentNumber = "";
                previousNumber = "";
                operator = "";
                return;
            }

            result = previous / current;
            break;

        case "%":
            result = previous % current;
            break;
    }

    currentNumber = Number(result.toFixed(10)).toString();
    previousNumber = "";
    operator = "";

    updateDisplay();
}

// Clear calculator
function clearCalculator() {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    updateDisplay();
}

// Delete last digit
function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}

// Update calculator display
function updateDisplay() {

    currentDisplay.innerText = currentNumber || "0";

    if (operator && previousNumber) {
        previousDisplay.innerText =
            `${previousNumber} ${getOperatorSymbol(operator)}`;
    } else {
        previousDisplay.innerText = "";
    }
}

// Convert operator symbols
function getOperatorSymbol(operator) {

    switch (operator) {
        case "*":
            return "×";

        case "/":
            return "÷";

        case "-":
            return "−";

        case "+":
            return "+";

        case "%":
            return "%";

        default:
            return "";
    }
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    }

    // Operators
    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("*");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperator("/");
    }

    else if (key === "%") {
        chooseOperator("%");
    }

    // Enter = Calculate
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Backspace = Delete
    else if (key === "Backspace") {
        deleteNumber();
    }

    // Escape = Clear
    else if (key === "Escape") {
        clearCalculator();
    }
});