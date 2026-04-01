export type Stone = 'B' | 'W'
export type Cell = Stone | null

export type Coord = Readonly<{ r: number; c: number }>

export type GameResult =
  | { kind: 'playing' }
  | { kind: 'win'; winner: Stone; line: Coord[] }
  | { kind: 'draw' }

export type PlayerKind = 'human' | 'ai'

export type GameState = Readonly<{
  size: number
  board: Cell[][]
  turn: Stone
  result: GameResult
  lastMove: { stone: Stone; at: Coord } | null
}>

