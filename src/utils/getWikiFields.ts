import { Category, MData, Wiki } from '@/types'

export const getWikiMetadataById = (wiki: Wiki, id: string) =>
  wiki.content.metadata.find((m: MData) => m.id === id)

export const getCategoryById = (wiki: Wiki, id: string) =>
  wiki.content.categories.find((c: Category) => c.id === id)
