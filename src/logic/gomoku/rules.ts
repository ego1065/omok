import type { Cell, Coord, GameResult, Stone } from '../../types/gomoku'
import { WIN_LENGTH } from './constants'

const DIRS: ReadonlyArray<Coord> = [
  { r: 0, c: 1 },
  { r: 1, c: 0 },
  { r: 1, c: 1 },
  { r: 1, c: -1 },
]

function inside(board: Cell[][], at: Coord): boolean {
  return at.r >= 0 && at.r < board.length && at.c >= 0 && at.c < board[0]!.length
}

function cell(board: Cell[][], at: Coord): Cell {
  return board[at.r]?.[at.c] ?? null
}

export function checkWinner(board: Cell[][], lastMove: { stone: Stone; at: Coord } | null): GameResult {
  if (!lastMove) return { kind: 'playing' }

  const { stone, at } = lastMove
  for (const d of DIRS) {
    const line: Coord[] = [at]

    // backward
    for (let k = 1; k < WIN_LENGTH; k++) {
      const p = { r: at.r - d.r * k, c: at.c - d.c * k }
      if (!inside(board, p) || cell(board, p) !== stone) break
      line.unshift(p)
    }

    // forward
    for (let k = 1; k < WIN_LENGTH; k++) {
      const p = { r: at.r + d.r * k, c: at.c + d.c * k }
      if (!inside(board, p) || cell(board, p) !== stone) break
      line.push(p)
    }

    if (line.length >= WIN_LENGTH) {
      return { kind: 'win', winner: stone, line: line.slice(0, WIN_LENGTH) }
    }
  }

  // draw
  for (const row of board) for (const x of row) if (x === null) return { kind: 'playing' }
  return { kind: 'draw' }
}

