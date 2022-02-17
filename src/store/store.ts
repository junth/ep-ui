import { createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import { wikiApi } from '@/services/wikis'
import appReducer from './slices/app-slice'
import messagesReducer from './slices/messages-slice'

const makeStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
      messages: messagesReducer,
      [wikiApi.reducerPath]: wikiApi.reducer,
    },
    middleware: gDM =>
      gDM({ serializableCheck: true }).concat(wikiApi.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
export default wrapper
