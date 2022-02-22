import { AccountDataType } from '@/types/AccountDataType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  user: AccountDataType | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<AccountDataType>) => {
      state.user = action.payload
    },
  },
})

export const { updateUserDetails } = userSlice.actions

export default userSlice.reducer
