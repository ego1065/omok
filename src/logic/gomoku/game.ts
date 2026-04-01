import type { GameState, Stone } from '../../types/gomoku'
import { createEmptyBoard, placeStone } from './board'
import { GOMOKU_SIZE } from './constants'
import { checkWinner } from './rules'

export function createInitialState(size: number = GOMOKU_SIZE): GameState {
  return {
    size,
    board: createEmptyBoard(size),
    turn: 'black',
    result: { kind: 'playing' },
    lastMove: null,
  }
}

export function applyMove(state: GameState, at: { r: number; c: number }, stone: Stone): GameState {
  const board = placeStone(state.board, at, stone)
  const lastMove = { stone, at }
  const result = checkWinner(board, lastMove)
  const turn: Stone = stone === 'black' ? 'white' : 'black'
  return { ...state, board, lastMove, result, turn }
}

