import { describe, expect, it } from 'vitest'
import { createEmptyBoard, placeStone } from './board'
import { pickAiMove } from './ai'

describe('pickAiMove', () => {
  it('plays winning move when available', () => {
    let board = createEmptyBoard(15)
    // W has four in a row, should complete five
    for (let c = 5; c < 9; c++) board = placeStone(board, { r: 7, c }, 'W')
    const at = pickAiMove(board, 'W')
    expect(at).toBeTruthy()
    expect([4, 9]).toContain(at!.c)
    expect(at!.r).toBe(7)
  })

  it('blocks opponent winning move', () => {
    let board = createEmptyBoard(15)
    for (let c = 5; c < 9; c++) board = placeStone(board, { r: 7, c }, 'B')
    const at = pickAiMove(board, 'W')
    expect(at).toBeTruthy()
    expect([4, 9]).toContain(at!.c)
    expect(at!.r).toBe(7)
  })
})

