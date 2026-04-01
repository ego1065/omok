import { describe, expect, it } from 'vitest'
import { createEmptyBoard, placeStone } from './board'
import { checkWinner } from './rules'

describe('checkWinner', () => {
  it('detects horizontal 5-in-a-row', () => {
    const b = createEmptyBoard(15)
    let board = b
    for (let c = 3; c < 8; c++) board = placeStone(board, { r: 7, c }, 'B')
    const r = checkWinner(board, { stone: 'B', at: { r: 7, c: 7 } })
    expect(r.kind).toBe('win')
    if (r.kind === 'win') expect(r.winner).toBe('B')
  })
})

