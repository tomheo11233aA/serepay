import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IExchangeRateDisparity } from "@models/P2P/ADMIN/CONFIG/exchangeRateDisparity";
import { exchangeRateDisparity } from "@utils/userCallApi";
import { PayloadAction } from "@reduxjs/toolkit";

interface IConfig {
    id: number;
    value: number;
    name: string;
    note: string;
}

interface IConfigState {
    data: IConfig[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: IConfigState = {
    data: [],
    status: 'idle',
    error: null
};

export const fetchConfig = createAsyncThunk('config/fetchConfig', async (data: IExchangeRateDisparity) => {
    const response = await exchangeRateDisparity(data);
    return response?.data;
});

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchConfig.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchConfig.fulfilled, (state, action: PayloadAction<IConfig[]>) => {
            state.status = 'succeeded';
            state.data = action.payload;
        });
        builder.addCase(fetchConfig.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null;
        });
    }
});

export default configSlice;