
import React from 'react'
import {Player, Move, BoardLogic} from "../Game"



export class SmartAggresive implements Player {

   

    getSafePieces(board : BoardLogic, move:number) : number[] {

      let availablePieces = board.getAvailablePieces().filter((v) => v != 0).filter((v) => v != board.nextPiece); 
      var safePieces = [];
      //zeker weten dat een piece niet een 'win' oplevert perongeluk...
      for (let index = 0; index < availablePieces.length; index++) {
        let p = availablePieces[index];
 
        let bl = new BoardLogic(board.pieces,false);
        bl.nextPiece = board.nextPiece;
        bl.executeMove({ location:move,nextPiece:p});
        let winloc = bl.hasDirectWinLocation();
         let directWin = (winloc!=-1);
        if (directWin==false) {
          safePieces.push(p);
        }
      }
      return safePieces;
    }
  
  
    getMove(board: BoardLogic): Move {
  

     let log = "i'm SmartPlaceForNoBadPieces. <br />" ; 

      //als er een 'directe' winnaar is, dan speel je die uiteraard!
      let winloc = board.hasDirectWinLocation();
      if (winloc!=-1) {
        return {
          location:winloc,
          nextPiece :-1,
          log : log + " I saw a direct win!."
        }
      }
  
      //als er géén directe winnaar is, dan gaan we naar een geschikte locatie zoeken
      //1 niet op een locatie plaatsen waarbij ik de tegenstander een winnnend stuk MOET overhandigen.
      //random logic
      var availableMoves = board.getAvailableLocations();
      var availablePieces = board.getAvailablePieces().filter((v) => v != 0).filter((v) => v != board.nextPiece);
  
      log += "availMoves: "+ availableMoves.length + " - availPieces: "+ availablePieces.length + "<br />";
  
      //probeer ALLE moves en ALLE pieces uit.
      //var safeMoves = []
  
      //look for the move which gives the SMALLEST amount of safePieces

      let smallestMove = -1;
      let smallestSafe = 20;


      for (let index = 0; index < availableMoves.length; index++) {
        const m = availableMoves[index];
  
        let safePieces = this.getSafePieces(board,m); 
        if (safePieces.length>0) {
           if (safePieces.length<smallestSafe)
           {
               smallestSafe = safePieces.length;
               smallestMove = m;
           }
        }
      }

      //log += "number of saveMoves : " + safeMoves.length + " ";
  
      let move = 0;

      if (smallestMove ==-1)
      {
        move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      } else {
        move= smallestMove;
      }
  
      log += "i will move to : " + move + " ";

      var savePieces = this.getSafePieces(board,move);
      var piece=0;

      log += "number of savePieces : " + savePieces.length + " ";
      log += "savePieces i think of are " + savePieces.join(",") + " ";
 
      if (savePieces.length>0) {
        piece = savePieces[Math.floor(Math.random() * savePieces.length)];
      } else
      {
        //helaas.. je moet wel..
        piece = availablePieces[Math.floor(Math.random() * availablePieces.length)];
      }
  
      return {
        location: move,
        nextPiece: piece,
        log : log
      };
    }
  }
  