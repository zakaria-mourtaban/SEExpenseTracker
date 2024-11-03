function transactiondiv(title, amount, date) {
    // Create the main container div
    const creatediv = document.createElement('div');
    creatediv.style.display = 'flex';  // Display items in a row
    creatediv.style.justifyContent = 'space-between';
    creatediv.style.padding = '10px';
    creatediv.style.borderBottom = '1px solid #ccc';

    // Create and style each element
    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;
    titleDiv.style.flex = '1';

    const amountDiv = document.createElement('div');
    amountDiv.textContent = amount;
    amountDiv.style.flex = '1';
    amountDiv.style.textAlign = 'center';

    const dateDiv = document.createElement('div');
    dateDiv.textContent = date;
    dateDiv.style.flex = '1';
    dateDiv.style.textAlign = 'right';


	const editbutton = document.createElement('button')
	editbutton.textContent = "&#9998;"
	editbutton.style.flex = '1';
    editbutton.style.textAlign = 'right';
    // Append the elements to the row container
    creatediv.appendChild(titleDiv);
    creatediv.appendChild(amountDiv);
    creatediv.appendChild(dateDiv);

    return creatediv;
}