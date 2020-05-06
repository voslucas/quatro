import {Player, Move, BoardLogic} from "../Game"



export class RandomPlayer implements Player {

    getMove(board: BoardLogic): Move {
  
  
      var availableMoves = board.getAvailableLocations();
      var move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  
      var availablePieces = board.getAvailablePieces().filter((v) => v != 0).filter((v) => v != board.nextPiece);
      var piece = availablePieces[Math.floor(Math.random() * availablePieces.length)];
  
  
      return {
        location: move,
        nextPiece: piece
      };
    }
  }