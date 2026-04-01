import type { Cell, Coord, Stone } from '../types/gomoku'
import { range } from '../utils/array'
import { GomokuCell } from './GomokuCell'

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
            const isWin = winSet.has(coordKey(at))

            return (
              <GomokuCell
                key={`${r}:${c}`}
                at={at}
                value={v}
                disabled={disabled}
                lastMove={lastMove}
                isWinningCell={isWin}
                onClick={onCellClick}
              />
            )
          }),
        )}
      </div>
    </div>
  )
}

