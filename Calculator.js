let currentOperand = '';  // What we are typing
    let previousOperand = ''; // Last number we typed
    let operation = null;     // The operation (+, -, *, /)

    const screen = document.getElementById('screen');

    function appendNumber(number) {
        if (currentOperand.includes('.') && number === '.') return; // Avoid multiple decimals
        currentOperand += number;
        updateScreen();
    }

    function appendDecimal() {
        if (!currentOperand.includes('.')) {
            currentOperand += '.';
            updateScreen();
        }
    }

    function setOperation(op) {
        if (currentOperand === '' && previousOperand === '') return; // Prevent setting operation with empty operands
        if (currentOperand === '' && previousOperand !== '') {
            operation = op; // Change operation if only previousOperand is present
            updateScreen();
            return;
        }
        if (currentOperand !== '') {
            previousOperand = previousOperand ? `${previousOperand} ${operation} ${currentOperand}` : currentOperand;
            operation = op;
            currentOperand = '';
        }
        updateScreen();
    }

    function compute() {
        if (currentOperand === '' || previousOperand === '') return;

        let result;
        const prev = parseFloat(previousOperand.split(' ').pop());
        const current = parseFloat(currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentOperand = result;
        previousOperand = '';
        operation = null;
        updateScreen();
    }

    function clearScreen() {
        currentOperand = '';
        previousOperand = '';
        operation = null;
        updateScreen();
    }

    function calculateSquare() {
        if (currentOperand === '') return;
        currentOperand = (parseFloat(currentOperand) ** 2).toString();
        updateScreen();
    }

    function calculatePercentage() {
        if (currentOperand === '') return;
        currentOperand = (parseFloat(currentOperand) / 100).toString();
        updateScreen();
    }

    function backspace() {
        currentOperand = currentOperand.slice(0, -1);
        updateScreen();
    }

    function updateScreen() {
        let display = previousOperand;
        if (operation && currentOperand) {
            display += ` ${operation} ${currentOperand}`;
        } else if (currentOperand) {
            display = currentOperand;
        }
        screen.innerText = display || '0';
    }