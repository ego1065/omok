import { describe, expect, it } from 'vitest'
import { createEmptyBoard, placeStone } from './board'
import { checkWinner } from './rules'

describe('checkWinner', () => {
  it('detects horizontal 5-in-a-row', () => {
    const b = createEmptyBoard(15)
    let board = b
    for (let c = 3; c < 8; c++) board = placeStone(board, { r: 7, c }, 'black')
    const r = checkWinner(board, { stone: 'black', at: { r: 7, c: 7 } })
    expect(r.kind).toBe('win')
    if (r.kind === 'win') expect(r.winner).toBe('black')
  })

  it('detects vertical 5-in-a-row', () => {
    let board = createEmptyBoard(15)
    for (let r = 4; r < 9; r++) board = placeStone(board, { r, c: 10 }, 'white')
    const res = checkWinner(board, { stone: 'white', at: { r: 8, c: 10 } })
    expect(res.kind).toBe('win')
    if (res.kind === 'win') expect(res.winner).toBe('white')
  })

  it('detects diagonal (\\) 5-in-a-row', () => {
    let board = createEmptyBoard(15)
    for (let i = 0; i < 5; i++) board = placeStone(board, { r: 2 + i, c: 3 + i }, 'black')
    const res = checkWinner(board, { stone: 'black', at: { r: 6, c: 7 } })
    expect(res.kind).toBe('win')
  })

  it('detects diagonal (/) 5-in-a-row', () => {
    let board = createEmptyBoard(15)
    for (let i = 0; i < 5; i++) board = placeStone(board, { r: 10 - i, c: 4 + i }, 'white')
    const res = checkWinner(board, { stone: 'white', at: { r: 6, c: 8 } })
    expect(res.kind).toBe('win')
  })
})

