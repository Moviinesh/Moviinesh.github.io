// script.js

let display = document.getElementById('display');

// Append numbers to the display
function appendNumber(number) {
    // If the display shows "0", replace it. Otherwise, append the number.
    if (display.value === "0" || display.value === 'Error') {
        display.value = number;
    } else {
        display.value += number;
    }
}

// Append operators to the display
function appendOperator(operator) {
    // Prevent multiple operators in sequence
    const lastChar = display.value.charAt(display.value.length - 1);
    if ("+-*/".includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator; // Replace the last operator with the new one
    } else {
        display.value += operator; // Append a new operator
    }
}

// Clear the display
function clearDisplay() {
    display.value = '0'; // Reset the display to 0
}

// Calculate the result and handle division by zero properly
function calculateResult() {
    try {
        const result = eval(display.value.trim()); // Evaluate the expression
        
        // Check if the result is Infinity or -Infinity (which means division by zero)
        if (result === Infinity || result === -Infinity) {
            display.value = 'Error'; // Show error for division by zero
        } else {
            display.value = result; // Show the result
        }
    } catch (error) {
        display.value = 'Error'; // Show error for invalid expressions
    }
}

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Check if the key pressed is a number, operator or calculation trigger
    if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter') {
        if (key === 'Enter') {
            calculateResult(); // Trigger calculation on the Enter key
        } else {
            appendNumber(key); // Append number to the display
            if (key === '+' || key === '-' || key === '*' || key === '/') {
                appendOperator(key); // Append operator accordingly
            }
        }
    }

    // Clear the display on 'C' key
    if (key === 'c' || key === 'C') {
        clearDisplay(); // Clear the display when 'C' is pressed
    }
});
