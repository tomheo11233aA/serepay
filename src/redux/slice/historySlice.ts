import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../helper/AxiosInstance";
import { IGetListAdsBuy } from "@models/P2P/USER/getListAdsBuy";
import { IGetListAdsSell } from "@models/P2P/USER/getListAdsSell";

// const initialState: IGetListAdsBuy[] = [];

// reponse là mảng các ads
export interface IResponse {
    id: number;
    side: string;
    amount: number;
    amountMinimum: number;
    userName: string;
    email: string;
    type: number;
    userid: number;
    created_at: string;
    addressWallet: string;
    bankName: string;
    ownerAccount: string;
    numberBank: string;
    symbol: string;
    amountSuccess: number;
}

const initialState: IResponse[] = [];

export const fetchListAdsBuy = createAsyncThunk('adsBuy/fetchListAdsBuy', async (data: IGetListAdsBuy) => {
    const axiosInstance = AxiosInstance();
    const response = await axiosInstance.post('api/p2pBank/getListAdsBuy', data);
    return response.data;
});

export const fetchListAdsSell = createAsyncThunk('adsSell/fetchListAdsSell', async (data: IGetListAdsSell) => {
    const axiosInstance = AxiosInstance();
    const response = await axiosInstance.post('api/p2pBank/getListAdsSell', data);
    return response.data;
});

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setListAdsBuy: (state, action: PayloadAction<IResponse[]>) => {
            return Array.isArray(action.payload) ? action.payload : initialState
        },
        setListAdsSell: (state, action: PayloadAction<IResponse[]>) => {
            return Array.isArray(action.payload) ? action.payload : initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchListAdsBuy.fulfilled, (state, action: PayloadAction<{ array: IResponse[], total: number }>) => {
            if (Array.isArray(action.payload.array)) {
                state.length = 0;
                state.push(...action.payload.array);
            }
        })
        builder.addCase(fetchListAdsSell.fulfilled, (state, action: PayloadAction<{ array: IResponse[], total: number }>) => {
            if (Array.isArray(action.payload.array)) {
                state.length = 0;
                state.push(...action.payload.array);
            }
        })
    }
})

export const {
    setListAdsBuy,
    setListAdsSell
} = historySlice.actions

export default historySlice

