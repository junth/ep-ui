import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Message = IMessage & {
  severity: string
}

export interface MessagesState {
  message: Message | null
}

interface IMessage {
  text: string
  error?: string
}

const createMessage = (
  state: MessagesState,
  severity: string,
  text: IMessage,
) => {
  state.message = {
    severity,
    ...text,
  }
}
const initialState: MessagesState = {
  message: null,
}
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    error(state, action: PayloadAction<IMessage>) {
      createMessage(state, 'error', action.payload)
    },
    // Creates an information message
    info(state, action: PayloadAction<IMessage>) {
      createMessage(state, 'info', action.payload)
    },
    warning(state, action: PayloadAction<IMessage>) {
      createMessage(state, 'warning', action.payload)
    },
    success(state, action: PayloadAction<IMessage>) {
      createMessage(state, 'success', action.payload)
    },
    close(state) {
      state.message = null
    },
  },
})

export const { error, info, close, warning, success } = messagesSlice.actions

export default messagesSlice.reducer
