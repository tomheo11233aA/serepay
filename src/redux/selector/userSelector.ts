import { RootState } from "@redux/store/store";

export const isLoginUserSelector = (state: RootState) => state.user.isLogin

export const languageUserSelector = (state: RootState) => state.user.language 