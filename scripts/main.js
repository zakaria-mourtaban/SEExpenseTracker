const nameInput = document.getElementById("nameinput");
const amountInput = document.getElementById("amountinput");
const typeInput = document.getElementById("typeinput");
const dateInput = document.getElementById("dateinput");
dateInput.valueAsDate = new Date();
const createButton = document.getElementById("createbutton");
const incomeContainer = document.querySelector(".incomecontainer");
const expenseContainer = document.querySelector(".expensecontainer");
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
		updateIncome();
		updateExpense();
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

function transactionDiv(title, amount, date) {
	const div = document.createElement("div");
	div.classList.add("transaction-item");
	div.innerHTML = `<span>${title}</span><span>${amount}</span><span>${date}</span>`;
	return div;
}

function updateIncome() {
	incomeContainer.innerHTML = "";
	incomeContainer.appendChild(transactionDiv("Title", "Amount", "Date"));
	expenseTracker.getTransactions().forEach((transaction) => {
		if (transaction.earned === 1) {
			incomeContainer.appendChild(
				transactionDiv(
					transaction.title,
					transaction.amount,
					new Date(transaction.time).toLocaleDateString()
				)
			);
		}
	});
}

function updateExpense() {
	expenseContainer.innerHTML = "";
	expenseContainer.appendChild(transactionDiv("Title", "Amount", "Date"));
	expenseTracker.getTransactions().forEach((transaction) => {
		if (transaction.earned === 0) {
			expenseContainer.appendChild(
				transactionDiv(
					transaction.title,
					transaction.amount,
					new Date(transaction.time).toLocaleDateString()
				)
			);
		}
	});
}

updateIncome();
updateExpense();
