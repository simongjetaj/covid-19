const searchInput = document.getElementById('search');
const tableItems = document.getElementById('table-data');
const tr = document.querySelectorAll('tbody tr');

searchInput.addEventListener("input", e => {
  removeAlert();

  let filter = e.target.value;
  let found = false;
  let count = 0;

  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td");

    for (let j = 0; j < td.length; j++) {
      if (td[j].textContent.toLowerCase().includes(filter.toLowerCase())) {
        found = true;
        count++;
      }
    }

    if (found) {
      tr[i].style.display = "";
      found = false;
    } else {
      tr[i].style.display = "none";
    }
  }

  if (count === 0) {
    outputMessage(`Sorry, we couldn't find any results matching <em>'${filter}'</em>.`);
  }
});

function outputMessage(msg) {
  removeAlert();

  const div = document.createElement('div');
  div.classList.add('alert', 'bg-orange-100', 'border-l-4', 'border-orange-500', 'text-orange-700', 'p-4');
  div.innerHTML = `<p class="font-bold">${msg}</p>`;
  document.querySelector('.table-responsive').appendChild(div);
}

function removeAlert() {
  const alert = document.querySelector('.alert');

  if (alert) {
    alert.parentNode.removeChild(alert);
  }
}
