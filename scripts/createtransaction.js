function transactiondiv(title, amount, date) {
    // Create the main container div
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';  // Display items in a row
    rowDiv.style.justifyContent = 'space-between';
    rowDiv.style.padding = '10px';
    rowDiv.style.borderBottom = '1px solid #ccc';

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

    // Append the elements to the row container
    rowDiv.appendChild(titleDiv);
    rowDiv.appendChild(amountDiv);
    rowDiv.appendChild(dateDiv);

    return rowDiv;
}