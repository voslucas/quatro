import React from 'react';

import {EmptyProps} from "./Shared"
import {Board} from "./Board"
import {BoardLogic} from "./Game"


export class BoardExplainWinStates extends React.Component<EmptyProps, EmptyProps> {

    constructor(props: EmptyProps) {
      super(props);
  
    }
  
    private timerID? : number;
    private winnerID : number =0;
    private winners : number[] = [];
  
    componentDidMount() {
      this.timerID = setInterval( ()=> {this.onTimer()},500);
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    onTimer() : void {
        this.winnerID++;
        if (this.winnerID>=BoardLogic.winCells.length) {
          this.winnerID=0;
        }
        this.winners = BoardLogic.winCells[this.winnerID];
       
        this.forceUpdate();
    }
  
    render() {
      return (
        <Board pieces={[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]} highlightLocation={this.winners} />
      )
    }
  
  }