let rows = 100;
let columns = 26;

const addressColsContainer = document.querySelector(".address_col_container");
const addressRowContainer = document.querySelector(".address_row_container")
const cellsContainer = document.querySelector(".cells_container");
const addressBar = document.querySelector(".address_bar");


for(let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "addressCol");
    addressCol.innerText = i + 1;
    addressColsContainer.appendChild(addressCol)
}

for(let i = 0; i < columns; i++) {
    let addressRow = document.createElement('div');
    addressRow.setAttribute("class", "addressRow");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowContainer.appendChild(addressRow);
}

for(let i = 0; i < rows; i++) {
    let rowContainer = document.createElement("div");
    rowContainer.setAttribute("class", "rowContainer");
    for(let j = 0; j < columns; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("rowId", i);
        cell.setAttribute("colId", j);
        rowContainer.appendChild(cell);
        addListenerForAddressBarDisplay(cell, i , j);
    }
    cellsContainer.appendChild(rowContainer);
}

function addListenerForAddressBarDisplay(cell, i , j) {
    cell.addEventListener("click", (e) => {
        let rowId = i + 1;
        let colId = String.fromCharCode(65 + j);
        addressBar.value =`${colId}${rowId}`;
    })
}

//By defalult Atteched first cell
let firstCell = document.querySelector(".cell");
firstCell.click();
