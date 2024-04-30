// Cells Storage
let sheetDataBase = [];

for(let i = 0; i < rows; i++) {
    let sheetRow = [];
    for(let j = 0; j < columns; j++) {
        let cellPropObj = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left", 
            fontFamily: "sans-sarif",
            fontSize: "14",
            fontColor: "#000000",
            bgColor: "#000000",
            value: "",
            formula: "",
            children: [],
        };
        sheetRow.push(cellPropObj);
    }
    sheetDataBase.push(sheetRow);
}

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let fontFamilyProp = document.querySelector(".font_family_prop");
let fontSizeProp = document.querySelector(".font_size_prop");
let fontColor = document.querySelector(".fontColor");
let bgColor = document.querySelector(".bgColor");

let activeColorProp = "#d1d8f2";
let inactiveColorProp = "#f3f8fa";

// Attach property listeners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellProp(address);

    // Modification
    cellPropObj.bold = !cellPropObj.bold;
    cell.style.fontWeight = cellPropObj.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellPropObj.bold ? activeColorProp : inactiveColorProp;
})
italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellProp(address);

    // Modification
    cellPropObj.italic = !cellPropObj.italic;
    cell.style.fontStyle = cellPropObj.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellPropObj.italic ? activeColorProp : inactiveColorProp;
})
underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellProp(address);

    // Modification
    cellPropObj.underline = !cellPropObj.underline;
    cell.style.textDecoration = cellPropObj.underline ? "underline" : "none";
    underline.style.backgroundColor = cellPropObj.underline ? activeColorProp : inactiveColorProp;
})

fontSizeProp.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellProp(address);

    cellPropObj.fontSize = fontSizeProp.value;
    cell.style.fontSize = cellPropObj.fontSize + "px";
    fontSizeProp.value = cellPropObj.fontSize;
})

fontFamilyProp.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellProp(address);

    cellPropObj.fontFamily = fontFamilyProp.value;
    cell.style.fontFamily = cellPropObj.fontFamily;
    fontFamilyProp.value = cellPropObj.fontFamily;
})

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellProp(address);

    cellPropObj.fontColor = fontColor.value;
    cell.style.color = cellPropObj.fontColor;
    fontColor.value = cellPropObj.fontColor;
})

bgColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellProp(address);

    cellPropObj.bgColor = bgColor.value;
    cell.style.backgroundColor = cellPropObj.bgColor;
    bgColor.value = cellPropObj.bgColor;
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellPropObj] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellPropObj.alignment = alignValue;
        cell.style.textAlign = cellPropObj.alignment;

        switch(alignValue) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

let allCells = document.querySelectorAll(".cell");
for(let i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    cell.addEventListener("click", (e) => {

        let address = addressBar.value;
        let [rowId, colId] = decodeRowIdColIdFromAddress(address);
        let cellPropObj = sheetDataBase[rowId][colId];
        // Apply cell properties
        cell.style.fontWeight = cellPropObj.bold ? "bold" : "normal";
        cell.style.fontStyle = cellPropObj.italic ? "italic" : "normal";
        cell.style.textDecoration = cellPropObj.underline ? "underline" : "none";
        cell.style.fontSize = cellPropObj.fontSize + "px";
        cell.style.fontFamily = cellPropObj.fontFamily;
        cell.style.color = cellPropObj.fontColor;
        cell.style.backgroundColor = cellPropObj.bgColor === "#000000" ? "transparent" : cellPropObj.bgColor;
        cell.style.textAlign = cellPropObj.alignment;
        
        // Apply properties on UI container
        bold.style.backgroundColor = cellPropObj.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellPropObj.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellPropObj.underline ? activeColorProp : inactiveColorProp;
        fontSizeProp.value = cellPropObj.fontSize;
        fontFamilyProp.value = cellPropObj.fontFamily;
        fontColor.value = cellPropObj.fontColor;
        bgColor.value = cellPropObj.bgColor;
        switch(cellPropObj.alignment) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

        let formulaBar = document.querySelector(".formula_bar");
        formulaBar.value = cellPropObj.formula;
        cell.value = cellPropObj.value;
    })
}

function getCellAndCellProp(address) {
    let [rowId, colId] = decodeRowIdColIdFromAddress(address);
    // Access cell & Storage object
    let cell = document.querySelector(`.cell[rowId="${rowId}"][colId="${colId}"]`);
    let cellPropObj = sheetDataBase[rowId][colId];
    return [cell, cellPropObj];
}

function decodeRowIdColIdFromAddress(address) {
    // Address
    let rowId = Number(address.slice(1) - 1);
    let colId = Number(address.charCodeAt(0)) - 65;
    return [rowId, colId];
}