# Biome 설정 가이드

이 프로젝트는 ESLint와 Prettier 대신 [Biome](https://biomejs.dev) 하나로 **포맷, 린트, import 정렬, Tailwind 클래스 정렬**을 관리합니다. 설정은 루트의 `biome.json` 한 파일에 있습니다.

| 이전 도구                              | Biome에서 담당하는 기능                         |
| -------------------------------------- | ----------------------------------------------- |
| Prettier                               | Formatter (`formatter`, `javascript.formatter`) |
| prettier-plugin-tailwindcss            | 린트 규칙 `nursery/useSortedClasses`            |
| ESLint + typescript-eslint             | Linter (`linter.rules`, `recommended` 프리셋)   |
| eslint-plugin-react-hooks              | `useExhaustiveDependencies`, `useHookAtTopLevel` |
| eslint-plugin-perfectionist (import)   | Assist `organizeImports`                        |

---

## 1. 검사 대상

```jsonc
"vcs": { "enabled": true, "clientKind": "git", "useIgnoreFile": true },
"files": {
  "includes": ["**", "!src/routeTree.gen.ts", "!pnpm-lock.yaml", "!.claude"]
}
```

- `.gitignore`에 적힌 파일(`node_modules`, `dist` 등)은 자동으로 제외됩니다.
- 그 밖에 아래 파일도 제외합니다.
  - `src/routeTree.gen.ts`: TanStack Router가 만드는 파일
  - `pnpm-lock.yaml`
  - `.claude`
- 지원 파일: `.ts`, `.tsx`, `.js`, `.json`, `.jsonc`, `.css`. **Markdown은 Biome이 지원하지 않아 포맷하지 않습니다.**

## 2. 포맷 규칙 (기존 Prettier 설정과 동일)

| 항목           | 값          | 예시                              |
| -------------- | ----------- | --------------------------------- |
| 들여쓰기       | 공백 2칸    |                                   |
| 한 줄 최대 길이 | 80자        | 넘으면 자동 줄바꿈                |
| 세미콜론       | 필요할 때만 | `const a = 1`                     |
| 따옴표         | 쌍따옴표    | `import x from "x"`               |
| 끝 쉼표        | 항상        | `{ a: 1, b: 2, }` (여러 줄일 때)  |

CSS는 Tailwind v4 문법(`@theme`, `@apply`, `@variant` 등)을 읽도록 `css.parser.tailwindDirectives: true`를 켰습니다.

## 3. 린트 규칙

`recommended` 프리셋을 기본으로 쓰고, 아래 규칙을 직접 지정했습니다.

| 규칙                                  | 수준  | 내용                                                        |
| ------------------------------------- | ----- | ----------------------------------------------------------- |
| `correctness/noUnusedVariables`       | error | 쓰지 않는 변수. 이름이 `_`로 시작하면 무시합니다             |
| `correctness/noUnusedImports`         | error | 쓰지 않는 import                                            |
| `correctness/useExhaustiveDependencies` | error | `useEffect`·`useMemo`·`useCallback` 의존성 배열 누락/과잉 |
| `correctness/useHookAtTopLevel`       | error | 조건문·반복문 안에서 Hook 호출 금지                         |
| `style/useImportType`                 | error | 타입 import에 `type` 표시 (`inlineType` 방식, 아래 4번 참고) |
| `nursery/useSortedClasses`            | warn  | Tailwind 클래스 순서 정렬 (아래 5번 참고)                   |

`recommended`에 포함된 `style/noNonNullAssertion`(`!` 사용)은 경고로만 표시됩니다.

## 4. import 정렬 규칙

`assist.actions.source.organizeImports`가 import를 아래 그룹 순서로 정렬하고, 그룹 사이에 빈 줄을 넣습니다.

1. Node 내장 모듈(`node:path`)과 외부 패키지(`react`, `@tanstack/...`)
2. 프로젝트 별칭 경로 `@/**`
3. 상대 경로(`./`, `../`)

그룹 안에서는 알파벳순이고, `{ b, a }` 같은 named import/export도 함께 정렬됩니다.

### 같은 패키지 import는 한 줄로 합침

`useImportType`을 `inlineType` 방식으로 설정해서, 타입은 `import type { ... }` 대신 `{ type X }`처럼 이름 앞에 `type`을 붙입니다. 덕분에 같은 패키지에서 가져오는 타입과 값이 한 줄로 합쳐집니다.

```ts
// 정리 전
import { useState } from "react"
import { useEffect } from "react"
import type { ReactNode } from "react"
import type { FC } from "react"

// 정리 후
import { type FC, type ReactNode, useEffect, useState } from "react"
```

### 정렬 예시

```ts
import path from "node:path"
import { type QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"

import { cn } from "@/utils/cn"

import { App } from "./App"
```

> 이전 perfectionist 설정과 다른 점
> - `node:` 내장 모듈이 외부 패키지보다 항상 앞에 옵니다.
> - 타입 import를 따로 묶지 않고, 같은 패키지의 값 import와 한 줄로 합칩니다.

## 5. Tailwind 클래스 정렬

`nursery/useSortedClasses`가 `className` 속성과 `cn()`, `cva()`, `clsx()` 안의 문자열을 정렬합니다.

```tsx
// 정렬 전
<div className="p-2 flex md:p-4 items-center" />
// 정렬 후
<div className="flex items-center p-2 md:p-4" />
```

주의할 점

- **포맷터가 아니라 린트 규칙입니다.** `pnpm format`만으로는 정렬되지 않고, `pnpm check:fix`·커밋 훅·에디터 저장 때 정렬됩니다.
- **순서가 Prettier 플러그인과 다를 수 있습니다.** Prettier 플러그인은 Tailwind 엔진이 만드는 CSS 순서를 따랐지만, Biome은 자체 순서표를 씁니다. 예: `text-2xl font-bold` → `font-bold text-2xl`
- **`@theme`으로 만든 커스텀 클래스는 모릅니다.** 모르는 클래스는 맨 앞으로 갑니다.
- **실험(nursery) 규칙**이라 Biome 버전을 올리면 정렬 결과가 달라질 수 있습니다.

## 6. 명령어

| 명령             | 실행되는 것             | 하는 일                                         |
| ---------------- | ----------------------- | ----------------------------------------------- |
| `pnpm check`     | `biome check .`         | 포맷 + 린트 + import 정렬 **검사만**            |
| `pnpm check:fix` | `biome check --write .` | 위 항목을 **자동 수정** (평소엔 이것만 쓰면 됨) |
| `pnpm lint`      | `biome lint .`          | 린트만 검사                                     |
| `pnpm format`    | `biome format --write .` | 포맷만 적용 (import·클래스 정렬은 안 함)       |
| `pnpm ci:check`  | `biome ci .`            | CI용 검사. 수정하지 않고 문제가 있으면 실패     |

특정 파일만 다루려면 경로를 넘깁니다.

```bash
pnpm biome check --write src/pages/index.tsx
```

## 7. 자동으로 실행되는 곳

| 시점             | 동작                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- |
| VS Code 저장     | 포맷 + import 정렬 + 안전한 자동 수정 (`.vscode/settings.json`)                          |
| `git commit`     | husky → lint-staged가 커밋할 파일에 `biome check --write` 실행. 에러가 남으면 커밋 중단 |
| PR (GitHub Actions) | `pnpm ci:check` 실행. 실패하면 PR 체크 실패                                           |

### VS Code 준비

1. `pnpm install`: 확장이 프로젝트에 설치된 Biome을 사용합니다.
2. 추천 확장 **Biome (`biomejs.biome`)** 설치: 프로젝트를 열면 설치 안내가 뜹니다.
3. (선택) 이 워크스페이스에서 ESLint·Prettier 확장 비활성화: 설정 파일이 없어 경고가 뜰 수 있습니다.

`.vscode/settings.json`은 git으로 공유되므로 따로 설정할 필요가 없습니다. ts·tsx·js·json·css는 언어별 포맷터도 Biome으로 지정해 두어서, 개인 설정에서 Prettier를 기본 포맷터로 지정했더라도 이 프로젝트에서는 Biome이 실행됩니다.

### 저장 방식별 적용 범위

| 저장 방식                                                  | 포맷 | import·클래스 정렬 |
| ---------------------------------------------------------- | ---- | ------------------ |
| Cmd+S 직접 저장                                            | O    | O                  |
| 자동 저장: 다른 파일·창으로 이동할 때 (`onFocusChange`, `onWindowChange`) | O    | O                  |
| 자동 저장: 일정 시간 지나면 (`afterDelay`)                 | X    | X                  |

`afterDelay`는 입력 중에 계속 저장되기 때문에 VS Code가 포맷을 건너뜁니다(VS Code 자체 동작). 에디터에서 빠진 부분은 커밋할 때 lint-staged가 정리하고, PR의 CI가 한 번 더 검사하므로 저장소에 올라가는 코드는 항상 같은 규칙을 따릅니다.

## 8. 규칙을 잠깐 끄고 싶을 때

한 줄만 예외로 둘 때는 이유와 함께 주석을 답니다.

```ts
// biome-ignore lint/style/noNonNullAssertion: index.html에 #root가 항상 있음
const rootElement = document.getElementById("root")!
```

규칙 자체를 바꾸려면 `biome.json`의 `linter.rules`를 수정하고 PR에서 팀과 합의합니다.
