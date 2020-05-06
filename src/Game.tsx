
import {SmartPlaceForNoBadPieces} from "./Players/SmartPlaceForNoBadPieces"
import { RandomPlayer } from "./Players/RandomPlayer";
import { DirectWin} from "./Players/DirectWinPlayer";
import { SmartAggresive } from "./Players/SmartAggresive";
import { SmartDefensive } from "./Players/SmartDefensive";

export interface Player {
    getMove(board: BoardLogic): Move;
  }
  


export interface Move {
    location: number;
    nextPiece: number;
    log? : string;
  }

type HistoryRecord =
{
  board : BoardLogic
  player : number
  log? : string
}

export class GameLogic {


    public player1: Player = new SmartAggresive();
    public player2: Player = new SmartDefensive();
    
  
    public currentPlayer: number = 1;
  
    public history : HistoryRecord[] = [];  

    constructor() {
  
    }
  
    public reset(): void {
      this.currentPlayer = 1;
      this.history = [];
    }
  
    public DoMove(boardLogic: BoardLogic): void {
  
      let record : HistoryRecord = {
        board : boardLogic.clone(),
        player : this.currentPlayer
      }
      
      let move: Move;
      if (this.currentPlayer == 1) {
        move = this.player1.getMove(boardLogic);
        this.currentPlayer = 2;
      } else {
        move = this.player2.getMove(boardLogic);
        this.currentPlayer = 1;
      }
  
      record.log = move.log;

      this.history.push(record);

      if (!move.location) {
        //something went wrong!
      }
  
      boardLogic.executeMove(move);

    }
  
  }
  

export class BoardLogic {

    static winCells: number[][] = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
    [0, 5, 10, 15], [3, 6, 9, 12]];
  
  
    //Maps each peace number to the bitvalues of each of the 4 properties.                            
    static PieceBitValue: number[][] = [
      //form, color, holes, size
      [1, 1, 0, 1],
      [1, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ]
  
    public static IDGen = 0;
  
    //
    public winCellIndex: number = -1;
    public nextPiece = 4;
  
    public ID : number =0;
  
    public pieces : number[];
  

  
    constructor(initialpieces: number[], needsWinnerCheck=true) {
      this.ID = BoardLogic.IDGen;
      BoardLogic.IDGen++;
  
      if (initialpieces == null) { 
        this.pieces = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
      } else {
        this.pieces = initialpieces.slice();
      }
    
      if (needsWinnerCheck) this.checkWinner();
    }
  
    public clone() : BoardLogic{
      let result = new BoardLogic(this.pieces, false);
      result.nextPiece = this.nextPiece;
      result.winCellIndex = this.winCellIndex;
      return result;
    }

    public reset() {
      this.winCellIndex = -1;
      this.nextPiece = 4;
      this.pieces = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
    }
  
    
    //returns 0 = starting state player wins.
    //returns 1 = opposing player wins
    //returns 2 = draw
    public playOut(player : Player) : number { 
      //playout a single game.
      let result = 0;
      while (this.winCellIndex == -1) {
        let m = player.getMove(this);
        this.executeMove(m);
        result = (result==0)?1:0;
      }
      if (this.winCellIndex==-2) {return 2;}
      return result;
    }
  
    public getAvailablePieces(): number[] {
      let result = Array.from(Array(16)).map((e, i) => i + 1)
      this.pieces.forEach((v, i) => {
        if (v != 0) {
          result[v - 1] = 0;
        }
      });
      return result;
    }
  
  
    public getAvailableLocations(): number[] {
      let result = Array(16);
      this.pieces.forEach((v, i) => {
        if (v == 0) {
          result[i] = i + 1;
        }
      });
      return result.filter((v) => v != 0).map((v) => v - 1);
    }
  
    public hasDirectWinLocation() : number {
  
      //we have a piece in nextPiece
      //is there ANY location where this nextPiece would result in a direct WIN situation?
      let result = -1;
      let locations = this.getAvailableLocations();
  
      for (let index = 0; index < locations.length; index++) {
      
        var loc = locations[index];
        var bl = this.simulateMove({ location: loc, nextPiece:-1}); 
        
        if (bl.winCellIndex>=0) {
          result=loc;
        }
      }
  
      return result;
    }
  
    public simulateMove(move: Move) : BoardLogic {
      var result = new BoardLogic(this.pieces, false);
      result.pieces[move.location] = this.nextPiece;
      result.nextPiece = move.nextPiece;
      result.checkWinner();
      return result;
    }
  
  
    public executeMove(move: Move): void {
  
      this.pieces[move.location] = this.nextPiece;
      this.nextPiece = move.nextPiece;
      this.checkWinner();
  
    }
  
    public checkWinner(): void {
  
      BoardLogic.winCells.forEach((locations, index) => {
        let p1 = this.pieces[locations[0]];
        let p2 = this.pieces[locations[1]];
        let p3 = this.pieces[locations[2]];
        let p4 = this.pieces[locations[3]];
  
        if ((p1 != 0) && (p2 != 0) && (p3 != 0) && (p4 != 0)) {
          //locations all have a piece. now we look at the 4 location for simular 
          for (let i = 0; i < 4; i++) {
            if ((BoardLogic.PieceBitValue[p1 - 1][i] == BoardLogic.PieceBitValue[p2 - 1][i]) &&
              (BoardLogic.PieceBitValue[p2 - 1][i] == BoardLogic.PieceBitValue[p3 - 1][i]) &&
              (BoardLogic.PieceBitValue[p3 - 1][i] == BoardLogic.PieceBitValue[p4 - 1][i])) {
              // 
              this.winCellIndex = index;
            }
          }
        }
      });
  
      if (this.winCellIndex == -1) {
        if (this.getAvailableLocations().length == 0) {
          //it's a drwaw!
          this.winCellIndex = -2;
        }
      }
  
      if (this.winCellIndex == -1) {
        if (this.nextPiece == undefined) {
          console.log("Illegal move.");
          this.winCellIndex = -3;
        }
      }
      //second possibility is a draw.
  
    }
  
  }
  