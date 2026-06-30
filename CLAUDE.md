# Quatro

React/TypeScript implementation of the [Quarto board game](https://en.wikipedia.org/wiki/Quarto_(board_game)) designed to be embedded as components in a blog.

## Game Rules

- 4×4 board, 16 unique pieces each with 4 binary properties: form (round/square), color (light/dark), holes (hole/solid), size (tall/short)
- On your turn you **place** the piece your opponent gave you, then **choose** which piece your opponent must place next
- Win by placing 4 pieces in a row/column/diagonal that all share at least one property

## Tech Stack

- **TypeScript 5** + **React 18** (loaded as CDN externals)
- **Webpack 5** bundles `src/` → `dist/quatro.js`
- **Bootstrap 5** for layout

## Build

```bash
npm run build   # one-shot build
npm run watch   # watch mode (npx webpack -w)
```

Serve `index.html` with VS Code Live Server for local development.

## Component Usage

Load `dist/quatro.js` and `dist/quatro.css` in your page (React must already be on the global scope). Components are mounted automatically on elements with specific CSS classes:

| Class | Description | Data attribute |
|---|---|---|
| `.qgame` | Interactive game with AI players | — |
| `.qboard` | Static board display | `data-pieces="0,0,4,1,..."` (16 values, 0=empty) |
| `.qcells` | Piece strip display | `data-pieces="1,3,5,..."` |
| `.qexplain` | Animated win-pattern explainer | — |

## Source Structure

```
src/
  index.tsx               — entry: mounts components on DOM elements
  Game.tsx                — BoardLogic (rules, win detection) + GameLogic (turn management)
  Board.tsx               — board rendering component
  Cell.tsx                — single cell + piece image rendering
  BoardWithGame.tsx       — interactive game controller with stats
  BoardExplainWinStates.tsx — animated win-pattern explainer
  Shared.tsx              — shared TypeScript interfaces
  Players/
    RandomPlayer.tsx
    DirectWinPlayer.tsx
    SmartPlaceForNoBadPieces.tsx
    SmartAggresive.tsx
    SmartDefensive.tsx
    MonteCarloPlayer.tsx
    DirectWinNoBadPieces.tsx
```

## AI Players

All implement `Player { getMove(board: BoardLogic): Move }`:

| Player | Strategy |
|---|---|
| `RandomPlayer` | Random moves |
| `DirectWinPlayer` | Take winning move if available, else random |
| `SmartPlaceForNoBadPieces` | Avoid giving opponent a winning piece |
| `SmartAggresive` | Minimize opponent's safe piece options |
| `SmartDefensive` | Maximize own safe piece options |
| `DirectWinNoBadPieces` | Win immediately + avoid bad pieces |
| `MonteCarloPlayer` | 100 playouts per candidate move using DirectWin |

Default matchup: **SmartAggresive** (P1) vs **SmartDefensive** (P2).

## Key Types

```typescript
interface Move { location: number; nextPiece: number; log?: string; }
interface Player { getMove(board: BoardLogic): Move; }
```

`BoardLogic.pieces` is a 16-element array; piece values are 1–16 (0 = empty). `winCellIndex` is -1 (playing), ≥0 (winner index into `winCells`), -2 (draw), -3 (illegal state).
