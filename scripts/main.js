const nameInput = document.getElementById("nameinput");
const amountInput = document.getElementById("amountinput");
const typeInput = document.getElementById("typeinput");
const dateInput = document.getElementById("dateinput");
dateInput.valueAsDate = new Date();
const createButton = document.getElementById("createbutton");
const incomeContainer = document.querySelector(".incomecontainer");
const expenseContainer = document.querySelector(".expensecontainer");
const budgetelement = document.querySelector(".budget h2");
budgetelement.innerHTML = 1000;
class Transaction {
	constructor(title, amount, earned, time) {
		this.title = title;
		this.amount = parseFloat(amount);
		this.earned = earned;
		this.time = time || new Date();
		this.index = null;
	}
}
class Tracker {
	constructor() {
		this.transactions = [];
		this.currentIndex = 0;
		this.loadTransactions();
	}

	getTransactions() {
		return this.transactions;
	}

	addTransaction(transaction) {
		transaction.index = this.currentIndex++;
		this.transactions.push(transaction);
		this.saveTransactions();
		console.log("Added:", JSON.stringify(transaction));
	}

	removeTransaction(transaction) {
		const index = this.transactions.findIndex(
			(t) => t.index === transaction.index
		);
		if (index > -1) {
			this.transactions.splice(index, 1);
			this.saveTransactions();
		}
	}

	saveTransactions() {
		localStorage.setItem("transactions", JSON.stringify(this.transactions));
	}

	loadTransactions() {
		const data = localStorage.getItem("transactions");
		if (data) {
			this.transactions = JSON.parse(data).map((item) => {
				const t = new Transaction(
					item.title,
					item.amount,
					item.earned,
					new Date(item.time)
				);
				t.index = item.index;
				return t;
			});
			this.currentIndex = this.transactions.length;
		}
	}
}

const expenseTracker = new Tracker();

createButton.addEventListener("click", () => {
	if (nameInput.value && amountInput.value) {
		const transaction = new Transaction(
			nameInput.value,
			amountInput.value,
			typeInput.value === "income" ? 1 : 0,
			dateInput.valueAsDate
		);
		expenseTracker.addTransaction(transaction);
		updateUI();
	} else {
		[nameInput, amountInput].forEach((input) => {
			if (!input.value) {
				input.classList.add("redplaceholder");
				setTimeout(
					() => input.classList.remove("redplaceholder"),
					6000
				);
			}
		});
	}
});

function updateIncome(filter = () => true) {
	incomeContainer.innerHTML = "";
	incomeContainer.appendChild(transactiondiv("Title", "Amount", "Date", 1));
	expenseTracker
		.getTransactions()
		.filter(filter)
		.forEach((transaction) => {
			if (transaction.earned === 1) {
				incomeContainer.appendChild(
					transactiondiv(
						transaction.title,
						transaction.amount,
						new Date(transaction.time).toLocaleDateString(),
						null,
						transaction
					)
				);
			}
		});
}

function updateExpense(filter = () => true) {
	expenseContainer.innerHTML = "";
	expenseContainer.appendChild(transactiondiv("Title", "Amount", "Date", 1));
	expenseTracker
		.getTransactions()
		.filter(filter)
		.forEach((transaction) => {
			if (transaction.earned === 0) {
				expenseContainer.appendChild(
					transactiondiv(
						transaction.title,
						transaction.amount,
						new Date(transaction.time).toLocaleDateString(),
						null,
						transaction
					)
				);
			}
		});
}

function updateUI(filter = () => true) {
	updateIncome(filter);
	updateExpense(filter);
	setbudget();
}

const minAmountInput = document.getElementById("minAmount");
const maxAmountInput = document.getElementById("maxAmount");
const dateFilterInput = document.getElementById("dateFilter");
const notesFilterInput = document.getElementById("notesFilter");

const filterAmountsButton = document.getElementById("filteramountsbtn");
const filterDatesButton = document.getElementById("filterdatesbtn");
const filterNotesButton = document.getElementById("filternotesbtn");
const resetButton = document.getElementById("resetbtn");

filterAmountsButton.onclick = function () {
	let minamount = minAmountInput.value ? minAmountInput.value : 0;
	let maxamount = maxAmountInput.value
		? maxAmountInput.value
		: Number.MAX_SAFE_INTEGER;
	updateUI((element) => {
		return element.amount > minamount && element.amount < maxamount;
	});
};

filterDatesButton.onclick = function () {
	updateUI((element) => {
		return (
			new Date(element.time).toDateString() ===
			new Date(dateFilterInput.valueAsDate).toDateString()
		);
	});
};

filterNotesButton.onclick = function () {
	updateUI((element) => {
		return element.title === notesFilterInput.value;
	});
};

resetButton.onclick = () => {
	updateUI();
};

function setbudget() {
	let budget = 0;
	expenseTracker.getTransactions().forEach((element) => {
		if (element.earned == 1) budget += element.amount;
		else budget -= element.amount;
	});
	budgetelement.innerHTML = "Budget : " + budget;
}

updateUI();
