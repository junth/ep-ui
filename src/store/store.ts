import { createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/app-slice'
import messagesReducer from './slices/messages-slice'
import wikiReducer from './slices/wiki.slice'
import { wikiApi } from '@/services/wikis'

const makeStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
      messages: messagesReducer,
      [wikiApi.reducerPath]: wikiApi.reducer,
      wiki: wikiReducer,
    },
    middleware: (gDM: any) =>
      gDM({ serializableCheck: true }).concat(wikiApi.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
export default wrapper
