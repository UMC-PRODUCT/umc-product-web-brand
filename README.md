# umc-product-web-brand

## 코드 스타일 (Biome)

린트·포맷·import 정렬·Tailwind 클래스 정렬을 [Biome](https://biomejs.dev) 하나로 관리합니다. 설정은 `biome.json`에 있습니다.

| 명령                | 설명                                       |
| ------------------- | ------------------------------------------ |
| `pnpm check`        | 린트 + 포맷 + import 정렬 검사             |
| `pnpm check:fix`    | 위 항목 자동 수정                          |
| `pnpm lint`         | 린트만 검사                                |
| `pnpm format`       | 포맷만 적용                                |
| `pnpm ci:check`     | CI용 검사 (수정 없음)                      |

- 커밋 시 husky + lint-staged가 변경된 파일에 `biome check --write`를 실행합니다.
- VS Code는 추천 확장(`biomejs.biome`)을 설치하면 저장 시 자동 포맷·정렬됩니다.
- 자세한 규칙과 사용법: [docs/biome.md](docs/biome.md)
