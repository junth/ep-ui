import { configureStore } from '@reduxjs/toolkit'
import { wikiApi } from '@/services/wikis'
import {
  appReducer,
  messagesReducer,
  providerReducer,
  userReducer,
  wikiReducer,
} from '@/store/slices'
import { loadState } from '@/utils/browserStorage'

export const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
    user: userReducer,
    wiki: wikiReducer,
    providerNetwork: providerReducer,
    [wikiApi.reducerPath]: wikiApi.reducer,
  },
  middleware: gDM =>
    gDM({ serializableCheck: true }).concat(wikiApi.middleware),
  preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
