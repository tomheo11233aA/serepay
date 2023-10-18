import { ILanguage, IUserSlice } from "@models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IUserSlice = {
    isLogin: false,
    language: {
        title: 'English',
        value: 'en',
        image: require('@images/unAuth/america.png'),
    },
}

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
})

export const {
    setLogin,
    setLanguage,
} = userSlice.actions

export default userSlice