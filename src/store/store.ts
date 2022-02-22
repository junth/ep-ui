import { createWrapper } from 'next-redux-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import { wikiApi } from '@/services/wikis'
import {appReducer, messagesReducer, userReducer} from '@/store/slices'

const makeStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
      messages: messagesReducer,
      user: userReducer,
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
