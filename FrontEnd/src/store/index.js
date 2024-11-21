import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // Import the reducer

const store = configureStore({
    reducer: {
        auth: authReducer, 
    },
});

export default store;