const INTRO_WIDTH = 2576
const DETAIL_WIDTH = 2304
const PIECE_HEIGHT = 3200

// 긴 이미지를 높이 3200 조각으로 나눴다. 마지막 조각만 높이가 다르다
const LAST_PIECE_HEIGHTS: Readonly<Record<string, number>> = {
  "intro/pop-it": 2952,
  "intro/muffin": 253,
  "intro/teaching": 2940,
  "intro/boogle": 1922,
  "intro/brifo": 1147,
  "intro/bookshelves": 1992,
  "intro/slate-to": 1792,
  "intro/muse-review": 2199,
  "detail/muffin/ia": 1200,
  "detail/muffin/design-system": 1904,
  "detail/muffin/ui": 3156,
  "detail/pop-it/ia": 1148,
  "detail/pop-it/design-system": 2536,
  "detail/pop-it/ui": 2072,
  "detail/teaching/ia": 1360,
  "detail/teaching/design-system": 660,
  "detail/boogle/ia": 1296,
  "detail/boogle/design-system": 1848,
  "detail/boogle/ui": 2064,
  "detail/brifo/ia": 1284,
  "detail/brifo/design-system": 2580,
  "detail/brifo/ui": 68,
  "detail/bookshelves/ia": 1296,
  "detail/bookshelves/design-system": 1924,
  "detail/bookshelves/ui": 2064,
  "detail/slate-to/ia": 1041,
  "detail/slate-to/design-system": 2504,
  "detail/slate-to/ui": 1896,
  "detail/muse-review/ia": 1573,
  "detail/muse-review/design-system": 3040,
  "detail/muse-review/ui": 2192,
}

const imageUrls = import.meta.glob<string>(
  ["@/assets/projects/intro/*/*.webp", "@/assets/projects/detail/*/*/*.webp"],
  { eager: true, query: "?url", import: "default" },
)

export type ProjectDetailImageGroup = "ia" | "design-system" | "ui"

export interface ProjectImage {
  src: string
  width: number
  height: number
}

function getImages(group: string, width: number): ProjectImage[] {
  const urls = Object.entries(imageUrls)
    .filter(([path]) => path.includes(`/${group}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)

  return urls.map((src, index) => ({
    src,
    width,
    height:
      index === urls.length - 1
        ? (LAST_PIECE_HEIGHTS[group] ?? PIECE_HEIGHT)
        : PIECE_HEIGHT,
  }))
}

export function getProjectIntroImages(projectId: string) {
  return getImages(`intro/${projectId}`, INTRO_WIDTH)
}

export function getProjectDetailImages(
  projectId: string,
  group: ProjectDetailImageGroup,
) {
  return getImages(`detail/${projectId}/${group}`, DETAIL_WIDTH)
}
