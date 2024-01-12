import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListAdsBuyToUser } from '@utils/userCallApi'
import { getListAdsBuyPenddingToUser } from '@utils/userCallApi'
import { getListAdsSellToUser } from "@utils/userCallApi";
import { getListAdsSellPenddingToUser } from "@utils/userCallApi";

export const fetchListAdsBuy = createAsyncThunk('adsBuy/fetchListAdsBuy', async () => {
    const response = await getListAdsBuyToUser({ page: 1, limit: 10 });
    return response?.data?.array;
});

export const fetchListAdsBuyPendding = createAsyncThunk('adsBuy/fetchListAdsBuyPendding', async () => {
    const response = await getListAdsBuyPenddingToUser({ page: 1, limit: 10 });
    return response?.data?.array;
});

export const fetchListAdsSell = createAsyncThunk('adsSell/fetchListAdsSell', async () => {
    const response = await getListAdsSellToUser({ page: 1, limit: 10 });
    return response?.data?.array;
});

export const fetchListAdsSellPendding = createAsyncThunk('adsSell/fetchListAdsSellPendding', async () => {
    const response = await getListAdsSellPenddingToUser({ page: 1, limit: 10 });
    return response?.data?.array;
});

interface AdvertisingState {
    listAdsBuyToUser: any[];
    listAdsBuyPenddingToUser: any[];
    listAdsSellToUser: any[];
    listAdsSellPenddingToUser: any[];
}

const initialState: AdvertisingState = {
    listAdsBuyToUser: [],
    listAdsBuyPenddingToUser: [],
    listAdsSellToUser: [],
    listAdsSellPenddingToUser: [],
}

const advertisingSlice = createSlice({
    name: 'advertising',
    initialState,
    reducers: {
        setListAdsBuy: (state, action: PayloadAction<any>) => {
            return { ...state, listAdsBuy: action.payload }
        },
        setListAdsBuyPendding: (state, action: PayloadAction<any>) => {
            return { ...state, listAdsBuyPendding: action.payload }
        },
        setListAdsSell: (state, action: PayloadAction<any>) => {
            return { ...state, listAdsSell: action.payload }
        },
        setListAdsSellPendding: (state, action: PayloadAction<any>) => {
            return { ...state, listAdsSellPendding: action.payload }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchListAdsBuy.fulfilled, (state, action: PayloadAction<any>) => {
            return { ...state, listAdsBuyToUser: action.payload }
        })
        builder.addCase(fetchListAdsBuyPendding.fulfilled, (state, action: PayloadAction<any>) => {
            return { ...state, listAdsBuyPenddingToUser: action.payload }
        })
        builder.addCase(fetchListAdsSell.fulfilled, (state, action: PayloadAction<any>) => {
            return { ...state, listAdsSellToUser: action.payload }
        })
        builder.addCase(fetchListAdsSellPendding.fulfilled, (state, action: PayloadAction<any>) => {
            return { ...state, listAdsSellPenddingToUser: action.payload }
        })
    }
})

export const {
    setListAdsBuy,
    setListAdsBuyPendding,
    setListAdsSell,
    setListAdsSellPendding,
} = advertisingSlice.actions

export default advertisingSlice