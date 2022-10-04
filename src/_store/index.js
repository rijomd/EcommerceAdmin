import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../_reducer';
import  { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger();   

export const store = configureStore({
    reducer: rootReducer,
    middleware: [loggerMiddleware,thunkMiddleware ],
  })
