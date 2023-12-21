import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../helper/AxiosInstance";
import { IGetListAdsBuy } from "@models/P2P/USER/getListAdsBuy";
import { IGetListAdsSell } from "@models/P2P/USER/getListAdsSell";
import { IHistory } from "@models/history";
import { IType } from "@models/history";

const initialState: IType = {
    buy: [],
    sell: []
};

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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListAdsBuy.fulfilled, (state, { payload: { array } }) => {
            if (Array.isArray(array)) {
                state.buy.length = 0;
                state.buy.push(...array);
            }
        })
        builder.addCase(fetchListAdsSell.fulfilled, (state, { payload: { array } }) => {
            if (Array.isArray(array)) {
                state.sell.length = 0;
                state.sell.push(...array);
            }
        })
    }
})

export default historySlice