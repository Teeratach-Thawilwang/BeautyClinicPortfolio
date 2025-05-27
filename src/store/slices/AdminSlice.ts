import {createSlice} from '@reduxjs/toolkit'

import {AdminSliceInterface} from '@models/AdminInterface'

const initialState: AdminSliceInterface = {
  isAdmin: false,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: 'AdminSlice',
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return {...state, ...action.payload}
    },
  },
})

export const {update} = slice.actions

export default slice.reducer
