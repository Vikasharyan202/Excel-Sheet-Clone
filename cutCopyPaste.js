let ctrlKey;
document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})
document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
})

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");


for (let i=0; i< rows; i++) {
    for (let j = 0; j < columns; j++) {
        let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
        handleSelectedCells(cell);
    }
}

let rangeStorage = [];
function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {
        // select cells range
        if(!ctrlKey) return;
        if(rangeStorage.length >= 2) {
            defalultSelectedCellsUI();
            rangeStorage = [];
        }

        // UI
        cell.style.border = "3px solid green";

        let rowId = Number(cell.getAttribute("rowId"));
        let colId = Number(cell.getAttribute("colId"));
        rangeStorage.push([rowId, colId]);
        console.log(rangeStorage);
    })
}

function defalultSelectedCellsUI() {
    for (let i = 0; i< rangeStorage.length; i++) {
        let cell = document.querySelector(`.cell[rowId="${rangeStorage[i][0]}"][colId="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgray";
    }
}

let copyData = [];
copyBtn.addEventListener("click", (e) => {
    copyData = [];

    let [startRow, startCol, endRow, endCol] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0],rangeStorage[1][1]];
    for (let i = startRow; i<= endRow; i++) {
        let copyRow = [];
        for (let j = startCol; j <= endCol; j++) {
            let cellPropObj = sheetDataBase[i][j];
            copyRow.push(cellPropObj);
        }
        copyData.push(copyRow);
    }
    defalultSelectedCellsUI();
})

cutBtn.addEventListener("click", (e) => {
    if(rangeStorage.length < 2) return;

    let [startRow, startCol, endRow, endCol] = [rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0],rangeStorage[1][1]];

    for (let i = startRow; i<=endRow; i++) {
        for (let j = startCol; j <=endCol; j++) {
            let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);

            // DataBase
            let cellPropObj = sheetDataBase[i][j];
            cellPropObj.value = "";
            cellPropObj.bold = false;
            cellPropObj.italic = false;
            cellPropObj.underline = false;
            cellPropObj.fontSize = 14;
            cellPropObj.fontFamily = "sans-sarif";
            cellPropObj.fontColor = "#000000";
            cellPropObj.bgColor = "#000000";
            cellPropObj.alignment = "left";

            // UI
            cell.click();
        }
    }
    defalultSelectedCellsUI();
})

pasteBtn.addEventListener("click", (e) => {
    // Paste cells data work
    if(rangeStorage.length < 2) return;

    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    // Target
    let address = addressBar.value;
    let [startRow, startCol] = decodeRowIdColIdFromAddress(address);

    for (let i = startRow, r=0; i <= startRow + rowDiff; i++,r++) {
        for (let j = startCol, c=0; j <= startCol + colDiff; j++, c++) {
            let cell = document.querySelector(`.cell[rowId="${i}"][colId="${j}"]`);
            // console.log(cell);
            if(!cell) continue;

            //DataBase
            let data = copyData[r][c];
            let cellPropObj = sheetDataBase[i][j];

            cellPropObj.value = data.value;
            cellPropObj.bold = data.bold;
            cellPropObj.italic = data.italic;
            cellPropObj.underline = data.underline;
            cellPropObj.fontSize = data.fontSize;
            cellPropObj.fontFamily = data.fontFamily;
            cellPropObj.fontColor = data.fontColor;
            cellPropObj.bgColor = data.bgColor;
            cellPropObj.alignment = data.alignment;

            // UI
            cell.click();
        }
    }

})