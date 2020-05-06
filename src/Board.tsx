import React from 'react';
import {BoardProps, BoardState} from "./Shared"
import {Cell} from "./Cell"


export class Board extends React.Component<BoardProps, BoardState>{

    constructor(props: BoardProps) {
      super(props);
  
    }
  
  
    public getOtherPieces(pieces: number[]): number[] {
      let result = Array.from(Array(16)).map((e, i) => i + 1)
      pieces.forEach((v, i) => {
        if (v != 0) {
          result[v - 1] = 0;
        }
      });
      return result;
    }
  
    render() {
  
      // let otherPieces = this.state.boardLogic.getAvailablePieces();
      // let pieces = this.state.boardLogic.pieces;
  
      // let winners : number[] = [-1,-1,-1,-1];
      // if (this.state.boardLogic.winCellIndex>=0) {
      //   winners = BoardLogic.winCells[this.state.boardLogic.winCellIndex];
      // }
      // if (this.state.boardLogic.winCellIndex==-2) {
      //   winners = [0,3,12,15];
      // }
  
      // let nextPieceLocation = this.state.boardLogic.nextPiece-1;
  
      let pieces = this.props.pieces;
      let otherPieces = this.getOtherPieces(pieces);
  
      let nextPieceLocation = (this.props.nextPiece||0) -1;
      let winners = this.props.highlightLocation || [];
  
      return (
        <div>
          <table className="free">
            <tr>
              <td><Cell index={otherPieces[0]} highlight={nextPieceLocation == 0} /></td>
              <td><Cell index={otherPieces[1]} highlight={nextPieceLocation == 1} /></td>
              <td><Cell index={otherPieces[2]} highlight={nextPieceLocation == 2} /></td>
              <td><Cell index={otherPieces[3]} highlight={nextPieceLocation == 3} /></td>
            </tr>
            <tr>
              <td><Cell index={otherPieces[4]} highlight={nextPieceLocation == 4} /></td>
              <td><Cell index={otherPieces[5]} highlight={nextPieceLocation == 5} /></td>
              <td><Cell index={otherPieces[6]} highlight={nextPieceLocation == 6} /></td>
              <td><Cell index={otherPieces[7]} highlight={nextPieceLocation == 7} /></td>
            </tr>
            <tr>
              <td><Cell index={otherPieces[8]} highlight={nextPieceLocation == 8} /></td>
              <td><Cell index={otherPieces[9]} highlight={nextPieceLocation == 9} /></td>
              <td><Cell index={otherPieces[10]} highlight={nextPieceLocation == 10} /></td>
              <td><Cell index={otherPieces[11]} highlight={nextPieceLocation == 11} /></td>
            </tr>
            <tr>
              <td><Cell index={otherPieces[12]} highlight={nextPieceLocation == 12} /></td>
              <td><Cell index={otherPieces[13]} highlight={nextPieceLocation == 13} /></td>
              <td><Cell index={otherPieces[14]} highlight={nextPieceLocation == 14} /></td>
              <td><Cell index={otherPieces[15]} highlight={nextPieceLocation == 15} /></td>
            </tr>
          </table>
  
          <table className="board">
            <tr>
              <td><Cell index={pieces[0]} highlight={winners.includes(0)} /></td>
              <td><Cell index={pieces[1]} highlight={winners.includes(1)} /></td>
              <td><Cell index={pieces[2]} highlight={winners.includes(2)} /></td>
              <td><Cell index={pieces[3]} highlight={winners.includes(3)} /></td>
            </tr>
            <tr>
              <td><Cell index={pieces[4]} highlight={winners.includes(4)} /></td>
              <td><Cell index={pieces[5]} highlight={winners.includes(5)} /></td>
              <td><Cell index={pieces[6]} highlight={winners.includes(6)} /></td>
              <td><Cell index={pieces[7]} highlight={winners.includes(7)} /></td>
            </tr>
            <tr>
              <td><Cell index={pieces[8]} highlight={winners.includes(8)} /></td>
              <td><Cell index={pieces[9]} highlight={winners.includes(9)} /></td>
              <td><Cell index={pieces[10]} highlight={winners.includes(10)} /></td>
              <td><Cell index={pieces[11]} highlight={winners.includes(11)} /></td>
            </tr>
            <tr>
              <td><Cell index={pieces[12]} highlight={winners.includes(12)} /></td>
              <td><Cell index={pieces[13]} highlight={winners.includes(13)} /></td>
              <td><Cell index={pieces[14]} highlight={winners.includes(14)} /></td>
              <td><Cell index={pieces[15]} highlight={winners.includes(15)} /></td>
            </tr>
          </table>
        </div>
      );
    }
  }
  