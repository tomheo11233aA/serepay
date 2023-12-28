import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../helper/AxiosInstance";
import { ICoin } from "@models/coin";

interface CoinState {
    coins: ICoin[];
    connected: boolean;
}

const initialState: CoinState = {
    coins: [],
    connected: false,
}

export const fetchListCoin = createAsyncThunk('coin/fetchListCoin', async () => {
    const axiosInstance = AxiosInstance();
    const response = await axiosInstance.get('api/coin/list');
    console.log(response.data);
    return response.data;
});

const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        setListCoinRealtime: (state, action: PayloadAction<ICoin[]>) => {
            state.coins = [...action.payload];
        },
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListCoin.fulfilled, (state, action: PayloadAction<ICoin[]>) => {
            state.coins = [...action.payload];
        })
    }
})

export const {
    setListCoinRealtime,
    setConnected
} = coinSlice.actions

export default coinSlice