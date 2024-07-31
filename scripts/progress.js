const valueInput = document.getElementById('value');
const progressCircle = document.querySelector('.progress__circle');
const animateCheckbox = document.getElementById('animate');
const hideCheckbox = document.getElementById('hide');

//Вставка значения через value
valueInput.addEventListener('input', () => {
  progressCircle.style.setProperty('--percent', `${valueInput.value}%`);
});

//Анимация при нажатии чекбокса
animateCheckbox.addEventListener('change', () => {
  if (animateCheckbox.checked || hideCheckbox.checked) {
    valueInput.disabled = true;
    valueInput.value = 0;
    let start = Date.now();
    let timer = setInterval(function () {
      let timePassed = Date.now() - start;
      draw(timePassed);
      if (!animateCheckbox.checked) {
        clearInterval(timer);
        progressCircle.style.setProperty('--percent', '0%');
        if (!hideCheckbox.checked) {
          valueInput.disabled = false;
        }
      }
    }, 20);

    function draw(timePassed) {
      let currentPercent = (timePassed / 20) % 100;
      progressCircle.style.setProperty('--percent', `${currentPercent}%`);
    }
  }
});

//Спрятать при нажатии чекбокса
hideCheckbox.addEventListener('change', () => {
  if (hideCheckbox.checked) {
    progressCircle.style.opacity = 0;
    valueInput.disabled = true;
  } else {
    progressCircle.style.opacity = 1;
    if (!animateCheckbox.checked) {
      valueInput.disabled = false;
    }
  }
});