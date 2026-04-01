import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages(프로젝트 페이지): https://ego1065.github.io/omok/
// 프로덕션 빌드만 `/omok/` base — 로컬 `vite dev`는 `/` 유지
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/omok/' : '/'

  return {
    plugins: [react()],
    base,
  }
})
