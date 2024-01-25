import { ILanguage, IUserSlice, IUserInfo, IUserWallet, IRate } from "@models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
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
        verified: null,
    },
    userWallet: {
        btc_balance: 0,
        eth_balance: 0,
        usdt_balance: 0,
        bch_balance: 0,
        ltc_balance: 0,
        xrp_balance: 0,
        bnb_balance: 0,
        doge_balance: 0,
        dot_balance: 0,
        uni_balance: 0,
        win_balance: 0
    },
    selectedRate: {title: 'USD', rate: 1},
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
        setSelectedRate: (state, action: PayloadAction<IRate>) => {
            state.selectedRate = action.payload
        }
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
    setSelectedRate
} = userSlice.actions

export default userSlice