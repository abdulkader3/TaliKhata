
import { configureStore } from '@reduxjs/toolkit'
import user from '../src/Slice/ClintData.js'
import notificationReducer from '../src/Slice/NotificationSlice.js'

export default configureStore({
  reducer: {
    customerSupplier: user,
    notifications: notificationReducer,
  },
})