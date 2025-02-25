// custom input
document.getElementById('custom-tip').addEventListener('click', function () {
  let input = document.getElementById('custom');
  let text = document.getElementById('custom-text');
  let label = document.getElementById('custom-tip');

  // Робимо input видимим
  input.style.display = 'inline-block';
  input.focus();

  // Прибираємо текст "Custom"
  text.style.display = 'none';

  // При втраті фокусу повертаємо назад "Custom", якщо поле пусте
  input.addEventListener('blur', function () {
    if (input.value.trim() === '') {
      input.style.display = 'none';
      text.style.display = 'inline';
    }
  });
});

// tip design
const checkedColors = {
  backgroundColor: 'var(--secondary-color)',
  color: 'var(--primary-color)',
};
const uncheckedColors = {
  backgroundColor: '',
  color: '',
};

let currentTips = 0;

const inputs = document.querySelectorAll('input[type="radio"]');
const customInput = document.querySelector('input[name="custom-tip"]');

inputs.forEach((input) => {
  if (input.checked) {
    Object.assign(input.parentElement.style, checkedColors);
    currentTips = input.value;
  }
});

function removeSelect() {
  inputs.forEach((input) => {
    input.checked = false;
    Object.assign(input.parentElement.style, uncheckedColors);
  });

  if (customInput) {
    customInput.value = '';
  }
}

function selectTip(ev) {
  if (ev.target.matches('input[type="radio"]')) {
    removeSelect();
    ev.target.checked = true;
    Object.assign(ev.target.parentElement.style, checkedColors);
    currentTips = ev.target.value;
  }
}

function handleCustomInput() {
  removeSelect();
  customInput.focus();
}

function handleCustomBlur() {
  currentTips = customInput.value.trim() || 0;
}

document.querySelector('.tips-wrapper').addEventListener('click', (ev) => {
  selectTip(ev);
  if (ev.target === customInput) handleCustomInput();
});

customInput.addEventListener('blur', handleCustomBlur);

// calculation
const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const totalSum = document.querySelector('#total-sum')
const perPerson = document.querySelector('#per-person')

let resultTips = bill.value + (bill.value * currentTips / 100)
let resultPerPerson = resultTips / people.value
totalSum.textContent = `$${resultTips}`
perPerson.textContent = `$${resultPerPerson}`

console.log(bill.value);
console.log(people);


