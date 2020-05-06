

import {Player, Move, BoardLogic} from "../Game"

import {DirectWin} from "./DirectWinPlayer"


export class MonteCarleLike implements Player {

    getMove(board: BoardLogic): Move {
 
     //als er een 'directe' winnaar is, dan speel je die uiteraard!
     let winloc = board.hasDirectWinLocation();
     if (winloc!=-1) {
       return {
         location:winloc,
         nextPiece :-1
       }
     }
 
     var availableMoves = board.getAvailableLocations();
     var availablePieces = board.getAvailablePieces().filter((v) => v != 0).filter((v) => v != board.nextPiece);
 
     //uitzonderingen
     //het kan gebeuren dat er nog WEL een move is, maar geen pieces meer. dan is er 
     if (availablePieces.length==0) {
       return {
         location: availableMoves[0],
         nextPiece: -1
       };
     }
 
     //generate ALL possible moves
     var allmoves = [];
     for (let i1 = 0; i1 < availableMoves.length; i1++) {
       const m = availableMoves[i1];
       for (let i2 = 0; i2 < availablePieces.length; i2++) {
         const p = availablePieces[i2];
         allmoves.push({
           location: m,
           nextPiece: p
         })
       }
     }
 
 
     let playoutPlayer = new DirectWin();
     let mostWins=0;
     let mostMove = allmoves[0];
  
     //loop door ALLE moves heen
     for (let index = 0; index < allmoves.length; index++) {
       const trymove = allmoves[index];
       //doe nu PER move , een 50 tal rollout's en hou bij hoe vaak je wint.
       let wins=0;
       for (let i = 0; i < 100; i++) {
         var bl = new BoardLogic(board.pieces);
         bl.executeMove(trymove);
         if (bl.playOut(playoutPlayer) ==0) {
           wins++;
         }
       }
       if (wins>mostWins){
         mostWins = wins;
         mostMove = trymove;
       }
       
     }
 
     return {
       location: mostMove.location,
       nextPiece: mostMove.nextPiece
     };
   }
 }
 