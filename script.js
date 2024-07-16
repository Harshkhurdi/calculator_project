let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let currentOperation = null;

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
}

updateDisplay();

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    currentOperation = null;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand === true) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (waitingForSecondOperand === true) {
        displayValue = '0.';
        waitingForSecondOperand = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (currentOperation && waitingForSecondOperand) {
        currentOperation = nextOperator;
        return;
    }

    if (firstOperand == null) {
        firstOperand = inputValue;
    } else if (currentOperation) {
        const result = performCalculation[currentOperation](firstOperand, inputValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    currentOperation = nextOperator;
    updateDisplay();
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '%': (firstOperand) => firstOperand / 100,
    '+/-': (firstOperand) => firstOperand * -1,
};

function setOperation(operation) {
    const inputValue = parseFloat(displayValue);

    if (currentOperation && waitingForSecondOperand) {
        currentOperation = operation;
        return;
    }

    if (firstOperand == null) {
        firstOperand = inputValue;
    } else if (currentOperation) {
        const result = performCalculation[currentOperation](firstOperand, inputValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    currentOperation = operation;
    updateDisplay();
}

function calculateResult() {
    if (currentOperation && !waitingForSecondOperand) {
        const inputValue = parseFloat(displayValue);
        const result = performCalculation[currentOperation](firstOperand, inputValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
        currentOperation = null;
        waitingForSecondOperand = true;
    }
    updateDisplay();
}