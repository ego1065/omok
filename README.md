# omok

Vite + React + TypeScript 오목 프로젝트입니다.

**배포 주소(GitHub Pages):** [https://ego1065.github.io/omok/](https://ego1065.github.io/omok/)

## GitHub Pages 배포 (`/omok/` 경로)

이 저장소는 GitHub Pages에서 **프로젝트 페이지**로 게시됩니다. 사용자/조직 페이지(`username.github.io`)가 아니라 **`username.github.io/omok/`** 형태이므로, Vite의 `base`를 저장소 이름과 동일한 경로로 맞춥니다.

### Vite 설정

- `vite.config.ts`의 `base`는 **프로덕션 빌드**에서만 `'/omok/'`입니다. 개발 서버(`npm run dev`)는 루트(`/`)로 동작합니다.

### 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | 로컬 개발 서버 |
| `npm run build` | 타입 검사 후 `dist/` 프로덕션 빌드 (`base`가 `/omok/`로 적용됨) |
| `npm run preview` | 빌드 결과 미리보기. 브라우저는 **`http://localhost:4173/omok/`** 로 열어야 자산 경로가 맞습니다. |
| `npm run deploy` | `build` 후 `gh-pages` 브랜치에 `dist` 내용을 푸시 |

### GitHub 저장소 설정

1. 저장소 이름이 `omok`이고, Pages가 **`https://ego1065.github.io/omok/`** 로 열리도록 구성합니다.
2. GitHub → **Settings → Pages**
   - **Build and deployment**: *Deploy from a branch*
   - **Branch**: `gh-pages` / **Folder**: `/ (root)`
3. 로컬에서 배포:

   ```bash
   npm run deploy
   ```

4. 푸시가 반영되면 Actions/Pages 빌드가 끝난 뒤 위 URL에서 확인합니다.

> `deploy`는 [gh-pages](https://github.com/tschaub/gh-pages)로 `gh-pages` 브랜치를 갱신합니다. 처음 한 번은 저장소에 쓰기 권한이 있는 인증(GitHub CLI, SSH, 또는 HTTPS 자격 증명)이 필요합니다.

---

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
