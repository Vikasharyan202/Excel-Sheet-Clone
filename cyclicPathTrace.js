
function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}

async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse) {
    let [srcRow, srcCol] = cycleResponse;
    let visited = []; // Node visit trace
    let dfsVisited = []; // Stack visit trace

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j = 0; j < columns; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    let response = await dfsCyclicDetectionTracePath(graphComponentMatrix, srcRow, srcCol, visited, dfsVisited);
    if (response === true) return Promise.resolve(true);;

    return Promise.resolve(false);;
}

// Color cell for tracking
async function dfsCyclicDetectionTracePath(graphComponentMatrix, srcRow, srcCol, visited, dfsVisited) {
    visited[srcRow][srcCol] = true;
    dfsVisited[srcRow][srcCol] = true;

    let cell = document.querySelector( `.cell[rowId="${srcRow}"][colId="${srcCol}"]`);
    cell.style.backgroundColor = "lightblue";
    await colorPromise();

    for (let children= 0; children < graphComponentMatrix[srcRow][srcCol].length; children++) {
        let [nbrRow, nbrCol] = graphComponentMatrix[srcRow][srcCol][children];
        if(visited[nbrRow][nbrCol] === false) {
            let response = await dfsCyclicDetectionTracePath(graphComponentMatrix, nbrRow, nbrCol, visited, dfsVisited);
            if(response === true) {
                cell.style.backgroundColor = "transparent";
                await colorPromise();

                return Promise.resolve(true);
            } 
        }
        else if (visited[nbrRow][nbrCol] === true && dfsVisited[nbrRow][nbrCol] === true) {
            let cyclicCell = document.querySelector( `.cell[rowId="${nbrRow}"][colId="${nbrCol}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();
            cyclicCell.style.backgroundColor = "transparent";
           
            cell.style.backgroundColor = "transparent";
            await colorPromise();
            return Promise.resolve(true);
        }
    }
    dfsVisited[srcRow][srcCol] = false;
    return Promise.resolve(false);
}