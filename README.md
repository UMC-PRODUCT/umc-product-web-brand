# umc-product-web-brand

UMC 브랜드 웹 프론트엔드 저장소입니다. 이 문서는 이 저장소에서 어떻게 개발하는지를 다룹니다.

| 항목 | 내용 |
| --- | --- |
| 독자 | 이 저장소에 처음 합류한 FE 개발자, PR 리뷰어 |
| 소유자 | brand 웹 FE 팀 |
| 기준일 | 2026-10-17, `dev` 브랜치 |

규칙을 바꾸는 PR에서는 이 문서도 함께 고칩니다.

## 목차

1. [빠른 시작](#빠른-시작)
2. [명령어](#명령어)
3. [기술 스택](#기술-스택)
4. [폴더 구조와 라우팅](#폴더-구조와-라우팅)
5. [개발 흐름](#개발-흐름)
6. [품질 게이트](#품질-게이트)
7. [커밋 메시지](#커밋-메시지)
8. [린트와 포맷](#린트와-포맷)
9. [테스트](#테스트)
10. [빌드와 환경 변수](#빌드와-환경-변수)
11. [CI](#ci)
12. [배포 (예정)](#배포-예정)
13. [문제 해결](#문제-해결)

## 빠른 시작

| 도구 | 버전 | 기준 |
| --- | --- | --- |
| Node.js | 22 (`>=22.12.0`) | `.nvmrc`, `package.json`의 `engines` |
| pnpm | 10.28.0 | `package.json`의 `packageManager` |

처음 한 번은 UMC 디자인 시스템 패키지(GitHub Packages)를 받을 토큰이 필요합니다. 토큰이 없으면 `pnpm install`이 401이나 403으로 실패합니다.

1. GitHub에서 `read:packages` 권한만 체크한 classic 토큰을 만듭니다. UMC-PRODUCT 조직은 수명이 30일을 넘는 classic 토큰을 막으므로 만료는 30일 이하로 정합니다.
2. 사용자 폴더의 `~/.npmrc`에 `//npm.pkg.github.com/:_authToken=<토큰>` 한 줄을 적습니다. 저장소의 `.npmrc`에는 레지스트리 주소만 있고 토큰은 넣지 않습니다.
3. 토큰이 만료되면 다시 발급해 같은 줄을 바꿉니다.

자세한 절차와 오류별 해결은 [디자인 시스템 설치 문서](https://umc-product.github.io/umc-product-design-system/getting-started/installation/)에 있습니다.

```bash
nvm use
corepack enable
pnpm install
pnpm dev
```

| 명령 | 하는 일 |
| --- | --- |
| `nvm use` | `.nvmrc`에 적힌 Node 22로 바꿉니다 |
| `corepack enable` | `packageManager`에 적힌 pnpm 10.28.0을 쓰도록 맞춥니다 |
| `pnpm install` | 의존성을 설치하고, `prepare` 스크립트로 husky Git 훅을 설치합니다 |
| `pnpm dev` | 개발 서버를 `http://localhost:5173`에 띄웁니다 |

- Node 25부터는 Corepack이 Node에 들어 있지 않습니다. Node 25 이상을 쓴다면 `npm install -g corepack`으로 먼저 설치하세요. Corepack을 쓸 수 없는 환경이면 `npm install -g pnpm@10.28.0`으로 같은 버전을 받습니다.
- VS Code를 쓴다면 추천 확장 Biome(`biomejs.biome`)을 설치합니다. 저장할 때마다 포맷과 import 정렬이 적용되고, 설정은 `.vscode/settings.json`으로 공유합니다.

## 명령어

| 명령 | 실행되는 것 | 용도 |
| --- | --- | --- |
| `pnpm dev` | `vite` | 개발 서버(5173). 저장하면 HMR로 바로 갱신 |
| `pnpm build` | `tsc -b && vite build` | 타입 검사 후 프로덕션 번들을 `dist/`에 생성 |
| `pnpm preview` | `vite preview` | `dist/`를 로컬 정적 서버(4173)로 확인 |
| `pnpm check` | `biome check .` | 포맷, 린트, import 정렬 검사 (수정 안 함) |
| `pnpm check:fix` | `biome check --write .` | 위 항목 자동 수정. 평소에는 이 명령만 쓰면 됩니다 |
| `pnpm lint` | `biome lint .` | 린트만 검사 |
| `pnpm format` | `biome format --write .` | 포맷만 적용 (import, 클래스 정렬은 안 함) |
| `pnpm ci:check` | `biome ci .` | CI와 같은 Biome 검사 (수정 안 함) |
| `pnpm test` | `vitest` | 테스트 watch 모드 |
| `pnpm test:run` | `vitest run` | 테스트 1회 실행 |

CI가 하는 검사를 로컬에서 한 번에 돌리려면 아래 명령을 씁니다. 실행 뒤 `git status`에 바뀐 파일이 없어야 CI의 생성 파일 검사도 통과합니다.

```bash
pnpm ci:check && pnpm test:run && pnpm build
```

## 기술 스택

umc-product-web-v2의 기술 스택에서 코어만 가져왔습니다. 두 저장소를 오가는 사람이 설정과 컨벤션을 다시 익히지 않게 하려는 선택입니다. v2의 특정 기능 때문에 들어온 패키지는 brand에서 필요해질 때 추가합니다.

| 분류 | 패키지 | 메이저 | 용도 |
| --- | --- | --- | --- |
| 언어 | typescript | 5 | `strict`, `noUncheckedIndexedAccess` 사용 |
| UI | react, react-dom | 19 | 컴포넌트 렌더링 |
| 빌드 | vite, @vitejs/plugin-react | 7, 4 | 개발 서버와 프로덕션 번들 |
| 라우팅 | @tanstack/react-router, @tanstack/router-plugin | 1 | 파일 기반 라우팅, 라우트별 코드 분할 |
| 서버 상태 | @tanstack/react-query, @tanstack/react-query-devtools | 5 | 서버 데이터 캐시. 기본 `staleTime` 30초, `retry` 1회 (`src/App.tsx`) |
| 클라이언트 상태 | zustand | 5 | 전역 UI 상태 |
| HTTP | axios | 1 | API 요청 |
| 폼 | react-hook-form, zod, @hookform/resolvers | 7, 4, 5 | 폼 상태와 스키마 검증 |
| 스타일 | tailwindcss, @tailwindcss/vite | 4 | 유틸리티 CSS |
| 스타일 유틸 | class-variance-authority, clsx, tailwind-merge | 0.7, 2, 3 | 변형 정의, 클래스 병합. `cn()`은 디자인 시스템 텍스트 스타일과 그림자 유틸을 등록해 둡니다 (`src/utils/cn.ts`) |
| UI 컴포넌트 | @umc-product/react | 0.5 | 디자인 시스템 React 컴포넌트(Base UI 기반). 버튼, 탭, 다이얼로그 등은 이 패키지를 먼저 씁니다. 스타일은 `src/index.css`에서 `styles.css`로 불러옵니다 |
| 헤드리스 UI | radix-ui | 1 | 디자인 시스템에 없는 동작 UI(아코디언 등)를 만들 때 씁니다 |
| 아이콘 | lucide-react, @umc-product/icons | 0.545, 0.5 | SVG 아이콘 컴포넌트. UMC 로고와 픽토그램은 디자인 시스템 패키지에서 씁니다 |
| 디자인 토큰 | @umc-product/design-tokens | 0.5 | 색, 텍스트 스타일, 그림자 토큰과 Tailwind 유틸리티, Pretendard 가변 폰트 (`src/index.css`) |
| SVG | vite-plugin-svgr | 4 | SVG 파일을 React 컴포넌트로 import |
| API 타입 | openapi-typescript | 7 | OpenAPI 스키마에서 TypeScript 타입 생성 |
| 린트·포맷 | @biomejs/biome | 2 | 린트, 포맷, import 정렬, Tailwind 클래스 정렬 |
| 테스트 | vitest, jsdom, @testing-library/react, @testing-library/jest-dom | 3, 26, 16, 6 | 단위 테스트와 컴포넌트 테스트 |
| Git 훅 | husky, lint-staged | 9, 16 | 커밋할 때 자동 검사 |
| 커밋 규약 | @commitlint/cli, @commitlint/config-conventional | 20 | 커밋 메시지 형식 검사 |

- 정확한 버전은 `package.json`이 기준입니다. 모든 의존성을 캐럿(`^`) 없이 정확한 버전으로 고정합니다.
- 의존성을 추가할 때는 `pnpm add -E <패키지>`를, 개발 의존성은 `pnpm add -D -E <패키지>`를 씁니다. `-E`를 빼면 캐럿이 붙습니다.
- zustand, axios, react-hook-form, zod, @hookform/resolvers, openapi-typescript, @umc-product/icons, @umc-product/react는 설치만 해 두었고 아직 쓰는 곳이 없습니다. 처음 쓰는 PR에서 파일 위치와 사용 규칙을 이 문서에 추가합니다.
- 디자인 토큰의 `tailwind.css`는 Tailwind 기본 색 팔레트를 지웁니다. `gray-500` 같은 기본 색 클래스는 생성되지 않으니 디자인 시스템 유틸(`text-brand-default-600`, `bg-teal-grey-75` 등)을 씁니다. Figma 변수 이름은 여러 색에 겹쳐 붙어 있으므로 hex 값으로 토큰을 찾습니다.

## 폴더 구조와 라우팅

| 경로 | 역할 |
| --- | --- |
| `src/main.tsx` | 진입점. `#root`에 `App`을 렌더링 |
| `src/App.tsx` | QueryClient와 Router를 만들고 Provider로 감쌈 |
| `src/index.css` | Tailwind, Pretendard 폰트, 전역 base 스타일 |
| `src/pages/` | 라우트 파일. TanStack Router가 이 폴더로 라우트 트리를 만듦 |
| `src/components/` | 여러 페이지가 함께 쓰는 컴포넌트 |
| `src/hooks/` | 여러 곳에서 쓰는 커스텀 훅 |
| `src/utils/` | 유틸 함수 (`cn()` 등) |
| `src/assets/` | 이미지, SVG 같은 정적 자원 |
| `src/routeTree.gen.ts` | 라우트 트리 자동 생성 파일. 직접 고치지 않음 |
| `src/setupTests.ts` | Vitest 설정 (jest-dom matcher 등록, storage mock) |

### 라우트 작성법

TanStack Router 파일 기반 라우팅을 씁니다. `vite.config.ts`가 라우트 폴더를 `src/pages`로 지정합니다.

| 파일 (`src/pages/` 기준) | URL | 의미 |
| --- | --- | --- |
| `__root.tsx` | 모든 페이지 | 루트 레이아웃. `HeadContent`와 `Outlet`을 렌더링 |
| `index.tsx` | `/` | 인덱스 페이지 |
| `about.tsx` | `/about` | 일반 페이지 (예시) |
| `posts.$postId.tsx` | `/posts/:postId` | `$`로 시작하는 부분은 동적 파라미터 (예시) |
| `_layout.tsx` | URL에 붙지 않음 | `_`로 시작하면 경로 없는 레이아웃 (예시) |
| `-components/` | 라우트 아님 | `-`로 시작하는 파일과 폴더는 라우트에서 제외. 페이지 전용 컴포넌트를 옆에 둘 때 사용 (예시) |

- `createFileRoute`에 넘기는 경로 문자열은 파일 위치와 같아야 합니다.
- `pnpm dev`나 `pnpm build`를 실행하면 플러그인이 `src/routeTree.gen.ts`를 다시 만듭니다. 라우트 파일을 추가, 이동, 삭제했다면 바뀐 `routeTree.gen.ts`를 같은 커밋에 넣으세요. CI는 빌드 뒤 이 파일이 바뀌는지 검사합니다.
- Biome은 `routeTree.gen.ts`를 검사하지 않습니다 (`biome.json`의 `files.includes`에서 제외).

### import 경로

- `@/`는 `src/`를 가리킵니다. 예: `import { cn } from "@/utils/cn"`
- 이 alias는 `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`, `vitest.config.ts` 네 곳에서 따로 정의합니다. alias를 추가하거나 바꿀 때는 네 곳을 함께 고칩니다.

### SVG

`vite-plugin-svgr`는 `?react`를 붙인 import만 React 컴포넌트로 바꿉니다. `?react`가 없으면 파일 URL 문자열을 받습니다.

```tsx
import Logo from "@/assets/logo.svg?react"
```

## 개발 흐름

모든 작업은 이슈를 먼저 만드는 데서 시작합니다.

1. **이슈 생성**: 템플릿 세 가지 중 하나를 고릅니다.

   | 템플릿 | 제목 접두사 | 쓰는 경우 |
   | --- | --- | --- |
   | Feature Request | `[FEAT]` | 새 기능 제안 |
   | Bug Report | `[BUG]` | 버그 신고 |
   | Task | `[TASK]` | 설정, 문서, 개선 같은 일반 작업 |

2. **브랜치 생성**: 최신 `dev`에서 `<type>/#<이슈번호>-<설명>` 형식으로 만듭니다. type은 [커밋 type](#허용-type) 목록에서 고릅니다.

   ```bash
   git switch dev
   git pull
   git switch -c "feat/#12-hero-section"
   ```

3. **개발과 커밋**: [품질 게이트](#품질-게이트)와 [커밋 메시지](#커밋-메시지) 규칙을 따릅니다.
4. **PR 생성**: base는 `dev`입니다. PR 템플릿을 채우고 본문에 `Closes #<이슈번호>`를 적습니다. `dev`가 기본 브랜치라서 PR이 머지되면 이슈도 자동으로 닫힙니다. PR 제목 역시 커밋 메시지 형식으로 씁니다.
5. **CI와 리뷰**: [CI](#ci)의 `Verify`와 `Commitlint`가 통과해야 합니다.
6. **머지**: merge commit으로 머지합니다. squash 머지는 PR 제목으로 새 커밋 메시지를 만드는데, 이 메시지는 어떤 검사도 거치지 않습니다.
7. **릴리스**: `dev`에 모인 변경은 릴리스 PR로 `main`에 올립니다. 절차는 [배포 (예정)](#배포-예정)에 있습니다.

아직 정하지 않은 것: 리뷰 승인 인원, 머지 후 브랜치 삭제 여부, 릴리스 주기와 담당자.

## 품질 게이트

코드가 `dev`에 들어가기까지 거치는 검사를 한 표에 모았습니다. 자동 검사는 사람이 잊어도 실행되고, 수동 검사는 개발자가 직접 실행합니다.

| 시점 | 실행 주체 | 검사 내용 | 방식 | 로컬에서 같은 검사 |
| --- | --- | --- | --- | --- |
| 파일 저장 | VS Code Biome 확장 | 포맷, import 정렬, 안전한 자동 수정 | 자동 (확장 설치 시) | `pnpm check:fix` |
| 커밋 전 | 개발자 | Biome 자동 수정, 테스트 | 수동 | `pnpm check:fix && pnpm test:run` |
| PR 생성 전 | 개발자 | 타입 검사와 빌드 | 수동 | `pnpm build` |
| `git commit` | husky `pre-commit` → lint-staged | 스테이징한 파일의 Biome 검사와 자동 수정 | 자동 | `pnpm check:fix` |
| `git commit` | husky `commit-msg` → commitlint | 커밋 메시지 형식 | 자동 | `echo "<메시지>" \| pnpm commitlint` |
| PR, `dev`·`main` push | GitHub Actions `Verify` | Biome, 테스트, 타입 검사와 빌드, 생성 파일 | 자동 | `pnpm ci:check && pnpm test:run && pnpm build` |
| PR | GitHub Actions `Commitlint` | PR이 들여오는 모든 커밋의 메시지 | 자동 | `pnpm commitlint --from origin/dev --to HEAD` |
| 머지 전 | 리뷰어 | 코드 리뷰 | 수동 | - |

> [!IMPORTANT]
> 타입 오류는 `pnpm build`만 잡아냅니다. Biome과 Vitest는 TypeScript 타입을 검사하지 않고, `build`의 첫 단계인 `tsc -b`가 타입을 봅니다. PR을 올리기 전에 `pnpm build`를 한 번 실행하세요.

### Git 훅이 하는 일

`pnpm install`을 실행하면 `prepare` 스크립트가 husky 훅을 설치합니다.

| 훅 | 실행 명령 | 동작 |
| --- | --- | --- |
| `pre-commit` | `pnpm lint-staged` | 스테이징한 `*.{ts,tsx,js,json,jsonc,css}` 파일에 `biome check --write` 실행 |
| `commit-msg` | `pnpm commitlint --edit $1` | 커밋 메시지를 검사하고, 규칙에 어긋나면 커밋을 만들지 않음 |

- lint-staged는 Biome이 고친 내용을 다시 스테이징해 같은 커밋에 넣습니다. 따로 `git add`할 필요가 없습니다.
- Biome이 자동으로 고칠 수 없는 오류가 남으면 훅이 커밋을 중단합니다. 오류 메시지를 보고 직접 고친 뒤 다시 커밋하세요.
- 일부만 스테이징한 파일은 스테이징하지 않은 부분을 잠시 숨겼다가 검사가 끝나면 되돌려 놓습니다.
- Markdown(`*.md`)은 Biome이 지원하지 않아 검사 대상에서 빠집니다.
- `--no-verify`로 훅을 건너뛰어도 CI가 같은 검사를 다시 실행합니다. 훅은 끄지 않는 것을 원칙으로 합니다.

## 커밋 메시지

[Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/)를 따르며, 검사는 `@commitlint/config-conventional`이 맡습니다. umc-product-web-v2, operations와 달리 **gitmoji를 쓰지 않습니다.**

```text
<type>(<scope>): <subject>

<body>

<footer>
```

`(<scope>)`, body, footer는 선택입니다. type 뒤에 `!`를 붙이면(`feat!:`) 하위 호환을 깨는 변경을 뜻합니다.

### 허용 type

| type | 용도 |
| --- | --- |
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 동작은 그대로 두고 구조 개선 |
| `style` | 포맷 변경 (로직 변경 없음) |
| `test` | 테스트 추가, 수정 |
| `docs` | 문서만 변경 |
| `chore` | 설정, 의존성 같은 기타 작업 |
| `build` | 빌드 시스템, 번들 설정 |
| `ci` | CI 설정 |
| `perf` | 성능 개선 |
| `revert` | 이전 커밋 되돌리기 |

이 목록에 없는 type(`wip`, `init`, `release` 등)은 commitlint가 거부합니다.

### 자주 걸리는 규칙

| 규칙 | 실패 | 통과 |
| --- | --- | --- |
| type은 위 목록의 소문자 | `Feat: 로그인 페이지 추가` | `feat: 로그인 페이지 추가` |
| type 뒤에 `:`과 공백 한 칸 | `feat:로그인 페이지 추가` | `feat: 로그인 페이지 추가` |
| subject를 영문 대문자로 시작하지 않음 | `docs: README 개발 가이드 보강` | `docs: 개발 가이드 README 보강` |
| subject 끝에 마침표를 찍지 않음 | `feat: 로그인 페이지 추가.` | `feat: 로그인 페이지 추가` |
| gitmoji를 붙이지 않음 | `:sparkles: feat: 로그인 페이지 추가` | `feat: 로그인 페이지 추가` |

- subject가 영문 대문자로 시작하면 `subject-case` 규칙에 걸립니다. 첫 글자만 대문자(`Biome 설정 추가`)여도, 전부 대문자(`README 수정`)여도 실패합니다. 한글로 시작하는 subject에는 이 규칙이 적용되지 않습니다. 영문 고유명사로 꼭 시작해야 한다면 ``docs: `README` 개발 가이드 보강``처럼 백틱으로 감쌉니다.
- 첫 줄(header)과 본문의 각 줄은 100자를 넘지 않습니다. 본문은 첫 줄 다음에 빈 줄을 하나 두고 씁니다(빠뜨리면 경고).

### 메시지 예시

통과:

```text
feat: 로그인 페이지 추가
feat(auth): 로그인 페이지 추가
feat!: 라우팅 구조 변경
fix: ci.yml서 PR 브랜치 develop에서 dev로 수정
docs: `README` 개발 가이드 보강
chore: v0.1.0 버전 bump 및 CHANGELOG 추가
```

실패 (커밋이 만들어지지 않음):

```text
docs: README 개발 가이드 보강
chore: Biome 설정 추가
init: 프로젝트 생성
Update README.md
Apply suggestions from code review
```

`Update README.md`, `Apply suggestions from code review`는 GitHub 웹 화면에서 커밋할 때 미리 채워지는 메시지입니다. 웹에서 커밋할 때도 규칙에 맞게 고쳐서 커밋하세요.

### 커밋 전에 메시지만 검사하기

```bash
echo "feat: 로그인 페이지 추가" | pnpm commitlint
```

통과하면 아무것도 출력하지 않고, 실패하면 걸린 규칙을 보여 줍니다.

### 이미 만든 커밋 메시지 고치기

| 상황 | 방법 |
| --- | --- |
| 마지막 커밋, push 전 | `git commit --amend` |
| 마지막 커밋, push 후 | `git commit --amend` 다음 `git push --force-with-lease` |
| 이전 커밋 여러 개 | `git rebase -i origin/dev`에서 고칠 커밋을 `reword`로 바꾸고 `git push --force-with-lease` |

`--force-with-lease`는 원격에 내가 받지 않은 커밋이 있으면 push를 거부합니다. `dev`, `main`에는 force push하지 않습니다.

## 린트와 포맷

린트, 포맷, import 정렬, Tailwind 클래스 정렬을 [Biome](https://biomejs.dev) 하나로 관리합니다. 설정은 `biome.json`에 있고, 규칙과 사용법은 [docs/biome.md](docs/biome.md)에 정리했습니다.

- 포맷: 공백 2칸 들여쓰기, 한 줄 80자, 세미콜론은 필요할 때만, 쌍따옴표, 끝 쉼표
- 린트: `recommended` 프리셋에 더해 미사용 변수와 import, Hook 의존성 배열, Hook 호출 위치를 error로 검사
- import 정렬: 외부 패키지 → `@/` → 상대 경로 순서로 묶고, 묶음 사이에 빈 줄
- 규칙을 바꾸려면 `biome.json`을 고치는 PR에서 팀과 합의합니다.

## 테스트

| 항목 | 내용 |
| --- | --- |
| 도구 | Vitest, Testing Library (`@testing-library/react`, `@testing-library/jest-dom`) |
| 환경 | jsdom |
| 대상 파일 | `src/**/*.{test,spec}.{ts,tsx}` |
| 설정 파일 | `src/setupTests.ts`: jest-dom matcher를 등록하고 `localStorage`, `sessionStorage`를 메모리 구현으로 바꿈 |
| 예시 | `src/utils/cn.test.ts` |

- 테스트 파일은 예시처럼 대상 파일 옆에 둡니다.
- `describe`, `it`, `expect`는 `vitest`에서 import합니다. `vitest.config.ts`가 전역 API(`globals: true`)를 켜 두었지만 tsconfig에는 전역 타입이 없습니다. import 없이 쓰면 테스트는 통과해도 `pnpm build`의 타입 검사가 실패합니다.
- CI에서는 Vitest가 실패한 테스트를 PR의 해당 줄에 주석으로 남깁니다.

```ts
import { describe, expect, it } from "vitest"
```

## 빌드와 환경 변수

`pnpm build`는 두 단계를 차례로 실행합니다.

1. `tsc -b`: TypeScript 프로젝트 참조로 타입을 검사합니다. `tsconfig.app.json`이 `src/`를, `tsconfig.node.json`이 `vite.config.ts`, `vitest.config.ts` 같은 설정 파일을 맡습니다. 파일은 만들지 않고(`noEmit`) 타입만 봅니다.
2. `vite build`: 프로덕션 번들을 `dist/`에 만들고, 라우트마다 코드를 나눕니다(`autoCodeSplitting`).

빌드 결과는 `pnpm preview`(`http://localhost:4173`)로 확인합니다. `dist/`는 Git에 올리지 않습니다.

### 환경 변수

지금은 필요한 환경 변수가 없습니다. 추가할 때는 아래 규칙을 따릅니다.

- 클라이언트 코드에서 읽을 변수는 `VITE_`로 시작합니다. Vite는 `VITE_`로 시작하는 변수만 `import.meta.env`에 노출합니다.
- `VITE_` 변수는 빌드한 JavaScript에 그대로 들어가 누구나 볼 수 있습니다. API 비밀 키나 토큰 같은 비밀값은 넣지 마세요.
- Git이 무시하는 파일은 `.env`, `.env.local`, `.env.*.local`뿐입니다. `.env.production` 같은 이름은 실수로 커밋할 수 있으니 주의합니다.
- 변수를 추가하는 PR에서 키 목록을 담은 `.env.example`을 함께 만듭니다(v2와 같은 방식).

## CI

`.github/workflows/ci.yml`에 정의한 GitHub Actions 워크플로입니다.

| 잡 (체크 이름) | 실행 시점 | 단계 |
| --- | --- | --- |
| `Verify` | `dev`·`main` 대상 PR, `dev`·`main` push | 의존성 설치 → Biome 검사 → 테스트 → 타입 검사와 빌드 → 생성 파일 검사 |
| `Commitlint` | `dev`·`main` 대상 PR | PR이 들여오는 모든 커밋의 메시지 검사 |

| 단계 | 실행 명령 | 로컬 재현 |
| --- | --- | --- |
| Biome check | `pnpm ci:check` | `pnpm ci:check` (고칠 때는 `pnpm check:fix`) |
| Test | `pnpm test:run` | `pnpm test:run` |
| Type check & build | `pnpm build` | `pnpm build` |
| Check generated files | `git diff --exit-code` | `pnpm build` 후 `git status` |
| Lint commit messages | `pnpm commitlint --from origin/<base> --to <PR head>` | `pnpm commitlint --from origin/dev --to HEAD` |

동작 방식

- 의존성 설치가 성공하면 앞 단계가 실패해도 나머지 검사를 끝까지 실행합니다. 한 번 실행으로 실패를 모두 확인할 수 있습니다.
- 같은 PR에 새 커밋을 push하면 진행 중인 이전 실행을 취소합니다. `dev`, `main` push 실행은 취소하지 않고 머지마다 검증합니다.
- Commitlint는 PR을 연 시점이 아니라 현재 base 브랜치(`origin/dev` 등)를 기준으로 범위를 잡습니다. PR 브랜치에 `dev`를 합쳐도 다른 사람의 커밋은 검사하지 않습니다.
- Node 버전은 `.nvmrc`에서, pnpm 버전은 `package.json`의 `packageManager`에서 읽습니다. 버전을 올릴 때 워크플로는 고치지 않아도 됩니다.
- 워크플로는 저장소 읽기(`contents: read`)와 패키지 읽기(`packages: read`) 권한만 씁니다. 디자인 시스템 패키지는 `GITHUB_TOKEN`으로 설치하므로, 각 패키지의 Manage Actions access에 이 저장소가 읽기 권한으로 있어야 합니다.

실패했을 때

- PR의 Checks 탭에서 실패한 잡과 단계를 엽니다. Biome과 Vitest는 문제가 있는 파일의 해당 줄에 주석(annotation)을 남깁니다. 노란색 경고 주석은 실패가 아닙니다.
- 위 표의 로컬 재현 명령으로 같은 실패를 확인한 뒤 고칩니다. `Check generated files`가 실패했다면 `pnpm build`로 다시 만든 파일(주로 `src/routeTree.gen.ts`)을 커밋하세요.
- `Commitlint`가 실패했다면 [이미 만든 커밋 메시지 고치기](#이미-만든-커밋-메시지-고치기)를 따릅니다.

필수 체크 (예정)

- `dev`에는 `Verify`와 `Commitlint`를, `main`에는 `Verify`를 머지 필수 체크로 걸 예정입니다. 적용하면 이 문단을 갱신합니다.
- 잡 이름(`Verify`, `Commitlint`)이 곧 체크 이름입니다. 잡 이름을 바꾸면 필수 체크 설정도 같이 바꿉니다.

## 배포 (예정)

> [!NOTE]
> 아직 배포 환경을 연결하지 않았습니다. 아래는 umc-product-web-v2와 같은 방식으로 진행할 예정인 절차입니다. 배포를 연결하면 실제 설정에 맞춰 이 절을 고칩니다.

### 브랜치와 환경

| 브랜치 | 역할 | 배포 |
| --- | --- | --- |
| `dev` | 기본 브랜치. 기능 PR이 모이는 통합 브랜치 | 개발 환경 연결 여부는 배포를 연결할 때 결정 |
| `main` | 릴리스 브랜치 | 머지하면 운영 환경에 배포 |

### 배포 방식: AWS Amplify Git 연동

- Amplify가 연결한 브랜치의 push를 받아 저장소의 `amplify.yml`로 빌드하고 `dist/`를 배포합니다. GitHub Actions는 배포하지 않고 검증만 맡습니다.
- Amplify는 Actions 결과를 기다리지 않습니다. 검증을 통과한 커밋만 `main`에 들어가도록 필수 체크로 막습니다.
- `amplify.yml`은 배포를 시작하는 이슈에서 v2 파일을 기준으로 추가합니다. v2는 `nvm install`과 `corepack enable`로 Node와 pnpm을 맞추고, `.pnpm-store`를 캐시하고, `pnpm run build` 결과인 `dist`를 배포합니다.

### 주의할 점 (v2 운영 경험)

- SPA라서 모든 경로를 `/index.html`로 돌려보내는 rewrite가 필요합니다. v2는 `amplify.yml`에 규칙을 넣었는데도 하위 경로에서 404가 났습니다. Amplify 콘솔의 Rewrites and redirects 설정까지 확인하세요.
- Amplify는 GitHub에 배포 결과를 남기지 않습니다. 배포 성공 여부는 Amplify 콘솔에서 봅니다.
- 환경 변수는 Amplify 콘솔에서 넣습니다. `VITE_` 변수가 번들에 그대로 들어간다는 점은 같습니다.
- PR 프리뷰를 켜면 PR 코드가 빌드 환경 변수를 읽을 수 있습니다. 공개 저장소이므로 프리뷰 빌드에는 비밀값을 두지 않습니다.

### 배포 연결 전에 정할 것

- 검색 노출용 프리렌더 필요 여부: v2는 공개 페이지를 프리렌더합니다. 지금 `index.html`에는 메타 태그가 없고, 페이지 제목도 브라우저에서 설정합니다.
- `dev`를 개발 환경에 연결할지 여부
- 디자인 시스템 패키지 설치 토큰: Amplify는 `GITHUB_TOKEN`을 쓸 수 없어 classic 토큰을 환경 변수로 넣어야 합니다. 조직 정책상 이 토큰은 30일마다 교체해야 하므로 담당자와 교체 방법을 정합니다.

### 릴리스 절차

v2의 릴리스 흐름을 이 저장소의 브랜치 이름과 커밋 규칙에 맞췄습니다.

| 순서 | 할 일 | 주체 |
| --- | --- | --- |
| 1 | 배포 이슈 생성: `[TASK] dev → main 배포` | 사람 |
| 2 | 버전 번호 결정 ([SemVer](https://semver.org/lang/ko/)) | 사람 |
| 3 | `dev`에서 `chore/bump-vX.Y.Z` 브랜치를 만들고 `package.json`의 `version`과 `CHANGELOG.md` 갱신 | 사람 |
| 4 | `chore: vX.Y.Z 버전 bump 및 CHANGELOG 추가`로 커밋하고 `dev`에 PR, 머지 | 사람 (CI가 자동 검사) |
| 5 | `dev → main` 릴리스 PR 생성, 본문에 릴리스 노트 작성 | 사람 (CI가 자동 검사) |
| 6 | 릴리스 PR을 merge commit으로 머지 | 사람 |
| 7 | 운영 빌드와 배포 | 자동 (Amplify) |
| 8 | `main`의 머지 커밋에 `vX.Y.Z` 태그를 달고 GitHub Release 발행 | 사람 |
| 9 | 배포 이슈 닫기 | 사람 |

- 릴리스 PR은 squash하지 않습니다. squash하면 `dev`와 `main`의 이력이 갈라져 다음 릴리스에서 충돌이 납니다.
- `main` 대상 PR에 적은 `Closes #번호`는 이슈를 닫지 않습니다. 기본 브랜치가 `dev`이기 때문이며, 배포 이슈는 직접 닫습니다.
- `main`에만 들어간 긴급 수정(hotfix)은 `main → dev` PR을 merge commit으로 머지해 `dev`에도 반영합니다.
- 릴리스 노트는 여섯 섹션으로 씁니다: 새로 추가된 것들, 개선된 것들, 변경된 동작, 수정된 문제, Deprecated, 문서 업데이트.
- `CHANGELOG.md`는 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/) 형식을 따르고, 버전 머리는 `## [X.Y.Z] - YYYY-MM-DD`로 씁니다.

## 문제 해결

### 커밋이 거부됩니다

| 메시지 | 원인과 해결 |
| --- | --- |
| `subject must not be sentence-case, start-case, pascal-case, upper-case` | subject가 영문 대문자로 시작합니다. 한글로 시작하거나 영문 단어를 백틱으로 감쌉니다 |
| `type may not be empty`, `subject may not be empty` | type이 없거나 `:` 뒤에 공백이 없습니다. GitHub 웹에서 만든 `Update ...`, `Apply suggestions from code review` 커밋도 여기에 해당합니다 |
| `type must be one of [...]` | 허용하지 않는 type입니다 (`wip`, `init` 등) |
| `subject may not end with full stop` | subject 끝의 마침표를 지웁니다 |

이미 만든 커밋은 [이미 만든 커밋 메시지 고치기](#이미-만든-커밋-메시지-고치기)를 따릅니다.

### 훅이 실행되지 않습니다

`pnpm install`로 husky를 다시 설치합니다. `git config core.hooksPath`가 `.husky/_`를 출력하면 정상입니다.

### CI의 Biome 검사만 실패합니다

훅을 건너뛰고 커밋했거나 에디터 자동 수정이 적용되지 않은 경우입니다. `pnpm ci:check`로 CI와 같은 검사를 재현하고 `pnpm check:fix`로 고칩니다.

### `Check generated files` 단계가 실패합니다

라우트 파일을 추가, 이동, 삭제하고 `src/routeTree.gen.ts`를 커밋하지 않은 경우입니다. `pnpm build`를 실행해 파일을 다시 만들고 커밋하세요.

### `src/routeTree.gen.ts`에서 머지 충돌이 납니다

충돌 표시를 지우고 어느 한쪽 내용을 남깁니다. 그다음 `pnpm exec vite build`를 실행하면 플러그인이 현재 라우트 파일 기준으로 파일을 다시 만듭니다. `pnpm build`는 타입 검사가 먼저 실패할 수 있어서 `vite build`를 바로 실행합니다.

### 커밋할 때 `pathspec` 오류가 납니다

메시지를 따옴표로 감싸지 않으면 Git이 띄어쓰기 뒤의 단어를 파일 경로로 읽습니다. PowerShell을 포함해 어느 셸에서든 메시지 전체를 큰따옴표로 감쌉니다.

```bash
git commit -m "feat: 로그인 페이지 추가"
```
