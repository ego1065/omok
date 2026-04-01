import type { Cell, Coord, Stone } from '../types/gomoku'
import { range } from '../utils/array'

type Props = Readonly<{
  board: Cell[][]
  disabled?: boolean
  lastMove: { stone: Stone; at: Coord } | null
  winningLine: Coord[] | null
  onCellClick: (at: Coord) => void
}>

function coordKey(at: Coord): string {
  return `${at.r}:${at.c}`
}

function isSame(a: Coord, b: Coord): boolean {
  return a.r === b.r && a.c === b.c
}

export function GomokuBoard({ board, disabled, lastMove, winningLine, onCellClick }: Props) {
  const size = board.length
  const winSet = new Set((winningLine ?? []).map(coordKey))

  return (
    <div
      className="inline-block rounded-xl bg-amber-100 p-3 shadow-sm ring-1 ring-amber-200"
      role="grid"
      aria-label="오목 보드"
    >
      <div
        className="grid gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {range(size).flatMap((r) =>
          range(size).map((c) => {
            const at = { r, c } as const
            const v = board[r]![c]!
            const isLast = lastMove ? isSame(lastMove.at, at) : false
            const isWin = winSet.has(coordKey(at))

            const base =
              'relative grid aspect-square w-8 place-items-center rounded bg-amber-50 ring-1 ring-amber-300'
            const hover = disabled ? '' : ' hover:bg-amber-200/60 active:bg-amber-200'
            const focus = ' focus:outline-none focus:ring-2 focus:ring-violet-500'

            return (
              <button
                key={`${r}:${c}`}
                type="button"
                className={`${base}${hover}${focus}`}
                role="gridcell"
                aria-label={`${r + 1}행 ${c + 1}열`}
                disabled={disabled || v !== null}
                onClick={() => onCellClick(at)}
              >
                <span className="absolute inset-0 grid place-items-center">
                  {v === 'B' && (
                    <span className="h-6 w-6 rounded-full bg-zinc-900 shadow-sm" />
                  )}
                  {v === 'W' && (
                    <span className="h-6 w-6 rounded-full bg-white shadow-sm ring-1 ring-zinc-300" />
                  )}
                </span>
                {(isLast || isWin) && (
                  <span
                    className={`absolute inset-0 rounded ${
                      isWin ? 'ring-2 ring-rose-500' : 'ring-2 ring-sky-500'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}

