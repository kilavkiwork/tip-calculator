const inputs = document.querySelectorAll('input[type="radio"]');
const customInput = document.querySelector('input[name="custom-tip"]');
const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const totalSum = document.querySelector('#total-sum');
const perPerson = document.querySelector('#per-person');
const calculation = document.querySelector('.calculation');
const reset = document.querySelector('#reset');
const checkedColors = {
  backgroundColor: 'var(--secondary-color)',
  color: 'var(--primary-color)',
};
const uncheckedColors = {
  backgroundColor: '',
  color: '',
};

let currentTips = 0;

// functions
function removeSelect() {
  inputs.forEach((input) => {
    input.checked = false;
    Object.assign(input.parentElement.style, uncheckedColors);
  });

  if (customInput) {
    customInput.value = '';
  }
}

function selectTip(target) {
  removeSelect();
  target.checked = true;
  Object.assign(target.parentElement.style, checkedColors);
  currentTips = parseFloat(target.value);
}

function handleCustomInput() {
  removeSelect();
  customInput.focus();
}

function handleCustomBlur() {
  let value = customInput.value.trim();
  currentTips = parseFloat(value) || 0;

  // Якщо поле порожнє, повертаємо "Custom"
  if (value === '') {
    let text = document.querySelector('#custom-text');
    customInput.style.display = 'none';
    text.style.display = 'inline';
  }
}

function toNumber(value) {
  return parseFloat(value.replace('$', ''));
}

function calculateTipToPerson() {
  let numberBill = toNumber(bill.value) || 0;
  let numberPeople = toNumber(people.value) || 0;
  let tipAmount = (numberBill * (currentTips / 100)) / numberPeople;
  let total = numberBill / numberPeople + tipAmount;

  let error = document.querySelector('.error');
  let isError = isNaN(numberPeople) || numberPeople <= 0;

  error.style.display = isError ? 'block' : '';
  people.style.outlineColor = isError ? '#e17052' : '';

  perPerson.textContent = `$${tipAmount.toFixed(2)}`;
  totalSum.textContent = `$${total.toFixed(2)}`;
}

function toReset() {
  bill.value = '';
  people.value = '';
  totalSum.textContent = '$0.00';
  perPerson.textContent = '$0.00';
  removeSelect();
  currentTips = 0;
}

// custom input
document.querySelector('#custom-tip').addEventListener('click', function () {
  let input = document.querySelector('#custom');
  let text = document.querySelector('#custom-text');
  let label = document.querySelector('#custom-tip');

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
inputs.forEach((input) => {
  if (input.checked) {
    Object.assign(input.parentElement.style, checkedColors);
    currentTips = parseFloat(input.value);
  }
});

document.querySelector('.tips-wrapper').addEventListener('click', (ev) => {
  if (ev.target.type === 'radio') selectTip(ev.target);
  if (ev.target === customInput) handleCustomInput();
});

customInput.addEventListener('blur', handleCustomBlur);
customInput.addEventListener('input', () => {
  currentTips = parseFloat(customInput.value.trim()) || 0;
  calculateTipToPerson();
});

// calculation
calculation.addEventListener('input', calculateTipToPerson);
reset.addEventListener('click', toReset);
