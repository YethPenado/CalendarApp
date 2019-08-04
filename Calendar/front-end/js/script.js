function calendar(new_year, new_month) {
  const d = new Date(new_year, new_month-1, 1);
  let d_length = 32 - new Date(new_year, new_month-1, 32).getDate();
  let year = d.getFullYear();
  let month = d.getMonth();
  let date = d.getDate();
  let day = d.getDay();
  let caption_year = document.querySelector('.year');
  let caption_month = document.querySelector('.month');
  let start_day = document.querySelectorAll('tr td');

  for(let i = 0; i < start_day.length; i++) {
    start_day[i].innerHTML = '';
  }

  for(let i = day; i < day + d_length; i++) {
    start_day[i].innerHTML = date;
    date++;
  }

  caption_year.innerHTML = year;
  caption_month.innerHTML = month + 1;
}
(function() {
  const prev = document.querySelector('.prev-month');
  const next = document.querySelector('.next-month');
  let newYear = new Date().getFullYear();
  let newMonth = new Date().getMonth() + 1;
  calendar(newYear, newMonth);

  prev.addEventListener('click', function() {
    calendar(newYear, --newMonth);
  });
  next.addEventListener('click', function() {
    calendar(newYear, ++newMonth);
  });
})();


// Reset the data of the Agenda
const inputs = document.querySelectorAll('.events input');
const cancel = document.getElementById('reset');

function resetAll() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}

reset.addEventListener('click', resetAll);