// 체크리스트 호환 타입(요구: 'black' | 'white' | null)
export type Stone = 'black' | 'white'
export type Cell = Stone | null

// 내부/기존 코드 호환(이전 구현: 'B' | 'W')
export type LegacyStone = 'B' | 'W'

export type Coord = Readonly<{ r: number; c: number }>

// 체크리스트 호환 (요구: GameStatus)
export type GameStatus = 'playing' | 'black_won' | 'white_won' | 'draw'

export type GameResult =
  | { kind: 'playing' }
  | { kind: 'win'; winner: Stone; line: Coord[] }
  | { kind: 'draw' }

export type PlayerKind = 'human' | 'ai'

export type LastMove = Readonly<{ stone: Stone; at: Coord }>

export type Board = Cell[][]

export type GameState = Readonly<{
  size: number
  board: Board
  turn: Stone
  result: GameResult
  lastMove: LastMove | null
}>

