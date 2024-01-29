import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface BankState {
    banks: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BankState = {
    banks: [],
    status: 'idle',
    error: null,
}

export const fetchBanks = createAsyncThunk('banks/fetchBanks', async () => {
    const response = await fetch('https://api.vietqr.io/v2/banks');
    const json = await response.json();
    return json.data;
});

const bankSlice = createSlice({
    name: 'banks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBanks.pending, (state, action: PayloadAction<any>) => {
            state.status = 'loading';
        });

        builder.addCase(fetchBanks.fulfilled, (state, action: PayloadAction<any>) => {
            return { ...state, banks: action.payload, status: 'succeeded' }
        });

        builder.addCase(fetchBanks.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default bankSlice;