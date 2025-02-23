const inputs = document.querySelectorAll('fieldset input');

// console.log(inputs);

inputs.forEach((input) =>
  input.addEventListener('change', (event) => {
    console.log(event.target.value);
  })
);

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
