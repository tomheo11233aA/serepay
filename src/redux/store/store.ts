import userSlice from "@redux/slice/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coinSlice from "@redux/slice/coinSlice";
import exchangeRateSlice from "@redux/slice/exchangeRateSlice";
import historySlice from "@redux/slice/historySlice";
import configSlice from "@redux/slice/getConfig";
import advertisingSlice from "@redux/slice/advertisingSlice";
import notificationSlice from "@redux/slice/notificationSlice";
import bankSlice from "@redux/slice/bankSlice";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import reduxStorage from "@utils/localStorage";
import { createFilter, createBlacklistFilter  } from 'redux-persist-transform-filter';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    coin: coinSlice.reducer,
    exchangeRate: exchangeRateSlice.reducer,
    history: historySlice.reducer,
    config: configSlice.reducer,
    advertising: advertisingSlice.reducer,
    notification: notificationSlice.reducer,
    bank: bankSlice.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage: reduxStorage,
    timeout: 30000,
    blacklist: [],
    whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)

export default store