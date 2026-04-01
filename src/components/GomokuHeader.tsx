import type { GameResult, Stone } from '../types/gomoku'

type Props = Readonly<{
  turn: Stone
  result: GameResult
  onReset: () => void
}>

function stoneLabel(s: Stone): string {
  return s === 'B' ? '흑(사용자)' : '백(AI)'
}

export function GomokuHeader({ turn, result, onReset }: Props) {
  const status =
    result.kind === 'playing'
      ? `진행 중 · 현재 턴: ${stoneLabel(turn)}`
      : result.kind === 'draw'
        ? '무승부'
        : `승리: ${stoneLabel(result.winner)}`

  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">오목 MVP</h1>
        <p className="text-sm text-zinc-600">{status}</p>
      </div>
      <button
        type="button"
        className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 active:bg-zinc-950"
        onClick={onReset}
      >
        새 게임
      </button>
    </header>
  )
}

