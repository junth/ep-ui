import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import {
  GET_USER_WIKIS_BY_ID,
  GET_WIKI_BY_ID,
  GET_WIKIS,
  GET_WIKIS_BY_CATEGORY,
  GET_PROMOTED_WIKIS,
} from '@/services/wikis/queries'
import { Wiki } from '@/types/Wiki'
import config from '@/config'

type GetWikisResponse = {
  wikis: Wiki[]
}

type GetPromotedWikisResponse = {
  promotedWikis: Wiki[]
}

type GetWikiResponse = {
  wiki: Wiki
}

type GetUserWikiResponse = {
  userById: {
    wikis: Wiki[]
  }
}

type GetWikisByCategoryResponse = {
  wikisByCategory: Wiki[]
}

type WikisByCategoryArg = {
  category: string
  limit?: number
  offset?: number
}

type UserWikiArg = {
  id: string
  limit?: number
  offset?: number
}

export const wikiApi = createApi({
  reducerPath: 'wikiApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  baseQuery: graphqlRequestBaseQuery({ url: config.graphqlUrl }),
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  endpoints: builder => ({
    getWikis: builder.query<Wiki[], void>({
      query: () => ({ document: GET_WIKIS }),
      transformResponse: (response: GetWikisResponse) => response.wikis,
    }),
    getPromotedWikis: builder.query<Wiki[], void>({
      query: () => ({ document: GET_PROMOTED_WIKIS }),
      transformResponse: (response: GetPromotedWikisResponse) =>
        response.promotedWikis,
    }),
    getWiki: builder.query<Wiki, string>({
      query: (id: string) => ({ document: GET_WIKI_BY_ID, variables: { id } }),
      transformResponse: (response: GetWikiResponse) => response.wiki,
    }),
    getUserWikis: builder.query<Wiki[], UserWikiArg>({
      query: ({
        id,
        limit,
        offset,
      }: {
        id: string
        limit: number
        offset: number
      }) => {
        return {
          document: GET_USER_WIKIS_BY_ID,
          variables: { id, limit, offset },
        }
      },
      transformResponse: (response: GetUserWikiResponse) =>
        response.userById.wikis,
    }),
    getWikisByCategory: builder.query<Wiki[], WikisByCategoryArg>({
      query: ({
        category,
        limit,
        offset,
      }: {
        category: string
        limit?: number
        offset?: number
      }) => ({
        document: GET_WIKIS_BY_CATEGORY,
        variables: { category, limit, offset },
      }),
      transformResponse: (response: GetWikisByCategoryResponse) =>
        response.wikisByCategory,
    }),
  }),
})

export const {
  useGetWikisQuery,
  useGetPromotedWikisQuery,
  useGetWikiQuery,
  useGetUserWikisQuery,
  useGetWikisByCategoryQuery,
  util: { getRunningOperationPromises },
} = wikiApi

export const {
  getWikis,
  getPromotedWikis,
  getWiki,
  getUserWikis,
  getWikisByCategory,
} = wikiApi.endpoints
