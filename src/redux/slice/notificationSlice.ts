import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
    count: number;
}

const initialState: NotificationState = {
    count: 0,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
    },
});

export const {
    setCount,
} = notificationSlice.actions;
export default notificationSlice;
