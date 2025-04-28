import {AuthSlice} from '@models/AuthTypes'
import {createSlice} from '@reduxjs/toolkit'

const initialState: AuthSlice = {
  isAdmin: false,
  user: null,
}

const slice = createSlice({
  name: 'AuthSlice',
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return {...state, ...action.payload}
    },
  },
})

export const {update} = slice.actions

export default slice.reducer
