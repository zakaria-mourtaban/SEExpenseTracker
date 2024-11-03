function transactiondiv(title, amount, date, istitle, transaction) {
	const creatediv = document.createElement("div");
	creatediv.style.display = "flex";
	creatediv.style.justifyContent = "space-between";
	creatediv.style.padding = "10px";
	creatediv.style.borderBottom = "1px solid #ccc";

	const titleDiv = document.createElement("div");
	titleDiv.textContent = title;
	titleDiv.style.flex = "1";

	const amountDiv = document.createElement("div");
	amountDiv.textContent = amount;
	amountDiv.style.flex = "1";
	amountDiv.style.textAlign = "center";

	const dateDiv = document.createElement("div");
	dateDiv.textContent = date;
	dateDiv.style.flex = "1";
	dateDiv.style.textAlign = "right";

	const editButton = document.createElement("button");
	editButton.textContent = "✎";
	editButton.style.flex = "1";
	editButton.style.textAlign = "center";
	editButton.onclick = function () {
		nameInput.value = transaction.title
		amountInput.value = transaction.amount;
		dateInput.valueAsDate = new Date(transaction.time);
		expenseTracker.removeTransaction(transaction);
		updateExpense();
		updateIncome();
	};
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "🗑️";
	deleteButton.style.flex = "1";
	deleteButton.style.textAlign = "center";
	deleteButton.onclick = function () {
		expenseTracker.removeTransaction(transaction);
		updateExpense();
		updateIncome();
	};
	creatediv.appendChild(titleDiv);
	creatediv.appendChild(amountDiv);
	creatediv.appendChild(dateDiv);
	if (istitle != 1) {
		creatediv.appendChild(editButton);
		creatediv.appendChild(deleteButton);
	}
	return creatediv;
}
