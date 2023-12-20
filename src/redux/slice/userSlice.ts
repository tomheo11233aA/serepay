import { ILanguage, IUserSlice, IUserInfo, IUserWallet } from "@models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../helper/AxiosInstance";
import { getWalletApi, getProfile } from "@utils/userCallApi";

const initialState: IUserSlice = {
    isLogin: false,
    language: {
        title: 'English',
        value: 'en',
        image: require('@images/unAuth/america.png'),
    },
    userInfo: {
        id: 0,
        unique_code: '',
        username: '',
        email: '',
        fullname: '',
        first_name: '',
        last_name: '',
        address: '',
        enabled_twofa: 1,
    },
    userWallet: {
        bnb_balance: 0,
        usdt_balance: 0,
        block_token_balance: 0,
        stf_trc20_balance: 0,
        vnd_balance: 0,
        usd_balance: 0,
        btc_balance: 0,
        eth_balance: 0,
        ltc_balance: 0,
    },
}

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
    const response = await getProfile();
    return response?.data;
});

export const fetchUserWallet = createAsyncThunk('user/fetchUserWallet', async () => {
    const response = await getWalletApi();
    return response?.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
        setLanguage: (state, action: PayloadAction<ILanguage>) => {
            state.language = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
                state.userInfo = action.payload;
            })
            .addCase(fetchUserWallet.fulfilled, (state, action: PayloadAction<IUserWallet>) => {
                state.userWallet = action.payload;
            });
    }

})

export const {
    setLogin,
    setLanguage,
} = userSlice.actions

export default userSlice