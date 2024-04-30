for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
        let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellPropObj] = getCellAndCellProp(address);
            let enteredData = activeCell.innerText;

            if (enteredData === cellPropObj.value) return;

            cellPropObj.value = enteredData;
            // if data modified remove parent-child relation, formula empty, update children with new modified value
            removeChildFromParent(cellPropObj.formula);
            cellPropObj.formula = "";
            updateChildrenCells(address);
        })
    }
}

let formulaBar = document.querySelector(".formula_bar");
formulaBar.addEventListener("keydown", (e) => {
    let inputFormula = formulaBar.value;
    if(e.key == "Enter" && inputFormula) {

        // if change in formula, break old parent-child relation, evaluate new formula, add new parent-child relation
        let address = addressBar.value;
        let [cell, cellPropObj] = getCellAndCellProp(address);
        if(inputFormula !== cellPropObj.formula) removeChildFromParent(cellPropObj.formula);

        let evaluatedValue = evaulateFormula(inputFormula);

        // To update UI and cellPropObj in database
        setCellUIAndCellPropObj(evaluatedValue, inputFormula, address);
        addChildToParent(inputFormula);
        console.log(sheetDataBase);
        updateChildrenCells(address)
    }
})

function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = getCellAndCellProp(parentAddress);
    let children = parentCellProp.children;

    for(let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        let [childCell, childCellProp] = getCellAndCellProp(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaulateFormula(childFormula);
        setCellUIAndCellPropObj(evaluatedValue, childFormula, childAddress);
        updateChildrenCells(childAddress);
    }
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for ( let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = getCellAndCellProp(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

function evaulateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellPropObj] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = cellPropObj.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellPropObj(evaluatedValue, formula, address) {
    // let address = addressBar.value;
    let [cell, cellPropObj] = getCellAndCellProp(address);

    // UI update
    cell.innerText = evaluatedValue;
    // DB update
    cellPropObj.value = evaluatedValue;
    cellPropObj.formula = formula;
}