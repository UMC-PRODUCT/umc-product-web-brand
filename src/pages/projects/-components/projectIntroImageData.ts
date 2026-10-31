const IMAGE_WIDTH = 2576
const PIECE_HEIGHT = 3200

// 긴 소개 이미지를 2576x3200 조각으로 나눴다. 마지막 조각만 높이가 다르다
const LAST_PIECE_HEIGHTS: Readonly<Record<string, number>> = {
  "pop-it": 2952,
  muffin: 253,
  teaching: 2883,
  boogle: 1922,
  brifo: 1147,
  bookshelves: 1992,
  "slate-to": 1792,
  "muse-review": 2199,
}

const imageUrls = import.meta.glob<string>("@/assets/projects/intro/*/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
})

export interface ProjectIntroImage {
  src: string
  width: number
  height: number
}

export function getProjectIntroImages(projectId: string): ProjectIntroImage[] {
  const urls = Object.entries(imageUrls)
    .filter(([path]) => path.includes(`/intro/${projectId}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url)

  return urls.map((src, index) => ({
    src,
    width: IMAGE_WIDTH,
    height:
      index === urls.length - 1
        ? (LAST_PIECE_HEIGHTS[projectId] ?? PIECE_HEIGHT)
        : PIECE_HEIGHT,
  }))
}
