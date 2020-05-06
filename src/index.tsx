import * as React from "react";
import * as ReactDOM from "react-dom";

import { Board } from "./Board"
import { BoardWithGame} from "./BoardWithGame"
import { BoardExplainWinStates } from "./BoardExplainWinStates"
import { Cells} from "./Cell";

const containers = document.querySelectorAll(".qboard");
containers.forEach(function(container) {
    let datapieces = container.getAttribute("data-pieces");
    if (datapieces) {
        let pieces = datapieces.split(",").map(Number);
        ReactDOM.render( <Board pieces={pieces} highlightLocation={[]}></Board> , container);
    }
});

const qCelles = document.querySelectorAll('.qcells');
qCelles.forEach( function(cell) {
    let datacells = cell.getAttribute("data-pieces");
    if (datacells) {
        let pieces = datacells.split(",").map(Number);
        ReactDOM.render( <Cells pieces={pieces}></Cells> , cell);
    }
});

const domContainer = document.querySelector('.qgame');
if (domContainer) {
    ReactDOM.render( <BoardWithGame></BoardWithGame> , domContainer);
}

const domContainer2= document.querySelector('.qexplain');
if (domContainer2) {
    ReactDOM.render( <BoardExplainWinStates></BoardExplainWinStates> , domContainer2);
}
