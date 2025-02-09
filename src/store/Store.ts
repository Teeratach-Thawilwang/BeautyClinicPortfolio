import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import Reactotron from 'ReactotronConfig'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {persistReducer, persistStore} from 'redux-persist'

import UserSlice from '@store/slices/UserSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  user: UserSlice,
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  enhancers: getDefaultEnhancers => {
    const reactotronEnhancer = process.env.STAGING != 'production' ? [Reactotron.createEnhancer!()] : []
    return getDefaultEnhancers().concat(reactotronEnhancer)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.STAGING != 'production',
})

export type RootStateType = ReturnType<typeof rootReducer>
export type AppDispathType = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispathType>()
export const persistor = persistStore(store)
