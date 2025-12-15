const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

function addTransaction(e) {
  e.preventDefault();

  const description = text.value.trim();
  const value = +amount.value;

  if(description === '' || isNaN(value) || value === 0) {
    alert("Please add valid description & amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount: value
  };

  transactions.push(transaction);
  updateUI();
  text.value = '';
  amount.value = '';
}

function updateUI() {
  list.innerHTML = '';
  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts.filter(x => x > 0).reduce((acc, x) => acc + x, 0).toFixed(2);
  const expense = (amounts.filter(x => x < 0).reduce((acc, x) => acc + x, 0) * -1).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;

  transactions.forEach(t => {
    const sign = t.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(t.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
      ${t.description} <span>${sign}$${Math.abs(t.amount).toFixed(2)}</span>
      <button onclick="removeTransaction(${t.id})">x</button>
    `;
    list.appendChild(item);
  });
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}

form.addEventListener('submit', addTransaction);
