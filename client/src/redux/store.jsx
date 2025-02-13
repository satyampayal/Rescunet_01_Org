import { configureStore } from "@reduxjs/toolkit";
import  authReducer from './slices/authSlices'
import compReducer from './slices/complianSlices'
import shareReducer from './slices/shareSlice'
import commentReducer from './slices/commentSlice'
import faceReducer from './slices/faceSlice'
const store=configureStore({
    reducer:{
        auth: authReducer,
        complain:compReducer,
        share:shareReducer,
        comment:commentReducer,
        face:faceReducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false}),
    devTools:true
})

export default store;