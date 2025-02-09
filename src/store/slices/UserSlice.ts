import {createSlice} from '@reduxjs/toolkit'

import {UserSliceInterface} from '@models/UserInterface'

const initialState: UserSliceInterface = {
  data: null,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: 'UserSlice',
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return {...state, ...action.payload}
    },
  },
})

export const {update} = slice.actions

export default slice.reducer
