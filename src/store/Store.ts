import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import Reactotron from 'ReactotronConfig'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {persistReducer, persistStore} from 'redux-persist'

import AdminSlice from '@store/slices/AdminSlice'
import ThemeSlice from '@store/slices/ThemeSlice'
import UserSlice from '@store/slices/UserSlice'

const stagging = process.env.STAGING
const isStaggingValid = stagging != 'production' && stagging != 'test'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'admin', 'theme'],
}

const rootReducer = combineReducers({
  user: UserSlice,
  admin: AdminSlice,
  theme: ThemeSlice,
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  enhancers: getDefaultEnhancers => {
    const reactotronEnhancer = isStaggingValid ? [Reactotron.createEnhancer!()] : []
    return getDefaultEnhancers().concat(reactotronEnhancer)
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: isStaggingValid,
})

export type RootStateType = ReturnType<typeof rootReducer>
export type AppDispathType = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispathType>()
export const persistor = persistStore(store)
