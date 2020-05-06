

import {Player, Move, BoardLogic} from "../Game"



export class DirectWin implements Player {
    getMove(board: BoardLogic): Move {
  
      
      //als er een 'directe' winnaar is, dan speel je die uiteraard!
      let winloc = board.hasDirectWinLocation();
      if (winloc!=-1) {
        return {
          location:winloc,
          nextPiece :-1
        }
      }
  
      //als er géén directe winnaar is, dan gaan we naar een geschikte locatie zoeken
      //1 niet op een locatie plaatsen waarbij ik de tegenstander een winnnend stuk MOET overhandigen.
      //random logic
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