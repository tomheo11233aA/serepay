import userSlice from "@redux/slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "@redux/slice/coinSlice";
import exchangeRateSlice from "@redux/slice/exchangeRateSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        coin : coinSlice.reducer,
        exchangeRate : exchangeRateSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store