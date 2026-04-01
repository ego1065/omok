import { describe, expect, it } from 'vitest'
import { createEmptyBoard, placeStone } from './board'
import { generateCandidateMoves, pickAiMove } from './ai'

describe('pickAiMove', () => {
  it('plays winning move when available', () => {
    let board = createEmptyBoard(15)
    // white has four in a row, should complete five
    for (let c = 5; c < 9; c++) board = placeStone(board, { r: 7, c }, 'white')
    const at = pickAiMove(board, 'white')
    expect(at).toBeTruthy()
    expect([4, 9]).toContain(at!.c)
    expect(at!.r).toBe(7)
  })

  it('blocks opponent winning move', () => {
    let board = createEmptyBoard(15)
    for (let c = 5; c < 9; c++) board = placeStone(board, { r: 7, c }, 'black')
    const at = pickAiMove(board, 'white')
    expect(at).toBeTruthy()
    expect([4, 9]).toContain(at!.c)
    expect(at!.r).toBe(7)
  })
})

describe('generateCandidateMoves', () => {
  it('picks center on empty board', () => {
    const board = createEmptyBoard(15)
    const cands = generateCandidateMoves(board, 2)
    expect(cands).toEqual([{ r: 7, c: 7 }])
  })

  it('limits candidates within 2 cells of existing stones (and in bounds)', () => {
    let board = createEmptyBoard(15)
    board = placeStone(board, { r: 7, c: 7 }, 'black')
    const cands = generateCandidateMoves(board, 2)
    expect(cands.length).toBeGreaterThan(0)
    for (const at of cands) {
      expect(Math.abs(at.r - 7)).toBeLessThanOrEqual(2)
      expect(Math.abs(at.c - 7)).toBeLessThanOrEqual(2)
      expect(at.r).toBeGreaterThanOrEqual(0)
      expect(at.c).toBeGreaterThanOrEqual(0)
      expect(at.r).toBeLessThan(15)
      expect(at.c).toBeLessThan(15)
    }
  })
})

