import { configureStore } from "@reduxjs/toolkit";
import itemsReducer  from "../reducers/itemsSlice";
import UserReducer  from "../reducers/userSlice";


export const store = configureStore({
    reducer:{
        items:itemsReducer,
        users:UserReducer
    }
})