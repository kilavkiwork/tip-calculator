const inputs = document.querySelectorAll('fieldset input');

console.log(inputs);

inputs.forEach((input) => input.addEventListener('change', (event) => {
  console.log(event.target.value);
  
}));
