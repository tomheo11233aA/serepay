import { RootState } from "@redux/store/store";

export const isLoginUserSelector = (state: RootState) => state.user.isLogin