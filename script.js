const transactionsUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const dummyTransactions = [
	{ id: 1, name: "Bolo de Brigadeiro", amount: -20 },
	{ id: 2, name: "Salário", amount: 300 },
	{ id: 3, name: "Torta de Frango", amount: -10 },
	{ id: 4, name: "Violão", amount: 150 },
];

const addTransactionIntoDOM = (transaction) => {
	const operator = transaction.amount < 0 ? "-" : "+";
	const CSSClass = transaction.amount < 0 ? "minus" : "plus"; //decide se o texto armazenado será 'minus' ou 'plus'
	const amountWithoutOperator = Math.abs(transaction.amount);
	const li = document.createElement("li"); //cria o elemento <li>

	li.classList.add(CSSClass); //define a class do <li> a partir do if/else da CSSClass
	li.innerHTML = `
	${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
	 <button class="delete-btn">x</button>
	`;

	transactionsUl.append(li);
};

const updateBalanceValues = () => {
	const transactionsAmounts = dummyTransactions.map(
		(transaction) => transaction.amount,
	);

	const total = transactionsAmounts
		.reduce((accumulator, transaction) => accumulator + transaction, 0)
		.toFixed(2);

	const income = transactionsAmounts
		.filter((value) => value > 0)
		.reduce((accumulator, value) => accumulator + value, 0)
		.toFixed(2);

	const expense = Math.abs(
		transactionsAmounts
			.filter((value) => value < 0)
			.reduce((accumulator, value) => accumulator + value),
	).toFixed(2);

	balanceDisplay.textContent = `R$ ${total}`;
	incomeDisplay.textContent = `R$ ${income}`;
	expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
	transactionsUl.innerHTML = "";
	dummyTransactions.forEach(addTransactionIntoDOM);
	updateBalanceValues();
};

init();

const generateID = () => Math.round(Math.random() * 1000);

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const transactionName = inputTransactionName.value.trim();
	const transactionAmount = inputTransactionAmount.value.trim();

	if (transactionName === "" || transactionAmount === "") {
		alert("Por favor, preencha os campos antes de enviar!");
		return;
	}

	const transaction = {
		id: generateID(),
		name: transactionName,
		amount: Number(transactionAmount),
	};

	dummyTransactions.push(transaction);
	init();

	inputTransactionName.value = "";
	inputTransactionAmount.value = "";
});
