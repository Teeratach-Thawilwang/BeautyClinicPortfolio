import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {persistor, store} from '@store/Store'

export default function ReduxProvider({children}: {children: JSX.Element}) {
  if (process.env.STAGING === 'test') {
    return <Provider store={store}>{children}</Provider>
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
