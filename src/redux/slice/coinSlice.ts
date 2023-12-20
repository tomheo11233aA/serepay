import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../helper/AxiosInstance";
import { ICoin } from "@models/coin";

const initialState: ICoin[] = [];

export const fetchListCoin = createAsyncThunk('coin/fetchListCoin', async () => {
    const axiosInstance = AxiosInstance();
    const response = await axiosInstance.get('api/coin/list');
    return response.data;
});

const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        setListCoinRealtime: (state, action: PayloadAction<ICoin[]>) => {
            // state = action.payload
            return [...action.payload]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListCoin.fulfilled, (state, action: PayloadAction<ICoin[]>) => {
            // state = action.payload
            return [...action.payload]
        })
    }
})

export const {
    setListCoinRealtime,
} = coinSlice.actions

export default coinSlice