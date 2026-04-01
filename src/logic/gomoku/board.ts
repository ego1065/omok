import type { Board, Cell, Coord, Stone } from '../../types/gomoku'
import { clone2D } from '../../utils/array'

export function createEmptyBoard(size: number): Board {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => null))
}

export function isInside(size: number, { r, c }: Coord): boolean {
  return r >= 0 && r < size && c >= 0 && c < size
}

export function getCell(board: Board, at: Coord): Cell {
  return board[at.r]?.[at.c] ?? null
}

export function canPlace(board: Board, at: Coord): boolean {
  return getCell(board, at) === null
}

export function placeStone(board: Board, at: Coord, stone: Stone): Board {
  const next = clone2D(board)
  next[at.r][at.c] = stone
  return next
}

export function listEmptyCells(board: Board): Coord[] {
  const res: Coord[] = []
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === null) res.push({ r, c })
    }
  }
  return res
}

// -----------------------------
// 체크리스트 호환 함수 (row/col 시그니처)
// -----------------------------

export function isInBounds(board: Board, row: number, col: number): boolean {
  return row >= 0 && row < board.length && col >= 0 && col < board[0]!.length
}

export function isCellEmpty(board: Board, row: number, col: number): boolean {
  return board[row]?.[col] === null
}

export function placeStoneAt(board: Board, row: number, col: number, stone: Stone): Board {
  return placeStone(board, { r: row, c: col }, stone)
}

