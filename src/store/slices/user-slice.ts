import { AccountDataType } from '@/types/AccountDataType'
import { ErrorType, BalanceType } from '@/types/WalletBalanceType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  user: AccountDataType | null
  walletDetails: (BalanceType | ErrorType)[] | null
}

const initialState: UserState = {
  user: null,
  walletDetails: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<AccountDataType>) => {
      state.user = action.payload
    },
    updateWalletDetails: (
      state,
      action: PayloadAction<(BalanceType | ErrorType)[] | null>,
    ) => {
      state.walletDetails = action.payload
    },
  },
})

export const { updateUserDetails, updateWalletDetails } = userSlice.actions

export default userSlice.reducer
