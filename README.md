# omok

Vite + React + TypeScript 오목 프로젝트입니다.

**배포 주소(GitHub Pages):** [https://ego1065.github.io/omok/](https://ego1065.github.io/omok/)

## 실행 방법

```bash
npm install
npm run dev
```

## 테스트

```bash
npm run test:run
```

## 빌드

```bash
npm run build
```

## 기술 스택

- React + TypeScript + Vite
- Tailwind CSS
- Vitest (+ Testing Library)
- GitHub Actions (CI / GitHub Pages 배포)

## GitHub Pages 배포 (`/omok/` 경로)

이 저장소는 GitHub Pages에서 **프로젝트 페이지**로 게시됩니다. 사용자/조직 페이지(`username.github.io`)가 아니라 **`username.github.io/omok/`** 형태이므로, Vite의 `base`를 저장소 이름과 동일한 경로로 맞춥니다.

### Vite 설정

- `vite.config.ts`의 `base`는 **프로덕션 빌드**에서만 `'/omok/'`입니다. 개발 서버(`npm run dev`)는 루트(`/`)로 동작합니다.

### CI / CD (GitHub Actions)

- CI: `.github/workflows/ci.yml`  
  `npm ci → npm run lint → npm run test:run → npm run build`
- CD(배포): `.github/workflows/deploy-pages.yml`  
  `main` push 시 `dist`를 Pages artifact로 업로드 후 `deploy-pages`로 배포

> 이 저장소는 **`gh-pages` 브랜치에 직접 푸시하지 않고**, GitHub Pages의 **공식 Pages artifact 방식**을 사용합니다.

### GitHub 저장소 설정

1. 저장소 이름이 `omok`이고, Pages가 **`https://ego1065.github.io/omok/`** 로 열리도록 구성합니다.
2. GitHub → **Settings → Pages**
   - **Build and deployment**: **GitHub Actions**
3. `main`에 푸시하면 Actions가 자동으로 배포합니다.

---

## AI 동작 방식(요약)

- AI는 **백(white)** 입니다.
- 우선순위:
  1. 즉시 승리 수가 있으면 그 수 선택
  2. 상대 즉시 승리 수가 있으면 차단
  3. 그 외에는 휴리스틱 점수 기반으로 선택 (연속수/열린 끝/중앙 보너스)
- 후보 수:
  - 빈 보드면 중앙(7,7)
  - 그 외에는 이미 놓인 돌 주변 2칸 이내의 빈 칸만 후보로 평가

## 향후 개선 사항

- 금수(33/44) 규칙 옵션
- 후보 수/평가 함수 고도화 및 성능 최적화
- UI 개선(좌표 표시, 확대/축소, 접근성 강화)

## React + TypeScript + Vite (템플릿 안내)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
