
import {Player, Move, BoardLogic} from "../Game"

class DirectWinNoBadPieces implements Player {
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
  
  
      var savePieces = [];
      //zeker weten dat een piece niet een 'win' oplevert perongeluk...
      for (let index = 0; index < availablePieces.length; index++) {
        const p = availablePieces[index];
        var bl = new BoardLogic(board.pieces);
        bl.nextPiece = board.nextPiece;
        bl.executeMove({ location:move,nextPiece:p});
        
        var directWin = (bl.hasDirectWinLocation() !=-1);
        if (!directWin) {
          savePieces.push(p);
        }
      }
  
      var piece=0;
      if (savePieces.length>0) {
        piece = savePieces[Math.floor(Math.random() * savePieces.length)];
      } else
      {
        //helaas.. je moet wel..
        piece = availablePieces[Math.floor(Math.random() * availablePieces.length)];
      }
  
      return {
        location: move,
        nextPiece: piece
      };
    }
  }
  