
const storageKey = 'p7buryPtcG'

export const loadState = () => {
  try {
    const serializedInitialState = localStorage.getItem(storageKey)
    if (!serializedInitialState) return undefined
    return JSON.parse(serializedInitialState)
  } catch (e) {
    return undefined
  }
}

export function saveState(state: any) {
  const serializedState = JSON.stringify(state)
  localStorage.setItem(storageKey, serializedState)
}
