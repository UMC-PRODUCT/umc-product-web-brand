import { z } from "zod"

import { PRODUCT_GENERATIONS } from "../-data/umcProduct"

export interface ProductSearch {
  generation: number
  team: string
}

const searchSchema = z.object({
  generation: z.coerce.number().int().optional().catch(undefined),
  team: z.string().optional().catch(undefined),
})

export function findProductGeneration(id: number | undefined) {
  return (
    PRODUCT_GENERATIONS.find((generation) => generation.id === id) ??
    PRODUCT_GENERATIONS[0]
  )
}

export function resolveProductSearch(
  search: Record<string, unknown>,
): ProductSearch {
  const parsed = searchSchema.parse(search)
  const generation = findProductGeneration(parsed.generation)
  const team =
    generation.teams.find(({ id }) => id === parsed.team) ?? generation.teams[0]
  return { generation: generation.id, team: team.id }
}
