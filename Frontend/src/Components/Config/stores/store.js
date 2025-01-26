import { configureStore } from "@reduxjs/toolkit";
import itemsReducer  from "../reducers/itemsSlice";


export const store = configureStore({
    reducer:{
        items:itemsReducer
    }
})