import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slides/userSlide'
import productSlide from './slides/productSlide'

export const store = configureStore({
  reducer: {
    product: productSlide,
    user: userReducer
  },
})