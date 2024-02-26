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
    data2?: any;
    data3?: any;
}

const initialState: IConfigState = {
    data: [],
    status: 'idle',
    error: null,
    data2: [],
    data3: []
};

export const fetchConfig = createAsyncThunk('config/fetchConfig', async (data: IExchangeRateDisparity) => {
    const response = await exchangeRateDisparity(data);
    return response?.data;
});

export const fetchConfig2 = createAsyncThunk('config/fetchConfig2', async () => {
    const response = await fetch('https://serepay.net/api/p2pBank/getConfig', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": "exchangeRateSell" })
    });
    const json = await response.json();
    return json.data;
});

export const fetchConfig3 = createAsyncThunk('config/fetchConfig3', async () => {
    const response = await fetch('https://serepay.net/api/p2pBank/getConfig', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": "exchangeRate" })
    });
    const json = await response.json();
    return json.data;
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

        builder.addCase(fetchConfig2.fulfilled, (state, action: PayloadAction<IConfig[]>) => {
            state.status = 'succeeded';
            state.data2 = action.payload;
        });

        builder.addCase(fetchConfig3.fulfilled, (state, action: PayloadAction<IConfig[]>) => {
            state.status = 'succeeded';
            state.data3 = action.payload;
        });
    }
});

export default configSlice;