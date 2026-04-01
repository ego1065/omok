import type { Cell, Coord, Stone } from '../../types/gomoku'
import { clone2D } from '../../utils/array'

export function createEmptyBoard(size: number): Cell[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => null))
}

export function isInside(size: number, { r, c }: Coord): boolean {
  return r >= 0 && r < size && c >= 0 && c < size
}

export function getCell(board: Cell[][], at: Coord): Cell {
  return board[at.r]?.[at.c] ?? null
}

export function canPlace(board: Cell[][], at: Coord): boolean {
  return getCell(board, at) === null
}

export function placeStone(board: Cell[][], at: Coord, stone: Stone): Cell[][] {
  const next = clone2D(board)
  next[at.r][at.c] = stone
  return next
}

export function listEmptyCells(board: Cell[][]): Coord[] {
  const res: Coord[] = []
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === null) res.push({ r, c })
    }
  }
  return res
}

