import { createSlice } from '@reduxjs/toolkit'
import { Language, Wiki } from '@/types'

const initialState: Wiki = {
  id: '',
  version: 1,
  language: Language.SPANISH,
  content: {
    createdAt: new Date().toUTCString(),
    lastModified: null,
    title: 'Wiki title',
    content: '',
    categories: [{ id: 'general', title: 'general category' }],
    tags: [{ id: 'hello' }, { id: 'world' }],
    images: [],
    metadata: [
      {
        id: 'adult-content',
        value: true,
      },
      {
        id: 'page-type',
        value: 'Place / Location',
      },
    ],
  },
}

const wikiSlice = createSlice({
  name: 'wiki',
  initialState,
  reducers: {
    setCurrentWiki(state, action) {
      // eslint-disable-next-line no-param-reassign
      state = {
        ...state,
        ...action.payload,
        content: { ...state.content, ...action.payload.content },
      }
      return state
    },
  },
})

export const { setCurrentWiki } = wikiSlice.actions
export default wikiSlice.reducer
