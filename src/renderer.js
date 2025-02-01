import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('numberInput');
  const buttons = document.querySelectorAll('.numberButton');
  const clearButton = document.getElementById('clear');
  const backspaceButton = document.getElementById('backspace');
  const equalsButton = document.getElementById('equals');
  const decimalButton = document.getElementById('decimal');
  const openBracketButton = document.getElementById('openBracket');
  const closeBracketButton = document.getElementById('closeBracket');
  const operators = ['+', '-', '*', '/'];
  const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '(', ')', '.', 'Enter', 'Backspace', 'Escape', 'c', 'C', 'о', 'О'];
  let firstEqualsClick = true;

  const canAddDecimal = () => {
    const parts = inputField.value.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    return !lastPart.includes('.');
  };

  const handleButtonClick = (button) => {
    if (button.id !== 'clear' && button.id !== 'backspace' && button.id !== 'equals' && button.id !== 'decimal' && button.id !== 'openBracket' && button.id !== 'closeBracket') {
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
    }
    button.classList.remove('active');
    void button.offsetWidth; // Trigger reflow
    button.classList.add('active');
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
      inputField.value = eval(inputField.value.replace(/(\.0+|(\.\d+?)0+)$/, '$2'));
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

  openBracketButton.addEventListener('click', () => {
    inputField.value += '(';
    openBracketButton.classList.remove('active');
    void openBracketButton.offsetWidth; // Trigger reflow
    openBracketButton.classList.add('active');
  });

  closeBracketButton.addEventListener('click', () => {
    inputField.value += ')';
    closeBracketButton.classList.remove('active');
    void closeBracketButton.offsetWidth; // Trigger reflow
    closeBracketButton.classList.add('active');
  });

  document.addEventListener('keydown', (event) => {
    const key = event.key;
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
      case '(':
        inputField.value += key;
        button = openBracketButton;
        break;
      case ')':
        inputField.value += key;
        button = closeBracketButton;
        break;
      case 'Enter':
        if (firstEqualsClick || inputField.value.trim() === '') {
          firstEqualsClick = false;
          inputField.value = '0';
          return;
        }
        try {
          inputField.value = eval(inputField.value.replace(/(\.0+|(\.\d+?)0+)$/, '$2'));
        } catch (e) {
          inputField.value = 'Error';
        }
        button = equalsButton;
        break;
      case 'Backspace':
        inputField.value = inputField.value.slice(0, -1);
        button = backspaceButton;
        break;
      case 'Escape':
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
      case 'C':
      case 'о':
      case 'О':
        inputField.value = '';
        button = clearButton;
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
