export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i)
}

export function clone2D<T>(grid: T[][]): T[][] {
  return grid.map((row) => row.slice())
}

