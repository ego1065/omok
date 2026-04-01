import { describe, expect, it } from 'vitest'
import { createEmptyBoard, isCellEmpty, isInBounds, placeStone, placeStoneAt } from './board'

describe('board utils', () => {
  it('createEmptyBoard creates size x size null board', () => {
    const b = createEmptyBoard(15)
    expect(b).toHaveLength(15)
    expect(b[0]).toHaveLength(15)
    expect(b[7]![7]).toBeNull()
  })

  it('isInBounds works with row/col', () => {
    const b = createEmptyBoard(15)
    expect(isInBounds(b, 0, 0)).toBe(true)
    expect(isInBounds(b, 14, 14)).toBe(true)
    expect(isInBounds(b, -1, 0)).toBe(false)
    expect(isInBounds(b, 0, 15)).toBe(false)
  })

  it('isCellEmpty reflects placements', () => {
    const b = createEmptyBoard(15)
    expect(isCellEmpty(b, 7, 7)).toBe(true)
    const b2 = placeStoneAt(b, 7, 7, 'black')
    expect(isCellEmpty(b2, 7, 7)).toBe(false)
  })

  it('placeStone is immutable (does not mutate input)', () => {
    const b = createEmptyBoard(15)
    const b2 = placeStone(b, { r: 7, c: 7 }, 'black')
    expect(b[7]![7]).toBeNull()
    expect(b2[7]![7]).toBe('black')
  })
})

