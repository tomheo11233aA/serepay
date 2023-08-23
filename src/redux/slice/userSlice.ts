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
        setLanguage: (state, action: PayloadAction<ILanguage>) => {
            state.language = action.payload
        },
    },
})

export default userSlice