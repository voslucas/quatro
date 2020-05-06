

export type BoardProps = {
    // 16 items ; 0 = no pieces ; 1..16 = pieces
    pieces: number[];
    // variable number; gives 0-based location to highlight.
    highlightLocation?: number[];
    //boardLogic? : BoardLogic;
    nextPiece?: number;
    
  }
  
export type BoardState = {
    //boardLogic : BoardLogic
  }
  
export type EmptyProps = {
    //
}
 