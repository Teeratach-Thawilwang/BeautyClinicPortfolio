import {createSlice} from '@reduxjs/toolkit'

import {ThemeEnum, ThemeSliceInterface} from '@models/ThemeInterface'

const initialState: ThemeSliceInterface = {
  theme: null,
}

const slice = createSlice({
  name: 'ThemeSlice',
  initialState: initialState,
  reducers: {
    update: (state, action) => {
      return {...state, ...action.payload}
    },
    toggle: state => {
      const theme = state.theme == ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark
      return {...state, theme: theme}
    },
  },
})

export const {update, toggle} = slice.actions

export default slice.reducer
