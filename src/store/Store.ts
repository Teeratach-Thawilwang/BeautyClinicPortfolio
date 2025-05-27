import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import Reactotron from 'ReactotronConfig'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {persistReducer, persistStore} from 'redux-persist'

import AuthSlice from '@store/slices/AuthSlice'
import ThemeSlice from '@store/slices/ThemeSlice'

const stagging = process.env.STAGING
const isStaggingValid = stagging != 'production' && stagging != 'test'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'theme'],
}

const rootReducer = combineReducers({
  auth: AuthSlice,
  theme: ThemeSlice,
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  enhancers: getDefaultEnhancers => {
    const reactotronEnhancer = isStaggingValid
      ? [Reactotron.createEnhancer!()]
      : []
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
