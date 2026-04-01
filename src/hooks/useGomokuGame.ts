import { useEffect, useMemo, useState } from 'react'
import type { Coord, GameState, Stone } from '../types/gomoku'
import { canPlace } from '../logic/gomoku/board'
import { pickAiMove } from '../logic/gomoku/ai'
import { applyMove, createInitialState } from '../logic/gomoku/game'

type UseGomokuGame = Readonly<{
  state: GameState
  humanStone: Stone
  aiStone: Stone
  isAiThinking: boolean
  placeHuman: (at: Coord) => void
  reset: () => void
}>

export function useGomokuGame(): UseGomokuGame {
  const humanStone: Stone = 'black'
  const aiStone: Stone = 'white'

  const [state, setState] = useState<GameState>(() => createInitialState())
  const [isAiThinking, setIsAiThinking] = useState(false)

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
    setIsAiThinking(false)
  }

  useEffect(() => {
    if (!isPlaying || !isAiTurn) return

    const thinkId = window.setTimeout(() => {
      setIsAiThinking(true)
    }, 0)

    const moveId = window.setTimeout(() => {
      setState((s) => {
        if (s.result.kind !== 'playing' || s.turn !== aiStone) return s
        const at = pickAiMove(s.board, aiStone)
        if (!at) return s
        if (!canPlace(s.board, at)) return s
        return applyMove(s, at, aiStone)
      })
      setIsAiThinking(false)
    }, 120)

    return () => {
      window.clearTimeout(thinkId)
      window.clearTimeout(moveId)
    }
  }, [aiStone, isAiTurn, isPlaying, state.board])

  return { state, humanStone, aiStone, isAiThinking, placeHuman, reset }
}

