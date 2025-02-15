import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('numberInput');
  const buttons = document.querySelectorAll('.numberButton');
  const clearButton = document.getElementById('clear');
  const backspaceButton = document.getElementById('backspace');
  const equalsButton = document.getElementById('equals');
  const decimalButton = document.getElementById('decimal');
  const expandButton = document.getElementById('expand');
  const additionalButtons = document.querySelectorAll('.additionalButton');
  const operators = ['+', '-', '*', '/'];
  const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape', 'c', 'C', 'о', 'О', '£', 's', 'S', 'і', 'І'];
  let firstEqualsClick = true;

  const canAddDecimal = () => {
    const parts = inputField.value.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    return !lastPart.includes('.');
  };

  const handleButtonClick = (button) => {
    if (!['clear', 'backspace', 'equals', 'decimal', 'expand'].includes(button.id) && !button.dataset.function) {
      if (inputField.value === '0' && button.textContent !== '0' && !inputField.value.includes('.')) {
        inputField.value = '0.';
      } else if (inputField.value.endsWith('0') && !inputField.value.includes('.') && !operators.includes(button.textContent)) {
        inputField.value = inputField.value.slice(0, -1) + '0.';
      }
      if (operators.includes(button.textContent) && operators.includes(inputField.value.slice(-1))) {
        return;
      }
      inputField.value += button.textContent;
    } else if (button.id === 'decimal' && canAddDecimal()) {
      inputField.value += '.';
    } else if (button.dataset.function) {
      if (inputField.value && !operators.includes(inputField.value.slice(-1))) {
        inputField.value += ')';
      }
      inputField.value += button.dataset.function + '(';
    }
    button.classList.remove('active');
    void button.offsetWidth; // Trigger reflow
    button.classList.add('active');
  };

  const handleFunction = (expression, func) => {
    const match = expression.match(new RegExp(`${func}\\((\\d+(\\.\\d+)?)\\)`));
    if (match) {
      const value = parseFloat(match[1]);
      if (isNaN(value)) {
        return 'Error';
      } else {
        switch (func) {
          case '√':
            return expression.replace(match[0], Math.sqrt(value).toString());
          case 'sin':
            return expression.replace(match[0], Math.sin(value).toString());
          case 'cos':
            return expression.replace(match[0], Math.cos(value).toString());
          case 'tan':
            return expression.replace(match[0], Math.tan(value).toString());
          case 'log':
            return expression.replace(match[0], Math.log(value).toString());
          default:
            return expression;
        }
      }
    }
    return expression;
  };

  const handleFunctions = (expression) => {
    const functions = ['√', 'sin', 'cos', 'tan', 'log'];
    functions.forEach(func => {
      expression = handleFunction(expression, func);
    });
    return expression;
  };

  const toggleAdditionalButtons = () => {
    additionalButtons.forEach(button => {
      button.classList.toggle('hidden');
    });
  };

  buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button));
  });

  clearButton.addEventListener('click', () => {
    inputField.value = '';
    clearButton.classList.remove('active');
    void clearButton.offsetWidth; // Trigger reflow
    clearButton.classList.add('active');
  });

  backspaceButton.addEventListener('click', () => {
    inputField.value = inputField.value.slice(0, -1);
    backspaceButton.classList.remove('active');
    void backspaceButton.offsetWidth; // Trigger reflow
    backspaceButton.classList.add('active');
  });

  equalsButton.addEventListener('click', () => {
    if (firstEqualsClick || inputField.value.trim() === '') {
      firstEqualsClick = false;
      inputField.value = '0';
      return;
    }
    try {
      let expression = inputField.value;
      expression = handleFunctions(expression);
      inputField.value = eval(expression.replace(/(\.0+|(\.\d+?)0+)$/, '$2'));
    } catch (e) {
      inputField.value = 'Error';
    }
    equalsButton.classList.remove('active');
    void equalsButton.offsetWidth; // Trigger reflow
    equalsButton.classList.add('active');
  });

  decimalButton.addEventListener('click', () => {
    if (canAddDecimal()) {
      inputField.value += '.';
    }
    decimalButton.classList.remove('active');
    void decimalButton.offsetWidth; // Trigger reflow
    decimalButton.classList.add('active');
  });

  expandButton.addEventListener('click', () => {
    toggleAdditionalButtons();
    expandButton.classList.remove('active');
    void expandButton.offsetWidth; // Trigger reflow
    expandButton.classList.add('active');
  });

  additionalButtons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button));
  });

  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (!validKeys.includes(key)) {
      event.preventDefault();
      return;
    }
    let button;
    if (operators.includes(key) && operators.includes(inputField.value.slice(-1))) {
      return;
    }
    switch (key) {
      case '0':
        if (inputField.value === '0' && !inputField.value.includes('.')) {
          inputField.value = '0.';
        } else if (inputField.value.endsWith('0') && !inputField.value.includes('.')) {
          inputField.value = inputField.value.slice(0, -1) + '0.';
        } else {
          inputField.value += key;
        }
        button = document.querySelector(`.numberButton[id="${key}"]`);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (inputField.value === '0' && !inputField.value.includes('.')) {
          inputField.value = '0.';
        } else if (inputField.value.endsWith('0') && !inputField.value.includes('.')) {
          inputField.value = inputField.value.slice(0, -1) + '0.';
        }
        inputField.value += key;
        button = document.querySelector(`.numberButton[id="${key}"]`);
        break;
      case '+':
        inputField.value += key;
        button = document.getElementById('add');
        break;
      case '-':
        inputField.value += key;
        button = document.getElementById('subtract');
        break;
      case '*':
        inputField.value += key;
        button = document.getElementById('multiply');
        break;
      case '/':
        inputField.value += key;
        button = document.getElementById('divide');
        break;
      case 'enter':
        if (firstEqualsClick || inputField.value.trim() === '') {
          firstEqualsClick = false;
          inputField.value = '0';
          return;
        }
        try {
          let expression = inputField.value;
          expression = handleFunctions(expression);
          inputField.value = eval(expression.replace(/(\.0+|(\.\d+?)0+)$/, '$2'));
        } catch (e) {
          inputField.value = 'Error';
        }
        button = equalsButton;
        break;
      case 'backspace':
        inputField.value = inputField.value.slice(0, -1);
        button = backspaceButton;
        break;
      case 'escape':
        inputField.value = '';
        button = clearButton;
        break;
      case '.':
        if (canAddDecimal()) {
          inputField.value += '.';
        }
        button = decimalButton;
        break;
      case 'c':
      case 'о':
        inputField.value = '';
        button = clearButton;
        break;
      case '£':
      case 's':
      case 'і':
        toggleAdditionalButtons();
        button = expandButton;
        break;
      default:
        break;
    }
    if (button) {
      button.classList.remove('active');
      void button.offsetWidth; // Trigger reflow
      button.classList.add('active');
    }
  });
});
