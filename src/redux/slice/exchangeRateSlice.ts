import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getExchange } from "@utils/userCallApi";
import { ExChangeRate } from "@models/exchangeRate";

const initialState: ExChangeRate[] = [];

export const fetchListExchange = createAsyncThunk('exchange/fetchListExchange', async () => {
    const response = await getExchange();
    return response?.data;
});

const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {
        setListExchange: (state, action: PayloadAction<any>) => {
            return [...action.payload]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListExchange.fulfilled, (state, action: PayloadAction<any>) => {
            return [...action.payload]
        })
    }
})

export const {
    setListExchange,
} = exchangeSlice.actions

export default exchangeSlice
