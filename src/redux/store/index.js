import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createSagaMiddleware from 'redux-saga'

import rootSaga from '../saga/'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const rootstore = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(rootstore)
