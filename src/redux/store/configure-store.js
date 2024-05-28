import { configureStore } from "@reduxjs/toolkit";
import zendeskSlice from "../slice/zendeskSlice";

const store= configureStore({
    reducer:{
        zendeskReducer:zendeskSlice
    }
})

export default store