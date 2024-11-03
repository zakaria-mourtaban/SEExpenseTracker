// transaction based
// local storage
// track income and expenses, the money we make, what we spend it on
// total budget, ie what the money has been spent on and the money we have left
class transaction {
	constructor(title, amount, earned, time) {
		this.title = title;
		this.amount = amount;
		this.earned = earned;
		this.time = time;
		this.index;
	}
}

class tracker {
	constructor() {
		this.transactions = [];
		this.currentindex = 0;
	}

	getTransactions() {
		return this.transactions;
	}

	addTransaction(transaction) {
		transaction.index = this.currentindex;
		this.currentindex++;
		console.log("added" + JSON.stringify(transaction));
		this.transactions.push(transaction);
	}

	removeTranscation(transaction) {
		this.transactions.splice(transaction.index, 1);
	}
}

let Expensetracker = new tracker();
let Ourtransaction = new transaction("groceries", 99, 0);

Expensetracker.addTransaction(Ourtransaction);
console.log(JSON.stringify(Expensetracker.getTransactions()));
Expensetracker.removeTranscation(Ourtransaction);
console.log(JSON.stringify(Expensetracker.getTransactions()));

const nameinput = document.getElementById("nameinput");
const amountinput = document.getElementById("amountinput");
const typeinput = document.getElementById("typeinput");
let dateinput = document.getElementById("dateinput");
dateinput.valueAsDate = new Date()
const createbutton = document.getElementById("createbutton");
let incomecontainer = document.querySelector(".incomecontainer");
let expensecontainer = document.querySelector(".expensecontainer");
incomecontainer.appendChild(
	transactiondiv(
		"Title",
		"Amount",
		"Date"
	)
);
expensecontainer.appendChild(
	transactiondiv(
		"Title",
		"Amount",
		"Date"
	)
);
createbutton.addEventListener("click", () => {
	if (
		nameinput.value != null &&
		nameinput.value != "" &&
		amountinput.value != null &&
		amountinput.value != ""
	) {
		let currenttransaction = new transaction(
			nameinput.value,
			amountinput.value,
			typeinput.value === "income" ? 1 : 0,
			dateinput.value
		);
		Expensetracker.addTransaction(currenttransaction);
		console.log(JSON.stringify(Expensetracker.getTransactions()));
		updateIncome();
		updateExpense();
	} else {
		nameinput.classList.add("redplaceholder");
		setTimeout(() => {
			nameinput.classList.remove("redplaceholder");
		}, 6000);
		if (amountinput.value == null || amountinput.value == "") {
			amountinput.classList.add("redplaceholder");
			setTimeout(() => {
				amountinput.classList.remove("redplaceholder");
			}, 6000);
		}
	}
});

function updateIncome() {
	const changedate = new Date();
	incomecontainer.innerHTML = "";
	incomecontainer.appendChild(
		transactiondiv(
			"Title",
			"Amount",
			"Date"
		)
	);
	Expensetracker.getTransactions().forEach((transaction) => {
		if (transaction.earned === 1)
			incomecontainer.appendChild(
				transactiondiv(
					transaction.title,
					transaction.amount,
					changedate.toLocaleDateString(transaction.time),
				)
			);
	});
}

function updateExpense() {
	const changedate = new Date();
	expensecontainer.innerHTML = "";
	expensecontainer.appendChild(
		transactiondiv(
			"Title",
			"Amount",
			"Date"
		)
	);
	Expensetracker.getTransactions().forEach((transaction) => {
		if (transaction.earned === 0) {
			expensecontainer.appendChild(
				transactiondiv(
					transaction.title,
					transaction.amount,
					changedate.toLocaleDateString(transaction.time)
				)
			);
		}
	});
}
