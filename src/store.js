import { configureStore } from '@reduxjs/toolkit'
import loginFlag from './reducer'

export default configureStore({
    reducer: {
      login: loginFlag,
    }
})