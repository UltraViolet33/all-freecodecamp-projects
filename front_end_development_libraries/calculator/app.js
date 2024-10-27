let buttonValue;
const screenResult = document.getElementById("display");
const equalButton = document.getElementById("equals");
const buttons = document.getElementsByClassName("button");

let operation = [];
const operators = ["+", "-", "x", "/"];

function checkInput(input) {
  if (input == "." && checkIfLastElementIsDecimal()) {
    return false;
  }

  if (operation.length < 1 && input == "0") {
    return false;
  }

  return true;
}

function checkIfLastElementIsDecimal() {
  return operation.slice(-1)[0].includes(".");
}

function getInput(input) {
  if (checkInput(input)) {
    if (
      operators.includes(input) ||
      operation.length == 0 ||
      operators.includes(operation.slice(-1)[0])
    ) {
      operation.push(input.toString());
    } else {
      operation[operation.length - 1] = `${operation.slice(-1)}${input}`;
    }
  }

  if (operation.length > 0) {
    displayInput();
  }
}

function reset() {
  screenResult.textContent = "0";
  operation = [];
}

function displayInput() {
  let operationStr = operation.join("");
  screenResult.textContent = operationStr;
}

function doOperation() {
  let currentResult = operation[0];
  let operator;
  let number2 = "";
  let neg = false;

  for (let i = 1; i < operation.length; i++) {
    if (operators.includes(operation[i])) {
      if (operator != undefined && operation[i] == "-") {
        neg = true;
      } else {
        operator = operation[i];
        neg = false;
      }
    } else {
      number2 = operation[i];
      number2 = neg ? `-${number2}` : number2;
      currentResult = operate(currentResult, operator, number2);
      operator = undefined;
      currentResult = currentResult.toString();
    }
  }

  return currentResult;
}

function operate(number1, operator, number2) {
  if (number1.includes(".")) {
    number1 = parseFloat(number1);
  } else {
    number1 = parseInt(number1);
  }

  if (number2.includes(".")) {
    number2 = parseFloat(number2);
  } else {
    number2 = parseInt(number2);
  }

  if (operator == "+") {
    return number1 + number2;
  } else if (operator == "-") {
    return number1 - number2;
  } else if (operator == "x") {
    return number1 * number2;
  } else if (operator == "/") {
    return number1 / number2;
  }
}

equalButton.addEventListener("click", function () {
  if (operation.length > 0) {
    let result = doOperation();
    screenResult.textContent = result;
    operation = [result.toString()];
  }
});
