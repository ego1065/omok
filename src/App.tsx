import { GomokuBoard } from './components/GomokuBoard'
import { GomokuHeader } from './components/GomokuHeader'
import { useGomokuGame } from './hooks/useGomokuGame'

function App() {
  const { state, isAiThinking, placeHuman, reset } = useGomokuGame()
  const winningLine = state.result.kind === 'win' ? state.result.line : null
  const disabled = state.result.kind !== 'playing' || state.turn !== 'black'

  return (
    <div className="min-h-full bg-zinc-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <GomokuHeader turn={state.turn} result={state.result} onReset={reset} />

        <main className="flex flex-col items-center gap-4">
          <GomokuBoard
            board={state.board}
            disabled={disabled}
            lastMove={state.lastMove}
            winningLine={winningLine}
            onCellClick={placeHuman}
          />

          <div className="text-sm text-zinc-600">
            <p>규칙: 15x15, 5목 선승. 사용자=흑, AI=백(쉬운 휴리스틱).</p>
            <p>배포: GitHub Pages 기준 `vite.config.ts`의 `base`를 repo명에 맞게 설정하세요.</p>
            {isAiThinking && <p className="font-medium text-violet-700">AI가 생각 중…</p>}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
