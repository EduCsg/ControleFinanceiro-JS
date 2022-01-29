const transactionsUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const localStorageTransactions = JSON.parse(
	localStorage.getItem("transactions"),
);

let transactions =
	localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

const removeTransaction = (ID) => {
	transactions = transactions.filter((transaction) => transaction.id !== ID);
	updateLocalStorage();
	init();
};

const addTransactionIntoDOM = ({ amount, name, id }) => {
	const operator = amount < 0 ? "-" : "+";
	const CSSClass = amount < 0 ? "minus" : "plus"; //decide se o texto armazenado será 'minus' ou 'plus'
	const amountWithoutOperator = Math.abs(amount);
	const li = document.createElement("li"); //cria o elemento <li>

	li.classList.add(CSSClass); //define a class do <li> a partir do if/else da CSSClass
	li.innerHTML = `
	${name} 
		<span>${operator} R$ ${amountWithoutOperator}</span>
	 	<button class="delete-btn" onClick="removeTransaction(${id})">x</button>
	`;

	transactionsUl.append(li);
};

const getExpenses = (
	transactionsAmounts, //calcula as despesas
) =>
	Math.abs(
		transactionsAmounts
			.filter((value) => value < 0)
			.reduce((accumulator, value) => accumulator + value, 0),
	).toFixed(2);

const getIncome = (transactionsAmounts) =>
	transactionsAmounts
		.filter((value) => value > 0)
		.reduce((accumulator, value) => accumulator + value, 0)
		.toFixed(2);

const getTotal = (transactionsAmounts) =>
	transactionsAmounts
		.reduce((accumulator, transaction) => accumulator + transaction, 0)
		.toFixed(2);

const updateBalanceValues = () => {
	const transactionsAmounts = transactions.map(({ amount }) => amount);

	const total = getTotal(transactionsAmounts); //calcula o total de saldo
	const income = getIncome(transactionsAmounts); //calcula quando for receitas
	const expense = getExpenses(transactionsAmounts); //calcula quando for despesas

	balanceDisplay.textContent = `R$ ${total}`; //mostra o saldo total
	incomeDisplay.textContent = `R$ ${income}`; //mostra a receita total
	expenseDisplay.textContent = `R$ ${expense}`; //mostra a despesa total
};

const init = () => {
	transactionsUl.innerHTML = "";
	transactions.forEach(addTransactionIntoDOM);
	updateBalanceValues();
};

init();

const updateLocalStorage = () => {
	localStorage.setItem("transactions", JSON.stringify(transactions));
};

const generateID = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionName, transactionAmount) => {
	transactions.push({
		//adiciona a transação ao array de transações

		id: generateID(), //cria o id da transação
		name: transactionName, //cria o nome da transação
		amount: Number(transactionAmount), //define o valor da transação
	});
};

const cleanInputs = () => {
	inputTransactionName.value = ""; //limpa o input nome
	inputTransactionAmount.value = ""; //limpa o input valor
};

const handleFormSubmit = (event) => {
	event.preventDefault();

	const transactionName = inputTransactionName.value.trim(); //pega o valor do input nome
	const transactionAmount = inputTransactionAmount.value.trim(); //pega o valor do input valor
	const isSomeInputEmpty = transactionName === "" || transactionAmount === ""; //verifica se os inputs estão preenchidos

	if (isSomeInputEmpty) {
		//verifica se os inputs estão preenchidos

		alert("Por favor, preencha os campos antes de enviar!");
		return;
	}

	addToTransactionsArray(transactionName, transactionAmount); //cria e adiciona a transação ao array de transações
	init(); //atualiza as transações na tela
	updateLocalStorage(); //atualiza o local storage
	cleanInputs(); //limpa os inputs
};

form.addEventListener("submit", handleFormSubmit);
