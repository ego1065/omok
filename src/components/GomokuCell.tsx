import type { Cell, Coord, Stone } from '../types/gomoku'

type Props = Readonly<{
  at: Coord
  value: Cell
  disabled?: boolean
  lastMove: { stone: Stone; at: Coord } | null
  isWinningCell: boolean
  onClick: (at: Coord) => void
}>

function coordKey(at: Coord): string {
  return `${at.r}:${at.c}`
}

function isSame(a: Coord, b: Coord): boolean {
  return a.r === b.r && a.c === b.c
}

export function GomokuCell({ at, value, disabled, lastMove, isWinningCell, onClick }: Props) {
  const isLast = lastMove ? isSame(lastMove.at, at) : false

  const base =
    'relative grid aspect-square w-8 place-items-center rounded bg-amber-50 ring-1 ring-amber-300'
  const hover = disabled ? '' : ' hover:bg-amber-200/60 active:bg-amber-200'
  const focus = ' focus:outline-none focus:ring-2 focus:ring-violet-500'

  return (
    <button
      key={coordKey(at)}
      type="button"
      className={`${base}${hover}${focus}`}
      role="gridcell"
      aria-label={`${at.r + 1}행 ${at.c + 1}열`}
      disabled={disabled || value !== null}
      onClick={() => onClick(at)}
    >
      <span className="absolute inset-0 grid place-items-center">
        {value === 'black' && <span className="h-6 w-6 rounded-full bg-zinc-900 shadow-sm" />}
        {value === 'white' && (
          <span className="h-6 w-6 rounded-full bg-white shadow-sm ring-1 ring-zinc-300" />
        )}
      </span>
      {(isLast || isWinningCell) && (
        <span
          className={`absolute inset-0 rounded ${
            isWinningCell ? 'ring-2 ring-rose-500' : 'ring-2 ring-sky-500'
          }`}
          aria-hidden="true"
        />
      )}
    </button>
  )
}

