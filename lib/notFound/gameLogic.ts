import {
  CELL,
  NOT_FOUND_LEVELS,
  type CellValue,
  type INotFoundLevel,
} from "../../data/notFoundLevels";

export type Dir = "left" | "right";
export type Pos = { r: number; c: number };
export type Grid = CellValue[][];

export function cloneGrid(level: INotFoundLevel): Grid {
  return level.grid.map((row) => row.slice() as CellValue[]);
}

export function findCell(grid: Grid, value: CellValue): Pos {
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c] === value) return { r, c };
    }
  }
  throw new Error(`Missing cell value ${value}`);
}

export function rotateGrid(grid: Grid, dir: Dir): { grid: Grid; player: Pos; exit: Pos } {
  const size = grid.length;
  const next: Grid = Array.from({ length: size }, () => Array<CellValue>(size).fill(CELL.EMPTY));

  for (let r = 0; r < size; r++) {
    const row = grid[r];
    for (let c = 0; c < size; c++) {
      if (dir === "right") next[c][size - 1 - r] = row[c];
      else next[size - 1 - c][r] = row[c];
    }
  }

  return {
    grid: next,
    player: findCell(next, CELL.PLAYER),
    exit: findCell(next, CELL.EXIT),
  };
}

export function gravityDest(grid: Grid, player: Pos): number {
  const size = grid.length;
  let destR = player.r;
  for (let row = player.r + 1; row < size; row++) {
    const value = grid[row][player.c];
    if (value === CELL.WALL) break;
    destR = row;
    if (value === CELL.EXIT) break;
  }
  return destR;
}

const first = NOT_FOUND_LEVELS[0];
const initialGrid = cloneGrid(first);

/** Precomputed tutorial state — avoids clone/find work on first paint. */
export const INITIAL_LEVEL = {
  index: 0,
  level: first,
  grid: initialGrid,
  player: findCell(initialGrid, CELL.PLAYER),
  exit: findCell(initialGrid, CELL.EXIT),
  size: initialGrid.length,
} as const;
