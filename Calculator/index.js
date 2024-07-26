function appendToDisplay(value){
    document.getElementById('display').value += value;
}

function clearDisplay(){
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display').value;
    const result = evaluateExpression(display);
    document.getElementById('display').value = result;
}

function evaluateExpression(expression) {
    // Split the expression into numbers and operators
    const tokens = expression.match(/(\d+|\D)/g);
    if (!tokens) return 'Error';

    const values = [];
    const operators = [];

    for (let token of tokens) {
        if (!isNaN(token)) {
            values.push(Number(token));
        } else {
            while (operators.length && precedence(operators[operators.length - 1]) >= precedence(token)) {
                const right = values.pop();
                const left = values.pop();
                const op = operators.pop();
                values.push(applyOperator(left, right, op));
            }
            operators.push(token);
        }
    }

    while (operators.length) {
        const right = values.pop();
        const left = values.pop();
        const op = operators.pop();
        values.push(applyOperator(left, right, op));
    }

    return values[0];
}

function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}

function applyOperator(left, right, op) {
    switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        default: return 0;
    }
}