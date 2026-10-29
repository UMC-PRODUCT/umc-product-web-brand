const photoModules = import.meta.glob<string>("/src/assets/members/**/*.webp", {
  eager: true,
  import: "default",
})

const fileStem = (path: string) =>
  path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf("."))

export const MEMBER_PHOTOS: ReadonlyMap<string, string> = new Map(
  Object.entries(photoModules).map(([path, url]) => [fileStem(path), url]),
)
