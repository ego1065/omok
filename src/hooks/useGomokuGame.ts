import { useEffect, useMemo, useState } from 'react'
import type { Coord, GameState, Stone } from '../types/gomoku'
import { canPlace } from '../logic/gomoku/board'
import { pickAiMove } from '../logic/gomoku/ai'
import { applyMove, createInitialState } from '../logic/gomoku/game'

type UseGomokuGame = Readonly<{
  state: GameState
  humanStone: Stone
  aiStone: Stone
  placeHuman: (at: Coord) => void
  reset: () => void
}>

export function useGomokuGame(): UseGomokuGame {
  const humanStone: Stone = 'B'
  const aiStone: Stone = 'W'

  const [state, setState] = useState<GameState>(() => createInitialState())

  const isHumanTurn = state.turn === humanStone
  const isAiTurn = state.turn === aiStone
  const isPlaying = state.result.kind === 'playing'

  const canHumanAct = useMemo(() => isPlaying && isHumanTurn, [isPlaying, isHumanTurn])

  function placeHuman(at: Coord) {
    if (!canHumanAct) return
    if (!canPlace(state.board, at)) return
    setState((s) => applyMove(s, at, humanStone))
  }

  function reset() {
    setState(createInitialState())
  }

  useEffect(() => {
    if (!isPlaying || !isAiTurn) return

    const id = window.setTimeout(() => {
      setState((s) => {
        if (s.result.kind !== 'playing' || s.turn !== aiStone) return s
        const at = pickAiMove(s.board, aiStone)
        if (!at) return s
        if (!canPlace(s.board, at)) return s
        return applyMove(s, at, aiStone)
      })
    }, 120)

    return () => window.clearTimeout(id)
  }, [aiStone, isAiTurn, isPlaying, state.board])

  return { state, humanStone, aiStone, placeHuman, reset }
}

