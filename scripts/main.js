if (!localStorage.getItem("userId")) {
  window.location.href = "/index.html";
}

const nameInput = document.getElementById("nameinput");
const amountInput = document.getElementById("amountinput");
const typeInput = document.getElementById("typeinput");
const dateInput = document.getElementById("dateinput");
dateInput.valueAsDate = new Date();
const createButton = document.getElementById("createbutton");
const incomeContainer = document.querySelector(".incomecontainer");
const expenseContainer = document.querySelector(".expensecontainer");
const budgetelement = document.querySelector(".budget h2");
let userid = Number(localStorage.getItem("userId"));

class Transaction {
  constructor(title, amount, earned, time, index) {
    this.title = title;
    this.amount = parseFloat(amount);
    this.earned = earned;
    this.time = time || new Date();
    this.index = index || null;
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
    axios.post(
      "http://localhost/createtransaction.php",
      new URLSearchParams({
        id: userid,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.date,
        earned: transaction.earned,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    this.loadTransactions();
  }

  removeTransaction(transaction) {
    axios.post(
      "http://localhost/deletetransaction.php",
      new URLSearchParams({
        transaction_id: transaction.index,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

  // saveTransactions() {
  //     axios.post(
  //         "http://127.0.0.1/createtransaction.php",
  //         new URLSearchParams({
  //             user_id: userid,
  //             title: this.transactions[this.transactions.length - 1].title,
  //             amount: this.transactions[this.transactions.length - 1].amount,
  //             earned: this.transactions[this.transactions.length - 1].earned,
  //             date: this.transactions[this.transactions.length - 1].time,
  //         }),
  //         {
  //             headers: {
  //                 "Content-Type": "application/x-www-form-urlencoded",
  //             },
  //         }
  //     );
  // }

  loadTransactions() {
    axios
      .post(
        "http://127.0.0.1/gettransactions.php",
        new URLSearchParams({
          id: userid,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        this.transactions = res.data.map((item) => {
          const t = new Transaction(
            item.title,
            item.amount,
            item.earned,
            new Date(item.date),
            item.transaction_id
          );
          return t;
        });
        this.currentIndex = this.transactions.length;
        updateUI();
      });
  }
}

const expenseTracker = new Tracker();

createButton.addEventListener("click", () => {
  if (nameInput.value && amountInput.value) {
    const transaction = new Transaction(
      nameInput.value,
      amountInput.value,
      typeInput.value === "income" ? 1 : 0,
      new Date(dateInput.value),
    );
    expenseTracker.addTransaction(transaction);
	expenseTracker.loadTransactions()
    updateUI();
  } else {
    [nameInput, amountInput].forEach((input) => {
      if (!input.value) {
        input.classList.add("redplaceholder");
        setTimeout(() => input.classList.remove("redplaceholder"), 6000);
      }
    });
  }
});

function updateIncome(filter = () => true) {
  incomeContainer.innerHTML = "<h1>Income</h1>";
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
  expenseContainer.innerHTML = "<h1>Expense</h1>";
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
