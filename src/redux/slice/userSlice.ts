import { createSlice } from "@reduxjs/toolkit";

interface IUserSlice {
    isLogin: boolean;
}

const initialState: IUserSlice = {
    isLogin: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
})

export default userSlice