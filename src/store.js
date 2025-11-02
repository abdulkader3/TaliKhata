
import { configureStore } from '@reduxjs/toolkit'
import user from '../src/Slice/ClintData.js'

export default configureStore({
  reducer: {
    customerSupplier: user,
  },
})