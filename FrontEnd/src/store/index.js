import { configureStore } from "@reduxjs/toolkit";
import { authActions } from "./auth";

const store = configureStore({
    reducer: {
        auth: authActions,
    }
})

export default store;