import type { RootState } from '@/store/store'

const storageKey = 'serializedState'
const currentDate = new Date()
const expiryTimeline = 86400

const getLocalStorage = () => {
  const setExpiry = JSON.parse(localStorage.getItem(storageKey) || '{}')
  return setExpiry.expiry
}

export const loadState = () => {
  try {
    const serializedInitialState = JSON.parse(
      localStorage.getItem(storageKey) || '{}',
    )

    if (!serializedInitialState) return undefined

    if (currentDate.getTime() > serializedInitialState.expiry) {
      localStorage.removeItem(storageKey)
    }
    const { user } = serializedInitialState
    return {user}
  } catch (e) {
    return undefined
  }
}

export function saveState(state: RootState) {
  if (typeof window !== 'undefined') {
    const { user } = state
    const preSerializedState = {
      user,
      expiry:
        currentDate.getTime() < getLocalStorage()
          ? getLocalStorage()
          : currentDate.getTime() + expiryTimeline,
    }
    const serializedState = JSON.stringify(preSerializedState)
    localStorage.setItem(storageKey, serializedState)
  }
}

export function removeStateFromStorage() {
  localStorage.removeItem(storageKey)
}