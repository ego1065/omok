import type { Board, Cell, Coord, Stone } from '../../types/gomoku'
import { listEmptyCells, placeStone } from './board'
import { checkWinner } from './rules'

type Pick = Readonly<{ at: Coord; score: number }>

const DIRS: ReadonlyArray<Coord> = [
  { r: 0, c: 1 },
  { r: 1, c: 0 },
  { r: 1, c: 1 },
  { r: 1, c: -1 },
]

function other(s: Stone): Stone {
  return s === 'black' ? 'white' : 'black'
}

function inside(board: Board, at: Coord): boolean {
  return at.r >= 0 && at.r < board.length && at.c >= 0 && at.c < board[0]!.length
}

function cell(board: Board, at: Coord): Cell {
  return board[at.r]?.[at.c] ?? null
}

function countRun(board: Board, from: Coord, d: Coord, s: Stone): number {
  let n = 0
  for (let k = 1; k <= 4; k++) {
    const p = { r: from.r + d.r * k, c: from.c + d.c * k }
    if (!inside(board, p) || cell(board, p) !== s) break
    n++
  }
  return n
}

function isOpenEnd(board: Board, from: Coord, d: Coord, len: number): boolean {
  const p = { r: from.r + d.r * (len + 1), c: from.c + d.c * (len + 1) }
  return inside(board, p) && cell(board, p) === null
}

function scoreCell(board: Board, at: Coord, s: Stone): number {
  // 간단 휴리스틱:
  // - 가까이 붙는 것(연속수) + 양끝이 열려있으면 보너스
  // - 중앙 선호(초반)
  let best = 0
  for (const d of DIRS) {
    const a = countRun(board, at, d, s)
    const b = countRun(board, at, { r: -d.r, c: -d.c }, s)
    const run = a + b
    const openA = isOpenEnd(board, at, d, a)
    const openB = isOpenEnd(board, at, { r: -d.r, c: -d.c }, b)
    const openEnds = (openA ? 1 : 0) + (openB ? 1 : 0)

    // run=0..8(이론상) 이지만 실제론 0..4 근처
    const v = run * run * 10 + openEnds * 6
    if (v > best) best = v
  }

  const mid = (board.length - 1) / 2
  const dist = Math.abs(at.r - mid) + Math.abs(at.c - mid)
  const centerBonus = Math.max(0, 20 - dist)
  return best + centerBonus
}

export function generateCandidateMoves(board: Board, radius: number = 2): Coord[] {
  const empties = listEmptyCells(board)
  if (empties.length === 0) return []

  // 빈 보드면 중앙(또는 중앙 근처)부터 시작
  const totalCells = board.length * board[0]!.length
  const isEmptyBoard = empties.length === totalCells
  if (isEmptyBoard) {
    const mid = Math.floor((board.length - 1) / 2)
    return [{ r: mid, c: mid }]
  }

  // 이미 놓인 돌 주변 (Chebyshev 거리 기준) radius 이내의 빈 칸만 후보로
  const set = new Set<string>()
  const res: Coord[] = []
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r]!.length; c++) {
      if (board[r]![c] === null) continue
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const at = { r: r + dr, c: c + dc }
          if (!inside(board, at)) continue
          if (cell(board, at) !== null) continue
          const key = `${at.r}:${at.c}`
          if (set.has(key)) continue
          set.add(key)
          res.push(at)
        }
      }
    }
  }

  // 후보가 비면(예: 이상 케이스) 전체 빈칸으로 폴백
  return res.length > 0 ? res : empties
}

export function pickAiMove(board: Board, aiStone: Stone): Coord | null {
  const candidates = generateCandidateMoves(board, 2)
  if (candidates.length === 0) return null

  const opp = other(aiStone)

  // 1) 즉시 이기는 수
  for (const at of candidates) {
    const next = placeStone(board, at, aiStone)
    const r = checkWinner(next, { stone: aiStone, at })
    if (r.kind === 'win' && r.winner === aiStone) return at
  }

  // 2) 상대 즉시 승리 차단
  for (const at of candidates) {
    const next = placeStone(board, at, opp)
    const r = checkWinner(next, { stone: opp, at })
    if (r.kind === 'win' && r.winner === opp) return at
  }

  // 3) 점수 기반 선택 (아주 쉬운 AI)
  let best: Pick | null = null
  for (const at of candidates) {
    const s1 = scoreCell(board, at, aiStone)
    const s2 = scoreCell(board, at, opp) * 0.9 // 방어 가중치(약하게)
    const score = s1 + s2
    if (!best || score > best.score) best = { at, score }
  }
  return best?.at ?? candidates[0]!
}

