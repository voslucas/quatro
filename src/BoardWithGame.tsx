import React, { ChangeEvent, Fragment } from 'react';

import {BoardProps, EmptyProps} from "./Shared"
import {Board} from "./Board"
import {BoardLogic , GameLogic} from "./Game"


'use strict';


type BoardWithGameState = {
  gameLogic: GameLogic;
  boardLogic: BoardLogic;
  player1wins: number;
  player2wins: number;
  draws: number;
  historyIndex : number;
}


export class BoardWithGame extends React.Component<EmptyProps, BoardWithGameState>{
  private isBusy = false;

  constructor(props: BoardProps) {
    super(props);

    this.state = {
      gameLogic: new GameLogic(),
      boardLogic: new BoardLogic([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      player1wins: 0,
      player2wins: 0,
      draws: 0,
      historyIndex:0
    }
  }


  reset() {
    this.state.gameLogic.reset();
    this.state.boardLogic.reset();
  }

  nextMove() {
    this.state.gameLogic.DoMove(this.state.boardLogic);
    this.setState(
      {
        boardLogic: this.state.boardLogic
      }
    )
  }

  playSingle() {

    if (this.isBusy) { return; }
    this.isBusy = true;

    //begin opnieuw als iemand al gewonnen heeft!
    if (this.state.boardLogic.winCellIndex != -1) {
      this.reset();
    }

    //playout a single game.
    while (this.state.boardLogic.winCellIndex == -1) {
      this.state.gameLogic.DoMove(this.state.boardLogic);
    }


    //update stats;
    let p1wins = this.state.player1wins;
    let p2wins = this.state.player2wins;
    let draws = this.state.draws;
    if (this.state.boardLogic.winCellIndex == -2) {
      draws++;
    }

    if (this.state.boardLogic.winCellIndex >= 0) {
      //hij schiet altijd 1 player wissel door.. dus als het nu player 1 is, dan heeft 2 gewonnen.
      if (this.state.gameLogic.currentPlayer == 1) {
        p2wins++;
      } else {
        p1wins++;
      }
    }

    this.setState(
      {
        boardLogic: this.state.boardLogic,
        player1wins: p1wins,
        player2wins: p2wins,
        draws: draws
      }
    );
    this.isBusy = false;
  }

  private timeOutID?: number;

  componentWillUnmount() {
    clearTimeout(this.timeOutID);
  }

  startLoop(): void {
    clearTimeout(this.timeOutID);
    this.timeOutID = setTimeout(() => {
      this.playSingle();
      this.startLoop();
    }, 10);
  }

  stopLoop(): void {
    clearTimeout(this.timeOutID);
  }

  setHistory(e: React.ChangeEvent<HTMLSelectElement>) : void{
    this.setState(
      {
        historyIndex: parseInt(e.target.value)
      }
    );
  }

  render() {
    //calc higlighted cells.. if any.
    let winners: number[] = [];
    if (this.state.boardLogic.winCellIndex >= 0) {
      winners = BoardLogic.winCells[this.state.boardLogic.winCellIndex];
    }
    if (this.state.boardLogic.winCellIndex == -2) {
      winners = [0, 3, 12, 15];
    }
    
    //option list
    let optionList = this.state.gameLogic.history.map( (h,i)=> 
      <option key={i} value={i}>{ "Move " + i + " : Player " + h.player }</option>
    );

    //history game?
    let hasHisBoard = this.state.gameLogic.history[this.state.historyIndex];
    let hisBoard = <Fragment></Fragment>;
    let hisLog = "";

    if (hasHisBoard) {
       hisBoard =  
        <Board pieces={hasHisBoard.board.pieces}
        nextPiece = {hasHisBoard.board.nextPiece}
        highlightLocation = {[]}
        ></Board>
      hisLog = hasHisBoard.log||"";
    }



    return (
      <div>
        <span> Current player is : {this.state.gameLogic.currentPlayer} </span>
        <span> Stats p1-p2-draw : {this.state.player1wins} - {this.state.player2wins} - {this.state.draws} </span>
        {/* <Board boardLogic={this.state.boardLogic} pieces={[]}></Board> */}
        <Board pieces={this.state.boardLogic.pieces}
          highlightLocation={winners}
          nextPiece={this.state.boardLogic.nextPiece}
        >
        </Board>
        <button className="btn" onClick={() => { this.nextMove() }}>Next Move</button>
        <button className="btn" onClick={() => { this.playSingle() }}>Single game</button>
        <button className="btn" onClick={() => { this.startLoop() }}>Start Loop</button>
        <button className="btn" onClick={() => { this.stopLoop() }}>Stop Loop</button>
        <br></br>
        <span>History of {this.state.gameLogic.history.length} moves of the last game and selected {this.state.historyIndex}.</span>
        <select onChange={(event)=> { this.setHistory(event) } } >{optionList}</select>
        {hisBoard}
        <span>{hisLog}</span>
      </div>
    )
  }

}



