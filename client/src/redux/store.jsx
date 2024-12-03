import { configureStore } from "@reduxjs/toolkit";
import  authReducer from './slices/authSlices'
import compReducer from './slices/complianSlices'
const store=configureStore({
    reducer:{
        auth: authReducer,
        complain:compReducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false}),
    devTools:true
})

export default store;