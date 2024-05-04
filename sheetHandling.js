let sheetsFolderContainer = document.querySelector(".sheets_folder_container");
let sheetFolder = document.querySelector(".sheet_add_icon");
sheetFolder.addEventListener("click", (e) => {
	let sheet = document.createElement("div");
	sheet.setAttribute("class", "sheet_folder");

	let allSheetFolders = document.querySelectorAll(".sheet_folder");
	sheet.setAttribute("id", allSheetFolders.length);

	sheet.innerHTML = `
    <div class="sheet_content">Sheet ${allSheetFolders.length + 1}</div>
    `;

	sheetsFolderContainer.appendChild(sheet);
	// DataBase
	createSheetDatabase();
	createGraphComponentMatrix();
	handleSheetActiveness(sheet);
	handleSheetRemoval(sheet);
    sheet.click();
});

function handleSheetRemoval(sheet) {
	sheet.addEventListener("mousedown", (e) => {
		// Right click
		if(e.button !== 2) return;

		let allSheetFolders = document.querySelectorAll(".sheet_folder");
		if(allSheetFolders.length === 1) {
			alert("You need to have atleast one sheet!");
			return;
		}

		let response = confirm("Your sheet will be removed permannently, Ary you sure?");
		if(response === false) return;

		let sheetIdx = Number(sheet.getAttribute("id"));
		// Data Base
		collectedSheetDatabase.splice(sheetIdx, 1);
		collectedGraphComponent.splice(sheetIdx, 1);
		// UI
		handleSheetUIRemoval(sheet);

		// Bydefault Databse to sheet 1 active
		sheetDataBase.collectedSheetDatabase[0];
		graphComponentMatrix = collectedGraphComponent[0];
		heandleSheetProperties();
	})
}

function handleSheetUIRemoval(sheet) {
	sheet.remove();
	let allSheetFolders = document.querySelectorAll(".sheet_folder");
	for (let i =0; i < allSheetFolders.length; i++) {
		allSheetFolders[i].setAttribute("id", i);
		let sheetContent = allSheetFolders[i].querySelector(".sheet_content");
		sheetContent.innerText = `Sheet ${i+1}`;
		allSheetFolders[i].style.backgroundColor = "transparent";
	}
	allSheetFolders[0].style.backgroundColor = "green";
}

function handleSheetDataBase(sheetIdx) {
	sheetDataBase = collectedSheetDatabase[sheetIdx];
	graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function heandleSheetProperties() {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			let cell = document.querySelector(
				`.cell[rowId="${i}"][colId="${j}"]`
			);
			cell.click();
		}
	}
	//By defalult Atteched first cell
	let firstCell = document.querySelector(".cell");
	firstCell.click();
}

function handleSheetUI(sheet) {
    let allSheetFolders = document.querySelectorAll(".sheet_folder");
    for (let i = 0; i < allSheetFolders.length; i++) {
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "green";
}

function handleSheetActiveness(sheet) {
	sheet.addEventListener("click", (e) => {
		let sheetIdx = Number(sheet.getAttribute("id"));
		handleSheetDataBase(sheetIdx);
		heandleSheetProperties();
        handleSheetUI(sheet);
	});
}

function createSheetDatabase() {
	let sheetDataBase = [];

	for (let i = 0; i < rows; i++) {
		let sheetRow = [];
		for (let j = 0; j < columns; j++) {
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
	collectedSheetDatabase.push(sheetDataBase);
}

function createGraphComponentMatrix() {
	let graphComponentMatrix = [];

	for (let i = 0; i < rows; i++) {
		let row = [];
		for (let j = 0; j < columns; j++) {
			row.push([]);
		}
		graphComponentMatrix.push(row);
	}
	collectedGraphComponent.push(graphComponentMatrix);
}
