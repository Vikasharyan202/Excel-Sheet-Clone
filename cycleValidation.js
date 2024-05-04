// Storage -> 2d array
let collectedGraphComponent = [];
let graphComponentMatrix = [];

// for (let i = 0; i < rows; i++) {
//     let row = [];
//     for (let j = 0; j < columns; j++) {
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }

// True -> cyclic, False -> not cyclic
function isGraphCyclic(graphComponentMatrix) {
    // Depencency -> visited , dfsVisited (2d array)
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

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if(visited[i][j] === false) {
                let response = dfsCyclicDetection(graphComponentMatrix, i, j, visited, dfsVisited);
            // Found cycle so return immediately, no need to explore more path
            if(response == true) return [i, j];
            }
        }
    }
    return null;
}

// Start -> vis(True) dfsVis(True)
// End -> dfsVis(False)
// if vis[i][j] -> already explored path, so go back not use to explore agian
// Cycle detection condition -> if (vis[i][j] == true && dfsVis[i][j] == true) -> cycle
function dfsCyclicDetection(graphComponentMatrix, srcRow, srcCol, visited, dfsVisited) {
    visited[srcRow][srcCol] = true;
    dfsVisited[srcRow][srcCol] = true;

    for (let children= 0; children < graphComponentMatrix[srcRow][srcCol].length; children++) {
        let [nbrRow, nbrCol] = graphComponentMatrix[srcRow][srcCol][children];
        if(visited[nbrRow][nbrCol] === false) {
            let response = dfsCyclicDetection(graphComponentMatrix, nbrRow, nbrCol, visited, dfsVisited);
            if(response === true) return true; // Found cycle so return immediately, no need to explore more path
        }
        else if (visited[nbrRow][nbrCol] === true && dfsVisited[nbrRow][nbrCol] === true) {
            // Found cycle so return immediately, no need to explore more path
            return true;
        }
    }
    dfsVisited[srcRow][srcCol] = false;
    return false;
}